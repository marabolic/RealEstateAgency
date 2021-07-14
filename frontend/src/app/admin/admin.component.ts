import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realestateModel';
import { User } from '../model/userModel';
import { RealestatesService } from '../services/realestates.service';
import { UsersService } from '../services/users.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  constructor(private userService: UsersService, private reService: RealestatesService,
              private router: Router) { }

              
  ngAfterViewInit(): void {
   
    this.reService.getAllRealestates().subscribe((res: RealEstate[])=>{
      let rentHouse= 0, rentFlat = 0, sellHouse = 0, sellFlat =0;
      let cityNames = {};
      let cheapSell = 0, normalSell = 0, expensiveSell = 0,
        cheapRent = 0, normalRent= 0, expensiveRent  =0;
      let countReForCity = [];
        res.forEach((r:RealEstate)=>{
          if(r.house_flat == 'house' && r.sell_rent == 'sell')
            sellHouse++;
          if(r.house_flat == 'house' && r.sell_rent == 'rent')
            rentHouse++;
          if(r.house_flat == 'flat' && r.sell_rent == 'sell')
            sellFlat++;
          if(r.house_flat == 'flat' && r.sell_rent == 'rent')
            rentFlat++;


          if (cityNames[r.city]){
            cityNames[r.city]++;
          }
          else{
            cityNames[r.city]=1;
          }
          
          if(r.sell_rent == 'rent' && r.price < 400){
            cheapRent++;
          }
          if(r.sell_rent == 'rent' && r.price >= 400 && r.price < 900){
            normalRent++;
          }
          if(r.sell_rent == 'rent' && r.price >= 900){
            expensiveRent++;
          }
          

          if(r.sell_rent == 'sell' && r.price < 30000){
            cheapSell++;
          }
          if(r.sell_rent == 'sell' && r.price >= 30000 && r.price < 70000){
            normalSell++;
          }
          if(r.sell_rent == 'sell' && r.price >= 70000){
            expensiveSell++;
          }


        });

        let houseFlatChart = c3.generate({
          bindto: '#houseFlatChart',
          data: {
            columns: [['forSale', sellHouse, sellFlat],
                      ['forRent', rentHouse, rentFlat]],
            type: 'bar',
          },
          axis: {
            x: {
              type: 'category',
              categories: ["house", "flat"],
            }
          },
          bar: {
            width: {
              ratio: 0.5,
            }
          }
        });


        let temp : any = Object.values(cityNames);
        temp.unshift("cities");
        let cityChart = c3.generate({
          bindto: '#cityChart',
          data: {
            columns: [temp],
            type: 'bar',
          },
          axis: {
            x: {
              type: 'category',
              categories: Object.keys(cityNames),
            }
          },
          bar: {
            width: {
              ratio: 0.5,
            }
          }
        });


        let sellRange = c3.generate({
          bindto: '#sellRange',
          data: {
            columns: [['Sell', cheapSell, normalSell, expensiveSell],
                      ['Rent', cheapRent, normalRent, expensiveRent]],
            type: 'bar',
          },
          axis: {
            x: {
              type: 'category',
              categories: ["cheap", "normal", "expensive"],
            }
          },
          bar: {
            width: {
              ratio: 0.5,
            }
          }
        });


    })
   
  }

  usrrequests: User[];
  all: User[];
  rerequests: RealEstate[];
  user :User;

  ngOnInit(): void {
    this.usrrequests = [];
    this.rerequests = [];
    this.all = [];

    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getAllRequests().subscribe((data:User[])=>{
      this.usrrequests = data;
    });
    this.userService.getAllUsers().subscribe((data:User[])=>{
      this.all = data;
    })
    this.reService.getAllRequests().subscribe((data:RealEstate[])=>{
      this.rerequests = data;
    });
  }

  accept(username){
    this.userService.updateReqest(username, 1).subscribe((resp)=>{
      if (resp['message']=='ok'){
        this.userService.getAllRequests().subscribe((data:User[])=>{
          this.usrrequests = data;
        });
      }
    })
  }

  reject(username){
    this.userService.updateReqest(username, "-1").subscribe((resp)=>{
      if (resp['message']=='ok'){
        this.userService.getAllRequests().subscribe((data:User[])=>{
          this.usrrequests = data;
        });
      }
    })
  }

  update(username){
      this.router.navigate(['user-modify', username ]);
  }

  delete(username){
    this.userService.updateReqest(username, -1).subscribe((resp)=>{
      if (resp['message']=='ok') 
      this.userService.getAllUsers().subscribe((data:User[])=>{
        this.all = data;
      });
    })
  }


  remove(username){
    this.userService.updateReqest(username, -2).subscribe((resp)=>{
      if (resp['message']=='ok') 
      this.userService.getAllUsers().subscribe((data:User[])=>{
        this.all = data;
      });
    })
  }



}
