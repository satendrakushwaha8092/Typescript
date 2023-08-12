import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  show=true
  countries=[{
    country: 'United States',
    area:132,
    population:2341
  },
  {
    country: 'India',
    area:132,
    population:2341
  },
  {
    country: 'India',
    area:132,
    population:2341
  },
  {
    country: 'India',
    area:132,
    population:2341
  }]
  userData: any;
  getdata(data: NgForm){
    this.userData=data
    console.log(data)
  }
  display=true
  toggle(){
    this.display=!this.display
  }
}
