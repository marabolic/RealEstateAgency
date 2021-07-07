import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realestateModel';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private realestateService: RealestatesService, private router: Router) { }

  ngOnInit(): void {

    this.realestates = [];
  }

  city: string;
  minimum: string;
  maximum: string;

  realestates : RealEstate[];



  search(){
    let min=-1, max=-1;

    if (!this.minimum && !this.maximum && !this.city){ //NO PARAMS
      alert("unesite neki podatak za pretragu");
      return;
    }

    if (this.maximum && this.minimum && this.city) { //ALL PARAMS
      max = Number(this.maximum);
      min = Number(this.minimum);

      this.realestateService.searchAll(min, max, this.city).subscribe((realestate: RealEstate[])=>{
        if (realestate){
          this.realestates = realestate;
        }
        else{
          alert("Does not exist");
        }
      })

    }

    if (this.maximum && this.minimum && !this.city){ // MIN AND MAX
      max = Number(this.maximum);
      min = Number(this.minimum);

      this.realestateService.searchMinMax(min, max).subscribe((realestate: RealEstate[])=>{
        if (realestate){
          this.realestates = realestate;
        }
        else{
          alert("Does not exist");
        }
      })
    }


    if (this.maximum && !this.minimum && this.city){ // MAX AND CITY
      max = Number(this.maximum);
      min = Number(this.minimum);

      this.realestateService.searchMaxCity(max, this.city).subscribe((realestate: RealEstate[])=>{
        if (realestate){
          this.realestates = realestate;
        }
        else{
          alert("Does not exist");
        }
      })
    }

    if (!this.maximum && this.minimum && this.city){ //MIN AND CITY
      max = Number(this.maximum);
      min = Number(this.minimum);

      this.realestateService.searchMinCity(min, this.city).subscribe((realestate: RealEstate[])=>{
        if (realestate){
          this.realestates = realestate;
        }
        else{
          alert("Does not exist");
        }
      })
    }
    

    if (!this.maximum && this.minimum && !this.city){ //MIN
      min = Number(this.minimum);
      console.log(min);


      this.realestateService.searchMin(min).subscribe((realestate: RealEstate[])=>{
        if (realestate){
          console.log(realestate);
          this.realestates = realestate;
        }
        else{
          alert("Does not exist");
        }
      })
    }


    if (this.maximum && !this.minimum && !this.city){ //MAX
      max = Number(this.maximum);

      this.realestateService.searchMax(max).subscribe((realestate: RealEstate[])=>{
        if (realestate){
          this.realestates = realestate;
        }
        else{
          alert("Does not exist");
        }
      })
    }

    if (!this.maximum && !this.minimum && this.city){ //CITY
      max = Number(this.maximum);
      min = Number(this.minimum);

      this.realestateService.searchCity(this.city).subscribe((realestate: RealEstate[])=>{
        if (realestate){
          this.realestates = realestate;
        }
        else{
          alert("Does not exist");
        }
      })
    }
  }

}
