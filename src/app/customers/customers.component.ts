import { CustomersService } from '../customers.service';

import { Component } from '@angular/core';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers;

  constructor(service: CustomersService) {
    this.customers=service.getCustomers();
  }

  ngOnInit() {

  }
}
