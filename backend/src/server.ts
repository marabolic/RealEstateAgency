import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import user from './model/user';
import realestate from './model/realestate';


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/realestate');

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

router.route('/login').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    console.log(username);

    user.findOne({'username':username, 'password':password}, (err, user)=>{
        if (err) console.log(err);
        else {
            res.json(user);
        }
    })
});

router.route('/register').post((req, res)=>{
    console.log("U backendu");
    //console.log(req.body);
    let u = new user(req.body);
    u.save().then(u=>{
        res.status(200).json({'user':'ok'});

    }).catch(err=>{
        res.status(400).json({'user':'no'});
    })
});

router.route('/findmin').post((req, res)=>{
    let min = req.body.minimum;
    realestate.find({'price' : {$gte : min }}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
});

router.route('/findmax').post((req, res)=>{
    let max = req.body.maximum;
    realestate.find({'price' : {$lte : max }}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
});

router.route('/findcity').post((req, res)=>{
    let city = req.body.city;
    realestate.find({'city' : city}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
});

router.route('/findminmax').post((req, res)=>{
    let min = req.body.minimum;
    let max = req.body.maximum;
    realestate.find({$and: [{'price' : {$gte : min} }, {'price' : {$lte : max}}]}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
});

router.route('/findmincity').post((req, res)=>{
    let min = req.body.minimum;
    let city = req.body.city;
    realestate.find({'price' : {$gte : min }, 'city' : city}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
});

router.route('/findmaxcity').post((req, res)=>{
    let city = req.body.city;
    let max = req.body.maximum;
    realestate.find({'price' : {$lte : max }, 'city' : city}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
});

router.route('/findallpars').post((req, res)=>{
    let city = req.body.city;
    let max = req.body.maximum;
    let min = req.body.minimum;
    realestate.find({$and: [{'price' : {$gte : min} }, {'price' : {$lte : max}}], 'city' : city}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
});


router.route('/realestate').get((req, res)=>{
    realestate.find({}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
});


router.route('/promoted').get((req, res)=>{
    realestate.find({'promoted' : 'yes'}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
})

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));