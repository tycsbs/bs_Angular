import { Routes } from '@angular/router';

export const RoutesConfig: Routes = [
  { path: 'login', loadChildren: 'src/app/business/login/login.module#LoginModule' },
  { path: 'home', loadChildren: 'src/app/business/home/home.module#HomeModule' },
  { path: 'list', loadChildren: 'src/app/business/list/list.module#ListModule' },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
