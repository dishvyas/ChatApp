import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { user } from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private route: Router, private http: HttpClient) { }
  private base_url = "http://localhost:3000/api/";


  public userName: string = '';
  public userEmail: string = '';
  public userType: string = '';

  //register
  registerUser(userData): Observable<user> {
    return this.http.post<user>(this.base_url + "register", userData);
  }
  //sigin 
  loginUser(userData): Observable<user> {
    return this.http.post<user>(this.base_url + "login", userData);
  }
  //returns boolean value, checks token exist or not
  loggedIn() {
    return !!localStorage.getItem('token1');

  }
  //remove token & navigate to login page
  loggedOut() {
    localStorage.removeItem("token1");
    this.route.navigate(['/login']);
  }
  //get stored token
  getToken() {
    return localStorage.getItem('token1');
  }
}
