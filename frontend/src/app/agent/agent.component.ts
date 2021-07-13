import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../model/realestateModel';
import { User } from '../model/userModel';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private reService: RealestatesService) { }

  user: User;
  requests: RealEstate[];

  ngOnInit(): void {
    this.requests = [];
    this.user = JSON.parse(localStorage.getItem("user"));
    this.reService.getAllRequests().subscribe((data:RealEstate[])=>{
      this.requests = data;
    });
  }

  accept(id){
    this.reService.acceptRealEstate(id).subscribe((resp)=>{
      if (resp['message']=='ok'){
        this.reService.getAllRequests().subscribe((data:RealEstate[])=>{
          this.requests = data;
        });
      }
    })
  }






}
