import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UsersService, private router: Router) { }

  username: string;
  password: string;

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      console.log("here");
      if (user){
        if (user.accepted == '1'){
          
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['']);
          
        }
        else{
          alert("User not accepted");
        }
      }
      else{
        alert("Bad data");
      }
    });
  }

}
