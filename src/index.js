"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var shop_1 = require("./routes/shop");
var admin_1 = require("./routes/admin");
var error_1 = require("./controllers/error");
var user_1 = require("./routes/user");
(0, typeorm_1.createConnection)()
    .then(function (_connection) {
    var app = (0, express_1.default)();
    app.set('view engine', 'ejs');
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.static('dist'));
    app.use('/user', user_1.default.router);
    app.use('/admin', admin_1.default.router);
    app.use(shop_1.default);
    app.use(error_1.default.error404);
    app.listen(3000), console.log('Listening at 3000');
})
    .catch(function (error) { return console.log(error); });
