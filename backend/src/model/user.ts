import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    city:{
        type: String
    },
    country:{
        type: String
    },
    avatar:{
        type: String
    },
    accepted:{
        type: String
    },
    type:{
        type: Number
    }
});

export default mongoose.model('User', User, 'users');