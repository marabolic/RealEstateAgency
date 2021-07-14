import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RealEstate = new Schema({
    photos:{
        type: Array
    },
    region: {
        type: String
    },
    city: {
        type: String
    },
    price: {
        type: Number
    },
    house_flat:{
        type: String
    },
    rooms:{
        type: Number
    },
    area:{
        type: Number
    },
    sell_rent:{
        type: String,
    },
    promoted:{
        type: String
    },
    description : {
        type: String
    },
    address: {
        type: String
    },
    floor: {
        type: Number
    },
    total_floors:{
        type: Number
    },
    furnished: {
        type: String
    },
    owner: {
        type: String
    },
    sold:{
        type: String
    },
    rented:{
        type: [{
            datefrom: Date,
            dateto: Date
        }]
    },
    offers: {
        type: [{
            username: String,
            price: Number,
            datefrom: Date,
            dateto: Date,
            isRent: Boolean
        }]
    },
    accepted:{
        type: Number
    }
});

export default mongoose.model('RealEstate', RealEstate, 'realestates');