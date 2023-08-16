import { Component } from '@angular/core';

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

@ Injectable({providedIn:"root"})
export class RegisterComponent {

  constructor(private http: HttpClient) {}
  userData:any;

  createData(data:any): void {
    const headers = { 'content-type': 'application/json'}  
    this.http.post("http://localhost:3000/add",data).subscribe(
      (userData: any) => {
          // Handle the retrieved user data here
          console.log(userData)
      },
      (error: any) => {
          console.error('Error fetching user data:', error);
      }
  );
}
}
