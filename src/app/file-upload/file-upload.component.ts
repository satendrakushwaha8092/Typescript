import { Component, Input, OnInit } from '@angular/core';
import { HttpProviderService } from '../Service/http-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: '[app-file-upload]',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  // @Input('app-file-upload') inData: any;

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
  ) {}

   ngOnInit(): void {
  //   console.log(this.inData);
   }

  uploadedImage: any;
  dbImage: any;
  postResponse: any;
  successResponse: any;
  image: any;

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
  }

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    console.log( this.uploadedImage, this.uploadedImage.name)


    this.httpProvider.uploadFile(imageFormData).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          //if (resultData != null && resultData.isSuccess) {
          
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

//    viewImage() {
//   //   this.httpClient.get('http://localhost:8080/get/image/info/' + this.image)
//   //     .subscribe(
//   //       res => {
//           this.postResponse = "qqqqqqqqqqqqqqqqqqqq";
//           this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
//   //       }
//   //     );
//   // }
// }
}
