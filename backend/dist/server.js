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
    console.log(username);
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/register').post((req, res) => {
    console.log("U backendu");
    //console.log(req.body);
    let u = new user_1.default(req.body);
    u.save().then(u => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
/*router.route('/realestate').get((req, res)=>{
    realestate.find({}, (err, realestate)=>{
        if (err) console.log(err);
        else res.json(realestate);
    })
})*/
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map