import { Component, OnInit } from '@angular/core';
import { User } from '../model/userModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor() { }

  user : User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
