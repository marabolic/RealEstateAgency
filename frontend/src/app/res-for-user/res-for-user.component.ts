import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../model/realestateModel';
import { User } from '../model/userModel';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-res-for-user',
  templateUrl: './res-for-user.component.html',
  styleUrls: ['./res-for-user.component.css']
})
export class ResForUserComponent implements OnInit {

  constructor(private reService: RealestatesService) { }

  user: User;
  myrealestates : RealEstate[];

  ngOnInit(): void {
    this.myrealestates = [];
    this.user = JSON.parse(localStorage.getItem("user"));

    this.reService.getRealEstateByUsername(this.user.username).subscribe((res : RealEstate[])=>{
      this.myrealestates = res;
      console.log(this.myrealestates);
    })

  }



}
