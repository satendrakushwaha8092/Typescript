import { Component, OnInit } from '@angular/core';

import { HttpProviderService } from '../Service/http-provider.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../Service/toast.service';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  show = true;

  userId: any;
  userDetail: any = [];
  token:any;

  constructor(
    private rout: Router,
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService,
    public toastService: ToastService,
    public dialog: MatDialog,
    public  authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.userId = this.route.snapshot.params['Id'];
    this.getUserDetailById();
  }

  getUserDetailById() {
    this.httpProvider.getUserDetailById().subscribe((data: any) => {
      this.userDetail = data;
    });
  }

  updateUser() {
    this.rout.navigate(['EditUser']);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  logout() {
    this.token = localStorage.clear();
    this.authService.check2()
    this.rout.navigate(['/Home']);
    console.log(this.token);
  
   }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  userDetail: any;
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    private httpProvider: HttpProviderService,
    public toastService: ToastService,
    public dialog: MatDialog,
    private router: Router,
    public  authService: AuthService

  ) {}
  deleteUser() {
    this.httpProvider.deleteUser().subscribe((data: any) => {
      this.userDetail = data;
    });
    this.toastService.show('user deleted successfully', {
      classname: 'bg-success text-light',
      delay: 2000,
    });
    localStorage.clear();
    this.authService.check2()
    this.router.navigate(['/Home']);
  }

}
