import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  constructor(private http: HttpClient) {}
  userData:any;
  name:any
  getData(search:any){
   return this.http.get("http://localhost:3000/user"+'?search='+search)
}
getDataById(search:any){
  //  return this.http.get("http://localhost:3000/user"+'?search='+search)
  return this.http.get("http://localhost:3000/user/"+search)

}
}

