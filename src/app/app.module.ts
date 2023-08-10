import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursesComponent } from './course.components';
import { CourseComponent } from './course/course.component';
import { CourseService } from './course/course.service';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsService } from './authors.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomersService } from './customers.service';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    AuthorsComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CourseService,
    AuthorsService,
    CustomersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
