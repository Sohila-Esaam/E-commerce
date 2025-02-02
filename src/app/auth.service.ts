import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    if(localStorage.getItem('userToken') !== null){
      this.decodeUserData();
    }
   }

    //register
    register(userData:object):Observable<any>{
      return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
    }

    //login
    login(userData:object):Observable<any>{
      return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData);
    }

    //method for decode token
    userData= new BehaviorSubject(null);
    decodeUserData(){
      let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
      let decodedToken:any = jwtDecode(encodedToken);
      this.userData.next(decodedToken);
    }

    //logout
    logout(){
      localStorage.removeItem('userToken');
      this.userData.next(null);
      this._Router.navigate(['/login']);
    }

}
