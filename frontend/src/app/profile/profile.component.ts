import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private router: Router) { }

  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

}
