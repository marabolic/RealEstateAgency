import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  city: string;
  minimum: string;
  maximum: string;

  search(){
    let min=-1, max=-1;
    if (this.maximum)    {
      max = Number(this.maximum);
    }
    if (this.minimum){
      min = Number(this.minimum);
    }
    if (this.city){
      
    }

  }

}
