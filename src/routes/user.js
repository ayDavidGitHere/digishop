"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../models/user");
var cart_1 = require("../models/cart");
var router = express_1.default.Router();
router.get('/:username/:email', function (req, res, _next) {
    var uname = req.params.username;
    var uemail = req.params.email;
    res.send("\n  <h1>User created " + uname + " " + uemail + "</h1>\n  <form  method='POST'>\n  <input type=\"hidden\" value=\"" + uname + "\" name=\"username\">\n  <input type=\"hidden\" value=\"" + uemail + "\" name=\"useremail\">\n  <button type='submit'>lets go</button>\n  </form>\n  ");
});
router.post('/:username/:email', function (req, res, _next) {
    var user = new user_1.User();
    user.username = req.body.username;
    user.email = req.body.useremail;
    user.save();
    var cart = new cart_1.Cart();
    cart.userid = user;
    cart.save();
    res.redirect('/');
});
exports.default = module.exports = { router: router };
