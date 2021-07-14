import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService) { }

  user : User;

  ngOnInit(): void {
    
    this.router.events.subscribe((ev)=>{
      this.user = JSON.parse(localStorage.getItem('user'));
    })
  }

  logout(){
    this.userService.logout();
    this.user = null;
    this.router.navigate(['/']);

  }

  goHome(){
    this.router.navigate(['/']);
  }

  addRealEstate(){
    this.router.navigate(['new-re']);
  }

  addUser(){
    this.router.navigate(['register']);
  }

  myProfile(){
    this.router.navigate(['profile']);
  }

  myRealEstates(){
    this.router.navigate(['my-real-estates']);
  }

  promote(){
    this.router.navigate(['promote']);
  }
}
