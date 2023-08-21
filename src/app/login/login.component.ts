import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';

import {Injectable} from '@angular/core';

import { HttpClient,HttpHeaders  } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@ Injectable({providedIn:"root"})

export class LoginComponent implements OnInit {
   constructor(private http: HttpClient) {}

   @ Input() token='0'

   @Output() updateDataEvent = new EventEmitter<string>();


   ngOnInit(): void {
    
   }

   title="login page"

   data:any
   check:any
   usertoken:any=''
  
//   ngOnInit(): void {
//     console.log(this.data)
//   }
   userData:any;
  login(data:any): void { 
    this.http.post("http://localhost:3000/login",data).subscribe(
      (userData: any) => {
        this.usertoken=userData.token;
        console.log(userData.response)
          // Handle the retrieved user data here
                      if(userData.response=="success"){
                        this.check=true
                        this.userData=userData
                      }
      },
      (error: any) => {
          console.error('Error fetching user data:', error);
      }
  );

    }


// ngOnInit() {
  
//   let auth_token = "asasa21212....";

//   const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });

//   const requestOptions = { headers: headers };
   
//   this.http
//       .get('http://localhost:8001/events.php', requestOptions)
//       .subscribe((res: any) => {
//           console.log(res);
//       });
// }

}
