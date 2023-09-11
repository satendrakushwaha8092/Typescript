import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { PracticeRoutingModule } from './practice-routing.module';
import { PracticeComponent } from './practice.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PracticeComponent
  ],
  imports: [
    CommonModule,
    PracticeRoutingModule,
    NgbToastModule,
    NgIf,
    MatDialogModule,
    MatButtonModule
  ]
})
export class PracticeModule { }
