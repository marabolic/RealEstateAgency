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
    }
});

export default mongoose.model('RealEstate', RealEstate, 'realestates');