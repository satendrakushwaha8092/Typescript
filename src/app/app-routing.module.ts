import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NgbdToastGlobal } from './toast-global/toast-global.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TreeComponent } from './tree/tree.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

const routes: Routes = [
   { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'ViewUser/:Id', component: ViewUserComponent },
  { path: 'AddUser', component: AddUserComponent },
  { path: 'EditUser/:Id', component: EditUserComponent },
  { path: 'toast', component: NgbdToastGlobal },
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: ResetPasswordComponent } ,
  { path: 'tree', component: TreeComponent },
  { path: 'date-picker', component: DatePickerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
