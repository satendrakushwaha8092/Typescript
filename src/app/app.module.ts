import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import {ToastrModule} from 'ngx-toastr'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
//import { NgbdToastGlobal } from './toast-global/toast-global.component';

import {MatInputModule} from '@angular/material/input';

import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatTreeModule} from '@angular/material/tree';

import { MatIconModule } from '@angular/material/icon';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    EditUserComponent,
    ViewUserComponent,
    LoginComponent,
    ResetPasswordComponent,
    DatePickerComponent,
    TreeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatDatepickerModule,
    MatTreeModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
