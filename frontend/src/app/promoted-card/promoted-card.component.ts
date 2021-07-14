import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realestateModel';
import { User } from '../model/userModel';

@Component({
  selector: 'app-promoted-card',
  templateUrl: './promoted-card.component.html',
  styleUrls: ['./promoted-card.component.css']
})
export class PromotedCardComponent implements OnInit {

  @Input() re: RealEstate;
  user : User;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.re.photos);
  }

  showPage(){
    localStorage.setItem("estate", JSON.stringify(this.re));
    this.router.navigate(['/re_page']);
  }


}
