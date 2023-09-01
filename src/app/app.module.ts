import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import {
  NgbModule,
  NgbToastModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
//import { NgbdToastGlobal } from './toast-global/toast-global.component';

import { MatInputModule } from '@angular/material/input';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatTreeModule } from '@angular/material/tree';

import { MatIconModule } from '@angular/material/icon';
import { TreeComponent } from './tree/tree.component';
import { HttpProviderService } from './Service/http-provider.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TabComponent } from './tab/tab.component';

import { MatTabsModule } from '@angular/material/tabs';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatDialogModule } from '@angular/material/dialog';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from './dialog/dialog.component';
import { ToastsContainer } from './toast-global/toasts.container.components';
import { RemoveUserComponent } from './remove-user/remove-user.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';

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
    FileUploadComponent,
    TabComponent,
    DialogComponent,
    RemoveUserComponent,
    LogoutComponent,
    NavBarComponent,
    ProductComponent,
    HeaderComponent,
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
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    NgbTooltipModule,
    ToastsContainer,
    NgbToastModule,
    NgIf,
    NgTemplateOutlet,
    NgFor,
  ],
  providers: [HttpProviderService,AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
