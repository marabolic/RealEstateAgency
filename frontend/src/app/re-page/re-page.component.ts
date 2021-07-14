import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../model/realestateModel';
import { User } from '../model/userModel';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-re-page',
  templateUrl: './re-page.component.html',
  styleUrls: ['./re-page.component.css']
})
export class RePageComponent implements OnInit {

  estate : RealEstate;

  creditprice: number;

  selected: string;

  newprice: number;
  datefrom: Date;
  dateto: Date;
  loaded = false;
  user : User;
  constructor(private realestateService: RealestatesService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.estate = JSON.parse(localStorage.getItem("estate"));
    this.creditprice = this.estate.price * 0.2;
    setTimeout(function(){
      this.loaded = true;
    },30);

  }

  buy(id){
    this.realestateService.giveOfferBuy(id, this.user.username, this.newprice).subscribe((ob)=>{
      alert(ob['message']);
      if(ob['message']=='ok'){
        this.newprice = undefined;
        
      }
    })
  }

  rent(id){
    if(this.datefrom.getDate() > this.dateto.getDate()){
      alert("Dates not correct");
      return;
    }

    this.estate.rented.forEach((re)=>{
        if (re.dateto.getDate() < this.datefrom.getDate() || re.datefrom.getDate() > this.dateto.getDate()){
          alert("helo");
        } 
    })

  
  }

}
