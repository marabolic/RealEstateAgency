import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/userModel';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css']
})
export class UserModifyComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService,
      private router: Router) { }



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

  usernameEdit :string;

  avatarChanged = false;

  user: User;
  ngOnInit(): void {

   // this.user = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.params.subscribe((params)=>{
      this.usernameEdit = params['username'];
      this.userService.getUser(this.usernameEdit).subscribe((u:User)=>{
        this.firstname = u.firstname;
        this.lastname = u.lastname;
        this.email = u.email;
        this.city = u.city;
        this.country = u.country;
        this.avatar = u.avatar;
      })
    })
  }

  change(){

    let newUser = new User();
    
    newUser.firstname = this.firstname;
    newUser.lastname =this.lastname;
    newUser.email = this.email;
    newUser.city = this.city;
    newUser.country = this.country;

    if(!this.avatarChanged){
      newUser.avatar = this.avatar;
    }
    else if(this.avatar)
      newUser.avatar = this.avatar.name;
    else{
      newUser.avatar = 'avatar.png';
    }
    

    this.userService.editUser(this.usernameEdit, newUser).subscribe((ob)=>{
      if (ob['message']=='ok'){
        this.router.navigate(['']);
      }
    })
  }


  onFileSelected(event) {
    console.log(event.target.files);
    this.avatarChanged = true;
    this.avatar = event.target.files[0]; 
    console.log(this.avatar);
  }
}
