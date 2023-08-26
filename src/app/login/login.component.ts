import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  token: any;

  login(data: any) {

    let header=new HttpHeaders().set("Authorization", "Bearer " + "qqqqqqqqqqqqqqqqqqq");         

    this.httpProvider.loginUser(data).subscribe(
      (userData: any) => {
        this.token=userData.token;
        localStorage.setItem('token',this.token)
        console.log(userData.token);
        // Handle the retrieved user data here
        if (userData.response == 'success') {
           setTimeout(() => {
            this.router.navigate(['/ViewUser/'+userData.userId]);
          }, 500);
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  title = 'you are login page';
}
