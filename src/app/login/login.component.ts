import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { ToastService } from '../Service/toast.service';
import { AuthService } from '../auth/auth.service';
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
    public toastService: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  userData: any;

  token: any;

  login(data: any) {
    this.httpProvider.loginUser(data).subscribe(
      (userData: any) => {
        // console.log(userData);
        // Handle the retrieved user data here
        if (userData && userData.response == 'success') {
          this.authService.check()
          this.token = userData.token;
        localStorage.setItem('token', this.token);
          this.toastService.show('you are successfully login', {
            classname: 'bg-success text-light',
            delay: 2000,
          });

          setTimeout(() => {
            this.router.navigate(['/ViewUser']);
          }, 500);
        }
      },
      (error: any) => {
        {
          this.toastService.show(error.error.message, {
            classname: 'bg-danger text-light',
            delay: 2000,
          });        
        }
        console.error('Error fetching user data:', error.error.message);
      }
    );
  }

  title = 'you are login page';
}
