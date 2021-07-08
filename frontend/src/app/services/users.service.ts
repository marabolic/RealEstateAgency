import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

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

  getAllRequests(){
    return this.http.get(`${this.uri}/regrequest`);
  }


  updateReqest(username, status){
    const data = {
      username: username,
      accepted: status
    }
    return this.http.post(`${this.uri}/updateRequest`, data);
  }


  


  
  
}
