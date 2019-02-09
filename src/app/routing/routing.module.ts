import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutesConfig } from './routes.config';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(RoutesConfig, {enableTracing: true}),
  ]
})
export class RoutingModule { }
