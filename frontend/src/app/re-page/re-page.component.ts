import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../model/realestateModel';
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
  constructor(private realestateService: RealestatesService) { }

  ngOnInit(): void {
    this.estate = JSON.parse(localStorage.getItem("estate"));
    this.creditprice = this.estate.price * 0.2;
  }

  buy(id){
    this.realestateService.buyRealEstate(id);
  }

  rent(){

  }

}
