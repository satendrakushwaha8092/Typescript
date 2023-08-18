import { Component, Input, OnInit } from '@angular/core';

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@ Injectable({providedIn:"root"})

export class LoginComponent implements OnInit {

  @Input() data:any;
  


  // loginForm = new FormGroup({
  //   email:new FormControl('',[Validators.required, Validators.email]),
  //   password:new FormControl('',[Validators.required])
  // })
  

  check=false



  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    console.log(this.data)
  }
  userData:any;

  loginUserData(): void { 
    this.http.get("http://localhost:3000/login").subscribe(
      (userData: any) => {
          // Handle the retrieved user data here
          if(userData.response=='success'){

          }
      },
      (error: any) => {
          console.error('Error fetching user data:', error);
      }
  );
}

  login(data:any): void { 
    this.http.post("http://localhost:3000/login",data).subscribe(
      (userData: any) => {
        console.log(userData.response)
          // Handle the retrieved user data here
                      if(userData.response=="success"){
                        this.check=true
                        this.userData=userData
                      }
      },
      (error: any) => {
          console.error('Error fetching user data:', error);
      }
  );

}



  title="you are login page"
}
