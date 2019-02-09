import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { RestService } from '../../core/service';

@Injectable()
export class HomeService {

    constructor(
        private http: HttpClient,
        private restService: RestService
    ) {}

    // 获取用户歌曲播放列表
    getPlaylistByUid(uid: string | number) {
        const rest = this.restService.resolveUrl('user.playlist', {uid: uid});
        return this.http.get(rest.url, {observe: 'response'});
    }
}
