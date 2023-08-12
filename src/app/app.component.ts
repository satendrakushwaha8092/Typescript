import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  color="green"
  title = 'my-app2';
  bgColor="red"
  users=[
    {name:"name1",phone:12345,accounts:["fb","in","insta"]},
    {name:"name2",phone:12345,accounts:["fb","in","insta"]},
    {name:"name3",phone:12345,accounts:["fb","in","insta"]},
    {name:"name4",phone:12345,accounts:["fb","in","insta"]}
  ]

  updateColor(){
    this.color="red",
    this.bgColor="blue"
  }

}
