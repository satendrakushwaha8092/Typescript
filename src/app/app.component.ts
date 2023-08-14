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

  constructor(private http: HttpClient) {}
  userData:any;

  createData(data:any): void {
    console.log(data)
    const headers = { 'content-type': 'application/json'}  
    this.http.post<any>("http://localhost:3000/add",data)
}

  getData(): void {
    this.http.get("http://localhost:3000/user").subscribe(
        (userData: any) => {
            // Handle the retrieved user data here
            this.userData=userData;
        },
        (error: any) => {
            console.error('Error fetching user data:', error);
        }
    );
}

  name:any
  data=0
  updateChild(){
    this.data=Math.random()*1000
  }
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
