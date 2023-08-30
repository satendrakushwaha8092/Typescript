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
  uploadedImage:any;
  path:any
  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {}

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    console.log( this.uploadedImage, this.uploadedImage.name)


    this.httpProvider.uploadFile(imageFormData).subscribe(
      (data: any) => {
        this.path=data
      },
      async (error) => {
        //this.toastr.error(error.message);
        setTimeout(() => {
          this.router.navigate(['/Home']);
        }, 1000);
      }
    );
  }

  createData(data: any) {
    data.path=this.path.path
    this.httpProvider.saveUser(data).subscribe(
      (data: any) => {
          //if (resultData != null && resultData.isSuccess) {
            this.toastService.show('user added successfully', { classname: 'bg-success text-light', delay: 2000 });

          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 3000);
          //}
      },
      async (error) => {
        //this.toastr.error(error.message);
        setTimeout(() => {
          this.router.navigate(['/Home']);
        }, 1000);
      }
    );
  }

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
  } 

}
