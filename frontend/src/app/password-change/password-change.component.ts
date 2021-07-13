import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) { }

  old_password: string;
  new_password: string;
  rep_password: string;

  messageOld : string;
  messageNew : string;
  messageRep : string;
  user : User;

  ngOnInit(): void {
    this.messageNew = "";
    this.messageOld = "";
    this.messageRep = "";
    this.user = JSON.parse(localStorage.getItem("user"));

  }

  change(){

    let flag = 0;
    this.messageNew = "";
    this.messageOld = "";
    this.messageRep = "";
    
    if (this.old_password == undefined || this.old_password == ''){
      this.messageOld = "Field is required";
      flag = 1;
    } 
    else{
      if (this.old_password != this.user.password){
        this.messageOld = "Old password wrong";
        flag = 1;
      }
    }

    if(this.new_password == undefined || this.new_password == ''){
      this.messageNew = "Field is required";
      flag = 1;
    } 
    else{
      var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
      if(!regularExpression.test(this.new_password)) {
        this.messageNew = "Password should contain atleast one number and one special character";
        flag = 1;
    }
      
    }
    if(this.rep_password == undefined || this.rep_password == ''){
      this.messageRep = "Field is required";
      flag = 1;
    }
    else{
      if (this.new_password != this.rep_password){
        this.messageRep = "Passwords don't match";
        flag = 1;
      }
    }


    if (flag == 1){
      return;
    }

    this.userService.changePassword(this.user.username, this.new_password).subscribe((ob)=>{
      if(ob['message']=='ok'){
        localStorage.clear();
        this.router.navigate(['']);
      }
    })
    



  }

}
