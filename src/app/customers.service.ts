import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  getCustomers(){
    return ["customer1","customer2","customer3","customer4","customer5","customer6"]
  }
}
