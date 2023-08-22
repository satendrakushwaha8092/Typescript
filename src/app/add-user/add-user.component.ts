import { Component, OnInit } from '@angular/core';
import { HttpProviderService } from '../Service/http-provider.service';

import { ToastService } from '../Service/toast.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {}

  createData(data: any) {
    this.httpProvider.saveUser(data).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          //if (resultData != null && resultData.isSuccess) {
          this.toastr.show('I am a standard toast', {
            timeOut: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 1000);
          //}
        }
      },
      async (error) => {
        //this.toastr.error(error.message);
        setTimeout(() => {
          this.router.navigate(['/Home']);
        }, 1000);
      }
    );
  }
}
