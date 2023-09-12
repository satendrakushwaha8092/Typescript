import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgbModule,
    MatTreeModule,
    NgbToastModule,
    NgIf,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ProductsModule { }
