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
exports.createProduct = void 0;
const dbService_1 = require("../services/dbService");
const generateCode_1 = require("../utils/generateCode");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nama_produk, harga_jual } = req.body;
        if (!nama_produk || !harga_jual) {
            throw new Error('Nama produk dan harga jual wajib diisi');
        }
        const uniqueCode = yield (0, generateCode_1.generateUniqueCode)('products', 'product_code', 'PROD-');
        yield (0, dbService_1.createProduct)(uniqueCode, { nama_produk, harga_jual });
        res.status(201).json({ message: 'Produk berhasil disimpan', product_code: uniqueCode });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
