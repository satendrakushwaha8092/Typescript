import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { GetComponent } from './get/get.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UsdInrPipe } from './pipe/usd-inr.pipe';
import { SweetalertComponent } from './sweetalert/sweetalert.component';
import { UpdateComponent } from './update/update.component';
import { NoPageComponent } from './no-page/no-page.component';

import { UserdataService } from './services/userdata.service';



@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    LoginComponent,
    RegisterComponent,
    GetComponent,
    HomeComponent,
    UserComponent,
    UsdInrPipe,
    SweetalertComponent,
    UpdateComponent,
    NoPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
