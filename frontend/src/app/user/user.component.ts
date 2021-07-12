import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(private router: Router) { }

  user : User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  profile(){
    this.router.navigate(["profile"]);
  }
}
