import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RestService } from '../../core/service';
import { User } from './user';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  // 获取用户登录信息
  onLogin(user: User) {
    const rest = this.restService.resolveUrl('common.login', user);
    return this.http.get(rest.url, { observe: 'response' });
  }
}
