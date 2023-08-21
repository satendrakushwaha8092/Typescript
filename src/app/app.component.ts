import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  usertoken = '';
  arr:any[]=[]
  updateData(item: any) {
    this.arr.push(item);
    console.log(this.arr)
  }
}
