import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:3000/";

var httpLink = {
  getAllUser: apiUrl + "/api/user/getAllUser",
  deleteUserById: apiUrl + "/api/user/deleteUserById",
  getUserDetailById: apiUrl + "user",
  saveUser: apiUrl + "add",
  loginUser: apiUrl + "login"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllUser(): Observable<any> {
    return this.webApiService.get(httpLink.getAllUser);
  }
  public deleteUserById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteUserById + '?Id=' + model, "");
  }
  public getUserDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getUserDetailById + '/' + model);
  }
  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser, model);
  }
  public loginUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser, model);
  }  
}                          