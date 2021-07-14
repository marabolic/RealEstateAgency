import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../model/realestateModel';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-all-re',
  templateUrl: './all-re.component.html',
  styleUrls: ['./all-re.component.css']
})
export class AllReComponent implements OnInit {

  constructor(private reService: RealestatesService) { }

  ngOnInit(): void {
    this.all = [];
    
    this.reService.getAllRealestates().subscribe((data:RealEstate[])=>{
      this.all = data;
    });
  }
  all: RealEstate[];

  promote(id){
    this.reService.setPromoted(id, 'yes').subscribe((resp)=>{
      if (resp['message']=='ok'){
        this.reService.getAllRequests().subscribe((data:RealEstate[])=>{
          this.all = data;
        });
      }
    })
  }

  unpromote(id){
    this.reService.setPromoted(id, 'no').subscribe((resp)=>{
      if (resp['message']=='ok'){
        this.reService.getAllRequests().subscribe((data:RealEstate[])=>{
          this.all = data;
        });
      }
    })
  }
}
