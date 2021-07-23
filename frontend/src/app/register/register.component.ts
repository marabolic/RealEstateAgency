import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) { }

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
  messagePass:string;
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
        this.messagePass = "Password should contain atleast one number and one special character";
        return;
      }

      if (this.password != this.rep_password){
        this.message = "Passwords don't match";
        return;
      }
    
    this.userService.getAllUsers().subscribe((users:User[])=>{
      let found = 0;
      users.forEach((user)=>{
        if (user.username == this.username){
          this.message = "Username already taken";
          found = 1;
          return;
        }
      })
      if (found == 1)
        return;
    })

    var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
    if(!regularExpression.test(this.password)) {
      this.message = "Password should contain atleast one number and one special character";
      return;
    }

    if (this.password != this.rep_password){
      this.message = "Passwords don't match";
      return;
    }
    
    
    this.userService.getAllUsers().subscribe((users:User[])=>{
      let found = 0;
      users.forEach((user)=>{
        if (user.email == this.email){
          this.message = "Email already exists";
          found = 1;
          return;
        }
      })
      if (found == 1)
        return;
    })

    let avatar;
    
    if (this.avatar != undefined){
     
      avatar = this.avatar.name;
     
    }
    else{
      avatar = 'avatar.png';
    }

   
    
    
    this.userService.register(this.firstname, this.lastname, this.username, this.password, 
      this.email, this.city, this.country, avatar, "0", type).subscribe(ob=>{
      if(ob['user']=='ok'){
        alert('User added');
        this.router.navigate(['login']);
      }
    })
  }


  onFileSelected(event) {
    console.log(event.target.files);
    this.avatar = event.target.files[0]; 
    console.log(this.avatar);
  }
}
