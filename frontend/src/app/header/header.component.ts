import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  user : User;

  ngOnInit(): void {
    
    this.router.events.subscribe((ev)=>{
      this.user = JSON.parse(localStorage.getItem('user'));
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
