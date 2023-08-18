import { Component } from '@angular/core';

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@ Injectable({providedIn:"root"})
export class AppComponent {
  name:any
  data=0
  updateChild(){
    this.data=Math.random()*1000
  }

  testData = [1, 23]
  title = 'my-app';
  lists:any[] =[]
  c=0
  removeTask(id:any) {
       this.lists=this.lists.filter(list => list.id!=id)
  }

  addTask(data:string){
    this.c=this.c+1
    this.lists.push({id:this.c,task:data})
  }
}
