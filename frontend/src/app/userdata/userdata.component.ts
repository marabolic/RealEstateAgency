import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/userModel';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  constructor() { }

  @Input() user: User;

  ngOnInit(): void {
  }

}
