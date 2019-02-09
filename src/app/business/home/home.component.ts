import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 用户歌曲列表
  playList = [];

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPlaylistById();
  }

  getPlaylistById() {
    const uid = this.authService.getUserId();
    this.homeService.getPlaylistByUid(uid)
    .subscribe({
      next: (res) => {
        const { body } = res;
        this.playList = body['playlist'];
      },
      error: (err) => {
        this.router.navigate(['/list']);
      }
    });
  }

}
