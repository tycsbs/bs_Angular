import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

export const LoginRoutes: Routes = [{
    path: '',
    component: LoginComponent
}];

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(LoginRoutes)
     ],
    exports: [],
    providers: [
        LoginService,
    ],
})
export class LoginModule {}
