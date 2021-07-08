import { Component, OnInit } from '@angular/core';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-new-re',
  templateUrl: './new-re.component.html',
  styleUrls: ['./new-re.component.css']
})
export class NewReComponent implements OnInit {

  photos : Array<string>;
  region : string;
  city : string;
  price : number;
  house_flat : string;
  rooms : number;
  area : number;
  sell_rent : string;
  promoted : string;
  description : string;
  address: string;
  floor: number;
  total_floors: number;
  furnished: string;

  constructor(private reService: RealestatesService) { }

  ngOnInit(): void {
  }

  publish(){
    let user = JSON.parse(localStorage.getItem("user"));
    this.reService.addNewRealEstate(this.region, this.city, this.price, this.house_flat,this.rooms,
       this.area, this.sell_rent,"no", this.description, this.address, this.floor, this.total_floors, this.furnished,
       user.username, "no", []).subscribe((ob)=>{
        if(ob['realestate']=='ok'){
          alert('User added');
        }
       });
  }
}
