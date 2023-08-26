import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

var apiUrl = "http://localhost:3000/";

var httpLink = {
  getAllUser: apiUrl + "/api/user/getAllUser",
  deleteUserById: apiUrl + "/api/user/deleteUserById",
  getUserDetailById: apiUrl + "user",
  saveUser: apiUrl + "add",
  loginUser: apiUrl + "login",
  updateUser: apiUrl + "update"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService implements OnInit {
  token :any;
  head:any
  constructor(private webApiService: HttpClient) { 

  }
  ngOnInit(): void {
    
        this.token =localStorage.getItem('token');
        console.log(this.token);
        
        this.head = new HttpHeaders({
           'Authorization':'Bearer '+this.token
        })
    throw new Error('Method not implemented.');
  }


  public getAllUser(): Observable<any> {
    return this.webApiService.get(httpLink.getAllUser,{headers:this.head});
  }
  public deleteUserById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteUserById + '?Id=' + model, "");
  }
  public getUserDetailById(model: any): Observable<any> {
    this.token =localStorage.getItem('token');
    console.log(this.token);
    
    this.head = new HttpHeaders({
       'Authorization':'Bearer '+this.token
    })
    return this.webApiService.get(httpLink.getUserDetailById + '/' + model,{headers:this.head});
  }
  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser, model);
  }
  public loginUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.loginUser, model);
  } 
  public updateUser(id:any,model: any): Observable<any> {
    return this.webApiService.put(httpLink.updateUser+ '/' + id, model, {headers:this.head});
  }  
}                          