import { Component } from '@angular/core';

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@ Injectable({providedIn:"root"})

export class UserComponent {

  constructor(private http: HttpClient) {}

  userData=''

  loginUserData(): void {
    this.http.get("http://localhost:3000/user/"+1).subscribe(
(userData: any) => {
  // Handle the retrieved user data here
  console.log(userData);
  this.userData=userData
},
(error: any) => {
  console.error('Error fetching user data:', error);
}
);
  }
}
