import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realestateModel';
import { User } from '../model/userModel';
import { RealestatesService } from '../services/realestates.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UsersService, private reService: RealestatesService,
              private router: Router) { }

  usrrequests: User[];
  all: User[];
  rerequests: RealEstate[];
  user :User;

  ngOnInit(): void {
    this.usrrequests = [];
    this.rerequests = [];
    this.all = [];

    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getAllRequests().subscribe((data:User[])=>{
      this.usrrequests = data;
    });
    this.userService.getAllUsers().subscribe((data:User[])=>{
      this.all = data;
    })
    this.reService.getAllRequests().subscribe((data:RealEstate[])=>{
      this.rerequests = data;
    });
  }

  accept(username){
    this.userService.updateReqest(username, 1).subscribe((resp)=>{
      if (resp['message']=='ok'){
        this.userService.getAllRequests().subscribe((data:User[])=>{
          this.usrrequests = data;
        });
      }
    })
  }

  reject(username){
    this.userService.updateReqest(username, "-1").subscribe((resp)=>{
      if (resp['message']=='ok'){
        this.userService.getAllRequests().subscribe((data:User[])=>{
          this.usrrequests = data;
        });
      }
    })
  }

  update(){
      this.router.navigate(['user-modify']);
  }

  delete(username){
    this.userService.updateReqest(username, -1).subscribe((resp)=>{
      if (resp['message']=='ok') 
      this.userService.getAllUsers().subscribe((data:User[])=>{
        this.all = data;
      });
    })
  }


  remove(username){
    this.userService.updateReqest(username, -2).subscribe((resp)=>{
      if (resp['message']=='ok') 
      this.userService.getAllUsers().subscribe((data:User[])=>{
        this.all = data;
      });
    })
  }



}
