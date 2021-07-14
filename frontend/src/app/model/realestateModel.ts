export class RealEstate{
    _id : string;
    photos : Array<string>;
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
    owner: string;
    sold: string;
    rented: {
        datefrom: Date;
        dateto: Date;
    }[];
    offers: {
        username: string; 
        price: number;
        datefrom: Date;
        dateto: Date;
    }[];
    accepted: number;
}