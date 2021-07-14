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

    

    user.findOne({'username':username, 'password':password}, (err, user)=>{
        if (err) console.log(err);
        else {
            res.json(user);
        }
    })
});

router.route('/register').post((req, res)=>{
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
});

router.route('/regrequest').get((req, res)=>{
    user.find({'accepted' : '0'}, (err, user)=>{
        if (err) console.log(err);
        else res.json(user);
    })
});




router.route('/realestateRequest').get((req, res)=>{
    realestate.find({'accepted' : 1}, (err, re)=>{
        if (err) console.log(err);
        else res.json(re);
    })
});

router.route('/allusers').get((req, res)=>{
    user.find({},(err, re)=>{
        if (err) console.log(err);
        else res.json(re);
    })
});

router.route('/updateUserRequest').post((req, res)=>{
    let username = req.body.username;
    let status = req.body.accepted;
    user.findOne({'username': username}, (err, user)=>{
        if (err) console.log(err);
        else{
            if (user){
                
                user.collection.updateOne({'username': username}, {$set: {'accepted' : status}});
                res.json({"message" : "ok"});
            }
            else{
                res.json({"message" : "user does not exist"});
            }
        }
    })
});

router.route('/updateRealestateRequest').post((req, res)=>{
    let id = req.body.id;
    realestate.findById(id, (err, re : any)=>{
        if (err) console.log(err);
        else{
            if (re){
                console.log(re);
                re.accepted = 1;
                re.save().then(()=>{
                    res.json({"message" : "ok"});
                }).catch((err:any)=>{
                    res.json({"message" : "database error"}); 
                })
                //realestate.collection.updateOne({'username': username}, {$set: {'accepted' : status}});
               
            }
            else{
                res.json({"message" : "user does not exist"});
            }
        }
    })
});

router.route('/changePassword').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    user.findOne({'username': username}, (err, user)=>{
        if (err) console.log(err);
        else{
            if (user){
                
                user.collection.updateOne({'username': username}, {$set: {'password' : password}});
                res.json({"message" : "ok"});
            }
            else{
                res.json({"message" : "user does not exist"});
            }
        }
    })
});



router.route('/rent').post((req, res)=>{
    let id = req.body.id;
    let datefrom = req.body.datefrom;
    let dateto = req.body.dateto;
    user.findOne({'_id': id}, (err, user)=>{
        if (err) console.log(err);
        else{
            if (user){
                user.collection.updateOne({'_id': id}, {$push: {'sold' : "yes"}});
                res.json({"message" : "ok"});
            }
            else{
                res.json({"message" : "user does not exist"});
            }
        }
    })
});

router.route('/buy').post((req, res)=>{
    let id = req.body.id;
    user.findOne({'_id': id}, (err, user)=>{
        if (err) console.log(err);
        else{
            if (user){
                user.collection.updateOne({'_id': id}, {$set: {'sold' : "yes"}});
                res.json({"message" : "ok"});
            }
            else{
                res.json({"message" : "user does not exist"});
            }
        }
    })
});

router.route('/giveOfferRent').post((req, res)=>{
    let id = req.body.id;
    let price = req.body.price;
    let username = req.body.username;
    let datefrom = req.body.datefrom;
    let dateto = req.body.dateto;

    realestate.findById(id, (err, u:any)=>{
        if (err) console.log(err);
        else{
            if (u){
                u.offers.push({'username': username, 'price': price, 'datefrom' :datefrom, 'dateto': dateto});
                console.log(u);
                u.save().then(()=>{
                    res.json({"message" : "ok"});
                }).catch((er:any)=>{
                    res.json({"message" : "error"});
                })
            }
            else{
                res.json({"message" : "user does not exist"});
            }
        }
    })

})

router.route('/acceptOffer').post((req, res)=>{
    let id = req.body.id;
    let x = req.body.x;
    console.log(1);
    realestate.findById(id, (err, u:any)=>{
        if (err) console.log(err);
        else{
            console.log(2);
            if (u){
                u.rented.push({'datefrom' :u.offers[x].datefrom, 'dateto': u.offers[x].dateto});
                u.offers.splice(x);
                console.log(u);
                u.save().then(()=>{
                    res.json({"message" : "ok"});
                }).catch((er:any)=>{
                    res.json({"message" : "error"});
                })
            }
            else{
                console.log(3);
                res.json({"message" : "user does not exist"});
            }
        }
    })

})

router.route('/giveOfferBuy').post((req, res)=>{
    let id = req.body.id;
    let price = req.body.price;
    let username = req.body.username;

    realestate.findById(id, (err, u:any)=>{
        if (err) console.log(err);
        else{
            if (u){
                //realestate.collection.updateOne({'_id': id}, 
                //{$push: {'offers' : {'username': username, 
                //                    'price': price}}});

                u.offers.push({'username': username, 'price': price, 'datefrom' :new Date(), 'dateto': new Date()});
                console.log(u);
                u.save().then(()=>{
                    res.json({"message" : "ok"});
                }).catch((er:any)=>{
                    res.json({"message" : "error"});
                })
               
            }
            else{
                res.json({"message" : "user does not exist"});
            }
        }
    })

})


router.route('/newRe').post((req, res)=>{
    //console.log(req.body);
    let u = new realestate(req.body);
    u.save().then(u=>{
        res.status(200).json({'realestate':'ok'});

    }).catch(err=>{
        res.status(400).json({'realestate':'no'});
    })
});

router.route("/getRealEstateByUsername").post((req, res)=>{
    let username = req.body.username;
    realestate.find({'owner': username}, (err, re)=>{
        if (err) console.log(err);
        else {
            if (re)
                res.json(re);
            else console.log("user not found");
        }
    })
});

router.route("/setPromoted").post((req, res)=>{
    let id = req.body.id;
    let promoted = req.body.promoted;
    realestate.findById(id, (err, re : any)=>{
        if (err) console.log(err);
        else{
            if (re){
                re.promoted = promoted;
                re.save().then(()=>{
                    res.json({"message" : "ok"});
                }).catch((err:any)=>{
                    res.json({"message" : "database error"}); 
                })
                //realestate.collection.updateOne({'username': username}, {$set: {'accepted' : status}});
               
            }
            else{
                res.json({"message" : "user does not exist"});
            }
        }
    })
});

router.route("/getAllRealestates").get((req, res)=>{
    realestate.find({},(err, re)=>{
        if (err) console.log(err);
        else res.json(re);
    })
});

router.route('/editUser').post((req, res)=>{
    let username = req.body.username;
    let u = req.body.user;

    user.findOne({'username':username}, (err, usr:any)=>{
        if (err) console.log(err);
        else {
            usr.firstname = u.firstname;
            usr.lastname = u.lastname;
            usr.city = u.city;
            usr.country = u.country;
            usr.email = u.email;
            usr.avatar = u.avatar;

            usr.save().then(()=>{
                res.json({"message" : "ok"});
            }).catch((er:any)=>{
                res.json({"message" : "not ok"});
            })
        }
    })
});



router.route("/getUser").post((req, res)=>{
    let username = req.body.username;

    user.findOne({'username':username}, (err, usr)=>{
        if (err) console.log(err);
        else {
            res.json(usr);
        }
    })
});


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));