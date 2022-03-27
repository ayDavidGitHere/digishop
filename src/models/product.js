"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var cart_item_1 = require("./cart-item");
var order_item_1 = require("./order-item");
var user_1 = require("./user");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Product.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { nullable: false, length: 100 })
    ], Product.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)('numeric', { nullable: false })
    ], Product.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: false })
    ], Product.prototype, "imageUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { nullable: false, length: 255 })
    ], Product.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return cart_item_1.CartItem; }, function (cItem) { return cItem.prodid; })
    ], Product.prototype, "cItem", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return order_item_1.OrderItem; }, function (oItem) { return oItem.prodid; })
    ], Product.prototype, "oItem", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.prodId; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ referencedColumnName: 'id', name: 'userid' })
    ], Product.prototype, "userid", void 0);
    Product = __decorate([
        (0, typeorm_1.Entity)()
    ], Product);
    return Product;
}(typeorm_1.BaseEntity));
exports.Product = Product;
