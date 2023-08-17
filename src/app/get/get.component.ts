import { Component } from '@angular/core';

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})

@ Injectable({providedIn:"root"})

export class GetComponent {
  constructor(private http: HttpClient) {}
  userData:any;
  name:any
    getData(search:any): void {
    this.http.get("http://localhost:3000/user"+'?search='+search).subscribe(
        (userData: any) => {
            // Handle the retrieved user data here
            this.userData=userData;
            console.log(this.userData)
        },
        (error: any) => {
            console.error('Error fetching user data:', error);
        }
    );
}

deleteData(id:any): void {
  this.http.delete("http://localhost:3000/user/"+id).subscribe(
      (userData: any) => {
          // Handle the retrieved user data here
          console.log(userData);
      },
      (error: any) => {
          console.error('Error fetching user data:', error);
      }
  );
}
}
