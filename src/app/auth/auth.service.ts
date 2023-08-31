import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  isLoggedIn: any;
  check(){
    this.isLoggedIn = true;
  }
  check2(){
    this.isLoggedIn = false;
  }
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  isAuthenticated() {
    return this.isLoggedIn;
  }
}
