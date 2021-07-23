import { Component, OnInit } from '@angular/core';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-new-re',
  templateUrl: './new-re.component.html',
  styleUrls: ['./new-re.component.css']
})
export class NewReComponent implements OnInit {

  photos : any;
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

  message:string;
  constructor(private reService: RealestatesService) { }

  ngOnInit(): void {
  }

  publish(){
    let user = JSON.parse(localStorage.getItem("user"));
    let username;
    let accepted;
    
    if(user.type == 2){
      username = user.username;
      accepted = 0;
    }
    else {
      username = 'agency';
      accepted =1;
    }

    if(this.city == undefined || this.region == undefined || this.price == undefined ||
      this.house_flat == undefined || this.rooms == undefined || this.area == undefined ||
      this.sell_rent == undefined || this.description == undefined || this.address == undefined ||
      this.floor == undefined){
        this.message = "Fill the reqired fields";
        return;
      }


      let photos = [];
      if (this.photos != undefined){
        photos.push(this.photos.name);
      }

      console.log(photos);


    this.reService.addNewRealEstate(photos, this.region, this.city, this.price, this.house_flat,this.rooms,
       this.area, this.sell_rent,"no", this.description, this.address, this.floor, this.total_floors, this.furnished,
       username, "no", [], [], accepted).subscribe((ob)=>{
        if(ob['realestate']=='ok'){
          alert('Realestate added');
        }
       });
  }


  onFileSelected(event) {
    console.log(event.target.files);
    this.photos = event.target.files[0]; 
    console.log(this.photos);
  }
}
