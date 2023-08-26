import { Component, OnInit } from '@angular/core';

import { HttpProviderService } from '../Service/http-provider.service';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  userId:any
  userDetail: any;
  constructor( private route: ActivatedRoute, private httpProvider : HttpProviderService) { }

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

}
