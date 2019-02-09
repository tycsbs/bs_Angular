import { Component, OnInit, Input, Renderer2, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, map, filter, tap, distinctUntilChanged } from 'rxjs/operators';
import { forEach } from 'lodash';
import { RestService } from 'src/app/core/service';

import { OptionItem } from './search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() loadingPlaceholder = 'searching...';
  // 搜索值
  search$ = new Subject<string>();

  // 单个option选项
  currentOption: OptionItem;

  optionSub$ = new Subject<OptionItem>();

  // 下拉列表Observable
  options$: Observable<Array<OptionItem>>;

  // 下拉列表显隐
  visible: boolean;

  // 全局监听事件
  documentClickListener: any;

  // 是否是组件本身点击事件
  selfClick: boolean;

  // 是否是点击下拉列表
  itemClick: boolean;

  constructor(
    private http: HttpClient,
    private render: Renderer2,
    private cd: ChangeDetectorRef,
    private restService: RestService
  ) {
    this.visible = false;
  }

  ngOnInit() {
    this.onSearch();

    this.onSelect();
  }

  onToggleClickSearch() {
    this.selfClick = true;
    this.visible = !this.visible;
    this.clearSearch();

    this.bindDocumentClickListener();
  }

  clearSearch() {
    this.search$.next('');
  }

  onSelect() {
    this.itemClick = true;
    this.optionSub$.subscribe((option) => {
      this.currentOption = option;
      // 隐藏droplist 清除数据
      this.onToggleClickSearch();
    });
  }

  onSearch() {
    this._onSearch()
      .subscribe((data) => {
        this.setDropdownlist(data);
      });
  }

  private _onSearch() {
    return this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.setDropdownlist();
        }),
        filter(val => !!val),
        switchMap(val => {
          this.setDropdownlist([{ value: this.loadingPlaceholder, label: this.loadingPlaceholder }]);
          return this.getMusicByKeywords({ keywords: val });
        }),
        map((data: any) => {
          const songs = data.result.songs;
          const result: OptionItem[] = [];
          forEach(songs, (value) => {
            result.push({
              value: value.name,
              label: value.artists[0].name + '--' + value.name
            });
          });
          return result;
        })
      );
  }

  setDropdownlist(options: OptionItem[] = []) {
    this.options$ = of(options);
  }

  // 搜索歌曲
  getMusicByKeywords(param: { keywords: string }) {
    const rest = this.restService.resolveUrl('search.music', param);
    return this.http.get(rest.url);
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.render.listen('document', 'click', () => {
        if (!this.selfClick && !this.itemClick) {
          this.hide();
          this.unbindDocumentClickListener();
        }

        this.clearClickState();
      });
    }
  }

  clearClickState() {
    this.selfClick = false;
    this.itemClick = false;
  }

  hide() {
    this.visible = false;
    this.clearSearch();
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  onQueryInputClick() {
    this.itemClick = true;
    this.bindDocumentClickListener();
  }

}
