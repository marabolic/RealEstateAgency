import { Component, Input, OnInit } from '@angular/core';
import { RealEstate } from '../model/realestateModel';

@Component({
  selector: 'app-re-card',
  templateUrl: './re-card.component.html',
  styleUrls: ['./re-card.component.css']
})
export class ReCardComponent implements OnInit {

  @Input() re: RealEstate;

  constructor() { }

  ngOnInit(): void {
  }

}
