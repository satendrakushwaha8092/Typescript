import { Component, Inject, OnInit } from '@angular/core';

import { HttpProviderService } from '../Service/http-provider.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  userId:any
  userDetail: any;
  name: any;
  constructor( private route: ActivatedRoute, private httpProvider : HttpProviderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId=5
    console.log(this.route.snapshot.params)
    this.userId = this.route.snapshot.params['Id'];      
    // this.updateUser();
  }

  updateUser(data: any) {       
    this.httpProvider.updateUser(this.userId,data).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.userDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log( result);
      this.httpProvider.updateUser(this.userId,{name:result}).subscribe((data : any) => {      
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.userDetail = resultData;
          }
        }
      },
      (error :any)=> { });
    });
  }

}

@Component({
  selector: 'dialog-overview',
  templateUrl: './dialog-overview.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}