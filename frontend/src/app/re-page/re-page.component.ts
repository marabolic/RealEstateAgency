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
  datefrom: string;
  dateto: string;
  loaded = false;
  user : User;
  dateError:string;
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
    if(new Date(this.datefrom).getTime() > new Date(this.dateto).getTime()){
      alert("Dates not correct");
      return;
    }

    let flag = 0;
    this.estate.rented.forEach((re)=>{
        if (!(new Date(re.dateto).getTime() < new Date(this.datefrom).getTime() || 
        new Date(re.datefrom).getTime() > new Date(this.dateto).getTime())){
          flag = 1;
          return;
        } 
    })
    if (flag){
      this.dateError = "Occupied";
      return;
    }
    
    this.dateError = "";

    this.realestateService.giveOfferRent(this.user.username, this.estate._id, this.newprice, 
      new Date(this.datefrom), new Date(this.dateto)).subscribe((ob)=>{
        if (ob['message']=='ok'){
          this.newprice = undefined;
          this.datefrom = undefined;
          this.dateto = undefined;
        }
      })



  
  }

}
