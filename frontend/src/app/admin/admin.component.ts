import { Component, OnInit } from '@angular/core';
import { User } from '../model/userModel';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UsersService) { }

  requests: User[];

  ngOnInit(): void {
    this.requests = [];
  }



}
