"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHome = void 0;
var cart_1 = require("../models/cart");
var product_1 = require("../models/product");
var cart_item_1 = require("../models/cart-item");
var order_1 = require("../models/order");
var user_1 = require("../models/user");
var order_item_1 = require("../models/order-item");
var getHome = function (_req, res, _next) {
    product_1.Product.find({ select: ['title', 'imageUrl', 'price', 'description', 'id'] })
        .then(function (products) {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'SHOP',
            path: '/',
        });
    })
        .catch(console.log);
};
exports.getHome = getHome;
var getProducts = function (_req, res, _next) {
    product_1.Product.find({ select: ['title', 'imageUrl', 'price', 'description', 'id'] })
        .then(function (products) {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'ALL PRODUCTS',
            path: '/products',
        });
    })
        .catch(console.log);
};
var getProduct = function (req, res, _next) {
    var prodID = +req.params.productId;
    product_1.Product.findOne({ id: prodID })
        .then(function (prod) {
        res.render('shop/product-detail', {
            product: prod,
            pageTitle: prod.title,
            path: '/products',
        });
    })
        .catch(console.log);
};
var getCart = function (_req, res, _next) {
    var product = [];
    cart_item_1.CartItem.find({ relations: ['prodid'] })
        .then(function (citem) {
        citem.forEach(function (item) {
            product.push({ id: item.id, title: item.prodid.title, cartItem: { quantity: item.quantity } });
        });
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: product,
        });
    })
        .catch(console.log);
};
var postCart = function (req, res, _next) {
    var prodID = +req.body.productId;
    cart_item_1.CartItem.find({ relations: ['prodid'], where: { prodid: { id: prodID } } })
        .then(function (avaiProd) {
        if (avaiProd.length === 0) {
            product_1.Product.findOne({ where: { id: prodID } })
                .then(function (prod) {
                cart_1.Cart.find({ select: ['id'] })
                    .then(function (cart) {
                    var defQty = 1;
                    var cartitem = new cart_item_1.CartItem();
                    cartitem.quantity = defQty;
                    cartitem.cartid = cart[cart.length - 1];
                    cartitem.prodid = prod;
                    cartitem.save();
                    setTimeout(function () {
                        res.redirect('/cart');
                    }, 500);
                })
                    .catch(console.log);
            })
                .catch(console.log);
        }
        else {
            var updateQty = avaiProd[0].quantity + 1;
            cart_item_1.CartItem.update({ id: avaiProd[0].id }, { quantity: updateQty });
            setTimeout(function () {
                res.redirect('/cart');
            }, 500);
        }
    })
        .catch(console.log);
};
var postDeleteCart = function (req, res, _next) {
    var prodId = +req.body.productId;
    cart_item_1.CartItem.delete({ id: prodId });
    setTimeout(function () {
        res.redirect('/cart');
    }, 300);
};
var getOrders = function (_req, res, _next) {
    var orders = [];
    order_item_1.OrderItem.find({ relations: ['orderid', 'prodid'], order: { id: 'ASC' } })
        .then(function (ord) {
        ord.forEach(function (singleOrd) {
            orders.push({
                id: singleOrd.id,
                products: [{ title: singleOrd.prodTitle, qty: singleOrd.quantity }],
            });
        });
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders,
        });
    })
        .catch(console.log);
};
var postOrder = function (_req, res, _next) {
    user_1.User.find({ select: ['id'] })
        .then(function (userId) {
        var userID = userId[userId.length - 1];
        var order = new order_1.Order();
        order.userid = userID;
        order.save();
        setTimeout(function () {
            order_1.Order.find({ relations: ['userid'], where: { userid: userID }, order: { id: 'DESC' }, take: 1 })
                .then(function (ord) {
                cart_item_1.CartItem.find({ relations: ['cartid', 'prodid'], where: { cartid: userID } })
                    .then(function (cItem) {
                    cItem.forEach(function (oItem) {
                        var orderItem = new order_item_1.OrderItem();
                        orderItem.quantity = oItem.quantity;
                        orderItem.prodTitle = oItem.prodid.title;
                        orderItem.orderid = ord[0];
                        orderItem.prodid = oItem.prodid;
                        orderItem.save();
                        cart_item_1.CartItem.delete({ cartid: userID });
                    });
                    setTimeout(function () {
                        res.redirect('/orders');
                    }, 300);
                })
                    .catch(console.log);
            })
                .catch(console.log);
        }, 700);
    })
        .catch(console.log);
};
exports.default = module.exports = {
    getHome: exports.getHome,
    getProducts: getProducts,
    getCart: getCart,
    getOrders: getOrders,
    postOrder: postOrder,
    getProduct: getProduct,
    postCart: postCart,
    postDeleteCart: postDeleteCart,
};
