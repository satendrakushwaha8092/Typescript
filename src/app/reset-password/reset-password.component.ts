import { Component, OnInit } from '@angular/core';

import { HttpProviderService } from '../Service/http-provider.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}
  
  ngOnInit(): void {  }

  login(data: any) {

    this.httpProvider.saveUser(data).subscribe(
      (data: any) => {
          
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 1000);
      },
      async (error) => {
        setTimeout(() => {
          this.router.navigate(['/Home']);
        }, 1000);
      }
    );
  }
}
