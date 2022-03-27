"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../models/product");
var user_1 = require("../models/user");
var getAddProduct = function (_req, res, _next) {
    res.render('admin/edit-product', {
        pageTitle: 'ADD PRODUCTS',
        path: '/admin/add-product',
        editing: false,
    });
};
var postAddProduct = function (req, res, _next) {
    user_1.User.find({ select: ['id'] })
        .then(function (userID) {
        var product = new product_1.Product();
        product.title = req.body.title;
        product.imageUrl = req.body.imageUrl;
        product.price = req.body.price;
        product.description = req.body.description;
        product.userid = userID[userID.length - 1];
        product_1.Product.save(product);
        setTimeout(function () {
            res.redirect('/');
        }, 500);
    })
        .catch(console.log);
};
var getProducts = function (_req, res, _next) {
    product_1.Product.find({ where: { userid: 1 } })
        .then(function (products) {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'ADMIN PRODUCTS',
            path: '/admin/products',
        });
    })
        .catch(console.log);
};
var getEditProduct = function (req, res, _next) {
    var prodId = +req.params.productId;
    var edit = req.query.edit;
    if (edit === 'false')
        res.redirect('/');
    product_1.Product.findOne({ id: +prodId })
        .then(function (prod) {
        if (!prod)
            res.redirect('/');
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: edit,
            product: prod,
        });
    })
        .catch(console.log);
};
var postEditProduct = function (req, res, _next) {
    var prodId = +req.body.productId;
    if (typeof prodId === 'number') {
        product_1.Product.update({ id: prodId }, {
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            description: req.body.description,
        });
        setTimeout(function () {
            res.redirect('/admin/products');
        }, 500);
    }
};
var postDeleteProduct = function (req, res, _next) {
    var prodId = +req.body.productId;
    if (typeof prodId === 'number') {
        product_1.Product.delete({ id: prodId });
        setTimeout(function () {
            res.redirect('/admin/products');
        }, 500);
    }
};
exports.default = module.exports = {
    getAddProduct: getAddProduct,
    getProducts: getProducts,
    postAddProduct: postAddProduct,
    getEditProduct: getEditProduct,
    postEditProduct: postEditProduct,
    postDeleteProduct: postDeleteProduct,
};
