import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { ToastService } from '../Service/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  check = false;

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {}

  userData: any;

  token: any;

  login(data: any) {
    this.httpProvider.loginUser(data).subscribe(
      (userData: any) => {
        this.token = userData.token;
        localStorage.setItem('token', this.token);
        console.log(userData.token);
        // Handle the retrieved user data here
        if (userData.response == 'success') {
          this.toastService.show('you are successfully login', {
            classname: 'bg-success text-light',
            delay: 2000,
          });

          setTimeout(() => {
            this.router.navigate(['/ViewUser/' + userData.userId]);
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
