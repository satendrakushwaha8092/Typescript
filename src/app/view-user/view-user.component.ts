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
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  show = true;

  userId: any;
  userDetail: any = [];

  constructor(
    private rout: Router,
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService,
    public toastService: ToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['Id'];
    this.getUserDetailById();
  }

  getUserDetailById() {
    this.httpProvider.getUserDetailById(this.userId).subscribe((data: any) => {
      this.userDetail = data;
    });
  }

  updateUser() {
    this.rout.navigate(['EditUser/' + this.userDetail.id]);
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
    public dialog: MatDialog
  ) {}
  deleteUser() {
    this.httpProvider.deleteUser(2).subscribe((data: any) => {
      this.userDetail = data;
    });
    this.toastService.show('user deleted successfully', {
      classname: 'bg-success text-light',
      delay: 2000,
    });
  }
}
