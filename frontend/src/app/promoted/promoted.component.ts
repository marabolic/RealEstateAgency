import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../model/realestateModel';
import { RealestatesService } from '../services/realestates.service';

@Component({
  selector: 'app-promoted',
  templateUrl: './promoted.component.html',
  styleUrls: ['./promoted.component.css']
})
export class PromotedComponent implements OnInit {

  constructor(private realService: RealestatesService) { }

  promoted : RealEstate[];

  ngOnInit(): void {
    this.promoted = [];
    this.realService.getAllPromoted().subscribe((data:RealEstate[])=>{
      this.promoted = data;
    });
  }

  

}
