"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const dbConfig_1 = require("../config/dbConfig");
const dbService_1 = require("../services/dbService");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id, products } = req.body;
        if (!customer_id || !products.length) {
            throw new Error('Customer ID and products are required');
        }
        yield (0, dbConfig_1.dbQuery)('START TRANSACTION');
        const orderId = yield (0, dbService_1.createOrder)(customer_id);
        for (const product of products) {
            yield (0, dbService_1.createOrderDetail)(orderId, product.product_id, product.quantity);
            yield (0, dbService_1.updateProductStock)(product.product_id, product.quantity);
        }
        yield (0, dbConfig_1.dbQuery)('COMMIT');
        res.status(201).json({ message: 'Order created', orderId });
    }
    catch (error) {
        yield (0, dbConfig_1.dbQuery)('ROLLBACK');
        next(error);
    }
});
exports.createOrder = createOrder;
