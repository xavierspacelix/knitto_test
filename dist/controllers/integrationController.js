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
exports.syncExternalProducts = void 0;
const externalApiService_1 = require("../services/externalApiService");
const dbService_1 = require("../services/dbService");
const syncExternalProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, externalApiService_1.fetchExternalProducts)();
        for (const product of products) {
            yield (0, dbService_1.syncExternalProduct)(product.name, product.price);
        }
        res.status(200).json({ message: 'Sync completed', total: products.length });
    }
    catch (error) {
        next(error);
    }
});
exports.syncExternalProducts = syncExternalProducts;
