import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';

import { HomeComponent } from './home/home.component';

import { GetComponent } from './get/get.component';

import { UserComponent } from './user/user.component';

import { SweetalertComponent } from './sweetalert/sweetalert.component';

import { UpdateComponent } from './update/update.component';

import { NoPageComponent } from './no-page/no-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component:HomeComponent,
  },
  {
    path: 'get',
    component:GetComponent,
  },
  {
    path: 'user',
    component:UserComponent,
  },
  {
    path: 'alert',
    component:SweetalertComponent,
  },
  {
    path: 'update/:id',
    component:UpdateComponent,
  },
  // {
  //   path: '**',
  //   component:NoPageComponent,
  // },
  //  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }