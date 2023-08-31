import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

var apiUrl = 'http://localhost:3000/';

var httpLink = {
  getAllUser: apiUrl + '/api/user/getAllUser',
  deleteUserById: apiUrl + 'user',
  getUserDetailById: apiUrl + 'user',
  saveUser: apiUrl + 'add',
  loginUser: apiUrl + 'login',
  updateUser: apiUrl + 'update',
  upload: apiUrl + 'upload',
};
@Injectable({
  providedIn: 'root',
})
export class HttpProviderService implements OnInit {
  token: any;
  head: any;
  constructor(private webApiService: HttpClient) {}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    console.log(this.token);

    this.head = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    throw new Error('Method not implemented.');
  }

  public getAllUser(): Observable<any> {
    return this.webApiService.get(httpLink.getAllUser, { headers: this.head });
  }

  public deleteUserById(model: any): Observable<any> {
    return this.webApiService.post(
      httpLink.deleteUserById + '?Id=' + model,
      ''
    );
  }

  public getUserDetailById(): Observable<any> {
    this.token = localStorage.getItem('token');

    this.head = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.webApiService.get(httpLink.getUserDetailById , {
      headers: this.head,
    });
  }

  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser, model);
  }

  public loginUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.loginUser, model);
  }

  public updateUser(model: any): Observable<any> {
    this.token = localStorage.getItem('token');

    this.head = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.webApiService.put(httpLink.updateUser, model, {
      headers: this.head,
    });
  }

  public uploadFile(model: any): Observable<any> {
    return this.webApiService.post(httpLink.upload, model);
  }

  public deleteUser(): Observable<any> {
    this.token = localStorage.getItem('token');

    this.head = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.webApiService.delete(httpLink.deleteUserById, {
      headers: this.head,
    });
  }
}
