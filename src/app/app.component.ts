import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show="yes"
  color="green"
  title = 'my-app';
  users=["user1","user2","user3","user4","user5","user6","user7","user8"]
  userDetails =[
    {name:"user1",age:23},
    {name:"user2",age:23},
    {name:"user3",age:23},
    {name:"user4",age:23},
  ]
  getName(name:string){
    alert(name)
  }
  getData(val:string){
    console.log(val)
  }
  displayVal=''
  getValue(val:string){
    this.displayVal=val
    console.log(val)
  }
  count=0
  counter(type:string){
    type=='add'?this.count++:this.count--
  }
}
