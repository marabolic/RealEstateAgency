import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  rep_password: string;
  email: string;
  city: string;
  country: string;
  avatar: string;
  type: number;


  register(){
    this.userService.register(this.firstname, this.lastname, this.username, this.password, 
      this.email, this.city, this.country, "avatar.jpg", "0", 2).subscribe(ob=>{
      if(ob['user']=='ok'){
        alert('User added');
      }
    })
  }

}
