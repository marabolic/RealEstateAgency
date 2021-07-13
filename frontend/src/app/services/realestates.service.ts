import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealestatesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';
  
  searchMin(min){
    const data = {
      minimum : min
    }

    console.log("U real service min");
    console.log(data);
    
    return this.http.post(`${this.uri}/findmin`, data);
  }

  searchMax(max){
    const data = {
      maximum : max
    }

    console.log("U users service");
    console.log(data);
    
    return this.http.post(`${this.uri}/findmax`, data);
  }
  searchCity(city){
    const data = {
      city : city
    }

    console.log("U users service");
    console.log(data);
    
    return this.http.post(`${this.uri}/findcity`, data);
  }

  searchMaxCity(max, city){
    const data = {
      maximum: max,
      city: city
    }

    console.log("U users service");
    console.log(data);
    
    return this.http.post(`${this.uri}/findmaxcity`, data);
  }

  searchMinCity(min, city){
    const data = {
      minimum : min,
      city: city
    }

    console.log("U users service");
    console.log(data);
    
    return this.http.post(`${this.uri}/findmincity`, data);
  }

  searchMinMax(min, max){
    const data = {
      minimum : min,
      maximum: max
    }

    console.log("U users service");
    console.log(data);
    
    return this.http.post(`${this.uri}/findminmax`, data);
  }

  searchAll(min, max, city){
    const data = {
      minimum : min,
      maximum: max,
      city: city
    }

    console.log("U users service");
    console.log(data);
    
    return this.http.post(`${this.uri}/findallpars`, data);
  }

  getAllPromoted(){
    return this.http.get(`${this.uri}/promoted`);
  }

  buyRealEstate(id){
    const data = {
      id : id
    }
    return this.http.get(`${this.uri}/buy`);
  }

  rentRealEstate(id){

    const data = {
      id : id
    }
    return this.http.get(`${this.uri}/rent`);
  }

  addNewRealEstate(region, city, price, house_flat, rooms, area, sell_rent, promoted, description, 
              address, floor, total_floors, furnished, owner, sold, rented, accepted){

    const data = {
      region : region,
      city : city,
      price : price,
      house_flat: house_flat,
      rooms: rooms,
      area: area,
      sell_rent:sell_rent,
      promoted:promoted,
      description: description,
      address:address,
      floor:floor,
      total_floors:total_floors,
      furnished:furnished,
      owner: owner,
      sold:sold,
      rented:rented,
      accepted: accepted
    }


    return this.http.post(`${this.uri}/newRe`, data);
  }

  getAllRequests(){
    return this.http.get(`${this.uri}/realestateRequest`);
  }


  acceptRealEstate(id){
    const data = {
      id : id
    }
    return this.http.post(`${this.uri}/updateRealestateRequest`, data);
  }

}
