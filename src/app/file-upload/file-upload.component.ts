import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor() { }

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


    // this.httpClient.post('http://localhost:8080/upload/image/', imageFormData, { observe: 'response' })
    //   .subscribe((response) => {
        if (200 === 200) {
          this.postResponse ="qqqqqqqqqqqqqqqqqqqq";
          // this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      // }
      // );
    }

   viewImage() {
  //   this.httpClient.get('http://localhost:8080/get/image/info/' + this.image)
  //     .subscribe(
  //       res => {
          this.postResponse = "qqqqqqqqqqqqqqqqqqqq";
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
  //       }
  //     );
  // }
}
}
