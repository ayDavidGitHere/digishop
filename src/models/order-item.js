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
exports.OrderItem = void 0;
var typeorm_1 = require("typeorm");
var order_1 = require("./order");
var product_1 = require("./product");
var OrderItem = /** @class */ (function (_super) {
    __extends(OrderItem, _super);
    function OrderItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], OrderItem.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('smallint', { nullable: false })
    ], OrderItem.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { nullable: false, length: 100 })
    ], OrderItem.prototype, "prodTitle", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }, function (order) { return order.oItem; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ name: 'orderid' })
    ], OrderItem.prototype, "orderid", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_1.Product; }, function (prod) { return prod.cItem; }, { onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ name: 'productid' })
    ], OrderItem.prototype, "prodid", void 0);
    OrderItem = __decorate([
        (0, typeorm_1.Entity)()
    ], OrderItem);
    return OrderItem;
}(typeorm_1.BaseEntity));
exports.OrderItem = OrderItem;
