"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./model/user"));
const realestate_1 = __importDefault(require("./model/realestate"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/realestate');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/register').post((req, res) => {
    //console.log(req.body);
    let u = new user_1.default(req.body);
    u.save().then(u => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/findmin').post((req, res) => {
    let min = req.body.minimum;
    realestate_1.default.find({ 'price': { $gte: min } }, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/findmax').post((req, res) => {
    let max = req.body.maximum;
    realestate_1.default.find({ 'price': { $lte: max } }, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/findcity').post((req, res) => {
    let city = req.body.city;
    realestate_1.default.find({ 'city': city }, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/findminmax').post((req, res) => {
    let min = req.body.minimum;
    let max = req.body.maximum;
    realestate_1.default.find({ $and: [{ 'price': { $gte: min } }, { 'price': { $lte: max } }] }, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/findmincity').post((req, res) => {
    let min = req.body.minimum;
    let city = req.body.city;
    realestate_1.default.find({ 'price': { $gte: min }, 'city': city }, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/findmaxcity').post((req, res) => {
    let city = req.body.city;
    let max = req.body.maximum;
    realestate_1.default.find({ 'price': { $lte: max }, 'city': city }, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/findallpars').post((req, res) => {
    let city = req.body.city;
    let max = req.body.maximum;
    let min = req.body.minimum;
    realestate_1.default.find({ $and: [{ 'price': { $gte: min } }, { 'price': { $lte: max } }], 'city': city }, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/realestate').get((req, res) => {
    realestate_1.default.find({}, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/promoted').get((req, res) => {
    realestate_1.default.find({ 'promoted': 'yes' }, (err, realestate) => {
        if (err)
            console.log(err);
        else
            res.json(realestate);
    });
});
router.route('/regrequest').get((req, res) => {
    user_1.default.find({ 'accepted': '0' }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/realestateRequest').get((req, res) => {
    realestate_1.default.find({ 'accepted': 1 }, (err, re) => {
        if (err)
            console.log(err);
        else
            res.json(re);
    });
});
router.route('/allusers').get((req, res) => {
    user_1.default.find({}, (err, re) => {
        if (err)
            console.log(err);
        else
            res.json(re);
    });
});
router.route('/updateUserRequest').post((req, res) => {
    let username = req.body.username;
    let status = req.body.accepted;
    user_1.default.findOne({ 'username': username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            if (user) {
                user.collection.updateOne({ 'username': username }, { $set: { 'accepted': status } });
                res.json({ "message": "ok" });
            }
            else {
                res.json({ "message": "user does not exist" });
            }
        }
    });
});
router.route('/updateRealestateRequest').post((req, res) => {
    let id = req.body.id;
    realestate_1.default.findById(id, (err, re) => {
        if (err)
            console.log(err);
        else {
            if (re) {
                console.log(re);
                re.accepted = 1;
                re.save().then(() => {
                    res.json({ "message": "ok" });
                }).catch((err) => {
                    res.json({ "message": "database error" });
                });
                //realestate.collection.updateOne({'username': username}, {$set: {'accepted' : status}});
            }
            else {
                res.json({ "message": "user does not exist" });
            }
        }
    });
});
router.route('/changePassword').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            if (user) {
                user.collection.updateOne({ 'username': username }, { $set: { 'password': password } });
                res.json({ "message": "ok" });
            }
            else {
                res.json({ "message": "user does not exist" });
            }
        }
    });
});
router.route('/rent').post((req, res) => {
    let id = req.body.id;
    let datefrom = req.body.datefrom;
    let dateto = req.body.dateto;
    user_1.default.findOne({ '_id': id }, (err, user) => {
        if (err)
            console.log(err);
        else {
            if (user) {
                user.collection.updateOne({ '_id': id }, { $push: { 'sold': "yes" } });
                res.json({ "message": "ok" });
            }
            else {
                res.json({ "message": "user does not exist" });
            }
        }
    });
});
router.route('/buy').post((req, res) => {
    let id = req.body.id;
    user_1.default.findOne({ '_id': id }, (err, user) => {
        if (err)
            console.log(err);
        else {
            if (user) {
                user.collection.updateOne({ '_id': id }, { $set: { 'sold': "yes" } });
                res.json({ "message": "ok" });
            }
            else {
                res.json({ "message": "user does not exist" });
            }
        }
    });
});
router.route('/giveOfferRent').post((req, res) => {
    let id = req.body.id;
    let price = req.body.price;
    let username = req.body.username;
    let datefrom = req.body.datefrom;
    let dateto = req.body.dateto;
    user_1.default.findOne({ '_id': id }, (err, user) => {
        if (err)
            console.log(err);
        else {
            if (user) {
                user.collection.updateOne({ '_id': id }, { $push: { 'offers': { 'username': username,
                            'price': price,
                            'datefrom': datefrom,
                            'dateto': dateto } } });
                res.json({ "message": "ok" });
            }
            else {
                res.json({ "message": "user does not exist" });
            }
        }
    });
});
router.route('/giveOfferBuy').post((req, res) => {
    let id = req.body.id;
    let price = req.body.price;
    let username = req.body.username;
    realestate_1.default.findById(id, (err, u) => {
        if (err)
            console.log(err);
        else {
            if (u) {
                //realestate.collection.updateOne({'_id': id}, 
                //{$push: {'offers' : {'username': username, 
                //                    'price': price}}});
                u.offers.push({ 'username': username, 'price': price, 'datefrom': "", 'dateto': "" });
                console.log(u);
                u.save().then(() => {
                    res.json({ "message": "ok" });
                }).catch((er) => {
                    res.json({ "message": "error" });
                });
            }
            else {
                res.json({ "message": "user does not exist" });
            }
        }
    });
});
router.route('/newRe').post((req, res) => {
    //console.log(req.body);
    let u = new realestate_1.default(req.body);
    u.save().then(u => {
        res.status(200).json({ 'realestate': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'realestate': 'no' });
    });
});
router.route("/getRealEstateByUsername").post((req, res) => {
    let username = req.body.username;
    realestate_1.default.find({ 'owner': username }, (err, re) => {
        if (err)
            console.log(err);
        else {
            if (re)
                res.json(re);
            else
                console.log("user not found");
        }
    });
});
router.route("/setPromoted").post((req, res) => {
    let id = req.body.id;
    let promoted = req.body.promoted;
    realestate_1.default.findById(id, (err, re) => {
        if (err)
            console.log(err);
        else {
            if (re) {
                re.promoted = promoted;
                re.save().then(() => {
                    res.json({ "message": "ok" });
                }).catch((err) => {
                    res.json({ "message": "database error" });
                });
                //realestate.collection.updateOne({'username': username}, {$set: {'accepted' : status}});
            }
            else {
                res.json({ "message": "user does not exist" });
            }
        }
    });
});
router.route("/getAllRealestates").get((req, res) => {
    realestate_1.default.find({}, (err, re) => {
        if (err)
            console.log(err);
        else
            res.json(re);
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map