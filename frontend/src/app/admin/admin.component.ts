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
    this.userService.getAllRequests().subscribe((data:User[])=>{
      this.requests = data;
    });
  }

  accept(username){
    this.userService.updateReqest(username, "1").subscribe((resp)=>{
      if (resp['message']=='ok'){

      }
    })
  }

  reject(username){
    this.userService.updateReqest(username, "-1").subscribe((resp)=>{
      if (resp['message']=='ok'){
        
      }
    })
  }



}
