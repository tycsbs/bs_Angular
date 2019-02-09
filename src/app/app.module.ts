import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { HttpService } from './core/service';
import { RoutesConfig } from './routing/routes.config';
import { LoginModule } from './business/login/login.module';
import { HomeModule } from './business/home/home.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    HomeModule,
    RouterModule.forRoot(RoutesConfig, {enableTracing: true}),
  ],
  providers: [
    {provide: LOCALE_ID,  useValue: 'zh-Hans'},
    {provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}, // 解决刷新后报错问题
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
