import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent  } from './home.component';
import { HomeService  } from './home.service';

export const HomeRoutes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
