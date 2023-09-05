import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTreeModule } from '@angular/material/tree';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgbModule,
    MatTreeModule
  ]
})
export class ProductsModule { }
