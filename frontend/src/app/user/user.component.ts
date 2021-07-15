import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realestateModel';
import { User } from '../model/userModel';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(private router: Router, private reService: RealestatesService) { }

  user : User;
  offers: RealEstate[];

  ngOnInit(): void {
    this.offers = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.reService.getAllRealestates().subscribe((data:RealEstate[])=>{
      
      data.forEach((re)=>{
        if (re.owner == this.user.username){
          this.offers.push(re);
        }
      })
    });
  }

  profile(){
    this.router.navigate(["profile"]);
  }

  acceptOffer(id, i){
    let re = this.offers.find((e)=>e._id == id);
    console.log("tu");
    this.reService.acceptOffer(i, id).subscribe((ob)=>{
      re.offers.splice(i, 1);
      console.log("posle " + this.offers);
    });
  }
}
