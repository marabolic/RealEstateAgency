import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private router:Router, private userService: UsersService) { }

  user : User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));


    this.router.events.subscribe((ob)=>{
      this.user = JSON.parse(localStorage.getItem("user"));
      
    })

    this.userService.loggedOut$.subscribe((usr)=>{
      this.user = null;
    })

    
  }

}
