import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/service';
import { LoginService } from './login.service';

import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // 表单对象
  loginFrom: FormGroup;

  // 验证信息
  errorMsg: {};

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // 获取用户登录信息
    this.initForm();

    // 初始化验证信息
    this.initErrorMsg();
  }

  // 初始化表单吗
  initForm() {
    this.loginFrom = this.fb.group({
      email: ['tutebaisong@163.com', [Validators.required]],
      password: ['azjbai123',  [Validators.required]],
      // counter: [1]
    });
  }

  // 初始化验证信息
  initErrorMsg() {
    this.errorMsg = {
      email: {
        required: '用户名为必填项'
      },
      password: {
        required: '密码为必填项'
      },
      counter: {
        min: '最小值0',
        max: '最大值10'
      }
    };
  }

  // 点击用户登录
  onLogin() {
    // 获取用户数据
    const user: User = this.loginFrom.value;

    const obsever$ = {
      next: (res) => {
        const {status, body} = res;
        if (status === 200) {
          window.localStorage.setItem('_USER_INFO_', JSON.stringify(body));
          const {account: {id}} = body;
          this.authService.setUserId(id);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    };

    this.loginService.onLogin(user)
      .subscribe(obsever$);
  }

}
