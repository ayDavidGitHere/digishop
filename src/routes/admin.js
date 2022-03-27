"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var admin_1 = require("../controllers/admin");
router.get('/add-product', admin_1.default.getAddProduct);
router.get('/products', admin_1.default.getProducts);
router.post('/add-product', admin_1.default.postAddProduct);
router.get('/edit-product/:productId', admin_1.default.getEditProduct);
router.post('/edit-product', admin_1.default.postEditProduct);
router.post('/delete-product', admin_1.default.postDeleteProduct);
exports.default = module.exports = {
    router: router,
};
