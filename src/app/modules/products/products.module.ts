import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTreeModule } from '@angular/material/tree';


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
    NgIf
  ]
})
export class ProductsModule { }
