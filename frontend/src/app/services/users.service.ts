import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { User } from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
    this.loggedOut$ = new EventEmitter();
   }

  uri = 'http://localhost:4000';
  public loggedOut$: EventEmitter<User>;

  login(username, password){
    const data = {
      username : username,
      password : password
    }

    console.log("Login user service");
    console.log(data);
    
    return this.http.post(`${this.uri}/login`, data);
  }


  register(firstname, lastname, username, password, email, city, country, avatar, accepted, type){
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      city: city,
      country: country,
      avatar: avatar,
      accepted: accepted,
      type: type
    }
    
    console.log("U users service");
    console.log(data);

    return this.http.post(`${this.uri}/register`, data);
  }

  logout(){
    let user = JSON.parse(localStorage.getItem("user"));
    localStorage.clear();
    this.loggedOut$.emit(user);
  }

  getAllRequests(){
    return this.http.get(`${this.uri}/regrequest`);
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/allusers`);
  }

  updateReqest(username, status){
    const data = {
      username: username,
      accepted: status
    }
    return this.http.post(`${this.uri}/updateUserRequest`, data);
  }


  changePassword(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/changePassword`, data);
  }


  
  
}
