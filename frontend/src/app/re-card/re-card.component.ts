import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realestateModel';
import { User } from '../model/userModel';

@Component({
  selector: 'app-re-card',
  templateUrl: './re-card.component.html',
  styleUrls: ['./re-card.component.css']
})
export class ReCardComponent implements OnInit {

  @Input() re: RealEstate;
  user : User;

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.re.photos);
  }

  showPage(){
    localStorage.setItem("estate", JSON.stringify(this.re));
    this.router.navigate(['/re_page']);
  }

  
}
