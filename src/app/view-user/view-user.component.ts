import { Component, OnInit  } from '@angular/core';

import { HttpProviderService } from '../Service/http-provider.service';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  show=true

  employeeId: any;
  userDetail : any= [];

  constructor( private rout: Router, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    //this.employeeId=5
    console.log(this.route.snapshot.params)
    this.employeeId = this.route.snapshot.params['Id'];      
    this.getUserDetailById();
  }

  getUserDetailById() {       
    this.httpProvider.getUserDetailById(this.employeeId).subscribe((data : any) => {      
      // if (data != null && data.body != null) {
      //   var resultData = data.body;
      //   if (resultData) {
          this.userDetail = data;
    //     }
    //   }
     },
    (error :any)=> { }); 
  }

  updateUser() {
    this.rout.navigate(['EditUser/'+this.userDetail.id]);
  }


}
