import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpProviderService } from '../Service/http-provider.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  check = false;

  constructor(private router: Router, private httpProvider: HttpProviderService,) {}

  ngOnInit(): void {}

  userData: any;

  // loginUserData(): void {
  //   this.http.get('http://localhost:3000/login').subscribe(
  //     (userData: any) => {
  //       // Handle the retrieved user data here
  //       if (userData.response == 'success') {
  //       }
  //       this.router.navigate(['/Home']);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching user data:', error);
  //     }
  //   );
  // }

  login(data: any) {
    this.httpProvider.loginUser(data).subscribe(
      (userData: any) => {
        console.log(userData.response);
        // Handle the retrieved user data here
        if (userData.response == 'success') {
          this.check = true;
          this.userData = userData;
        }

        setTimeout(() => {
          this.router.navigate(['/ViewUser/30']);
        }, 500);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  title = 'you are login page';
}
