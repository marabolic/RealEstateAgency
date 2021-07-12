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
  type: string;

  avatar :any;

  message : string;

  register(){

    let type;
    if (this.type == 'agent'){
      type = 1;
    }
    else{
      type = 2;
    }

    if(this.firstname == undefined || this.lastname == undefined || this.username == undefined ||
      this.password == undefined || this.rep_password == undefined || this.email == undefined ||
      this.city == undefined || this.country == undefined || this.type == undefined){
        this.message = "Fill the reqired fields";
        return;
      }


    var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
    if(!regularExpression.test(this.password)) {
      this.message = "Password should contain atleast one number and one special character";
      return;
    }
    console.log(this.avatar.name);
    let avatar;
    
    if (this.avatar != undefined){
      let splitted =  this.avatar.toString().split("\\");
      avatar = splitted[2];
    }
    else{
      avatar = 'avatar.png';
    }
    
    this.userService.register(this.firstname, this.lastname, this.username, this.password, 
      this.email, this.city, this.country, avatar, "0", type).subscribe(ob=>{
      if(ob['user']=='ok'){
        alert('User added');
      }
    })
  }


  onFileSelected(event) {
    console.log(event.target.files);
    this.avatar = event.target.files; 
  }
}
