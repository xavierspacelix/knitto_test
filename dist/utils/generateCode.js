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
exports.generateUniqueCode = void 0;
const dbConfig_1 = require("../config/dbConfig");
const generateUniqueCode = (table, column, prefix) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConfig_1.dbQuery)('LOCK TABLES ?? WRITE', [table]);
    try {
        const query = `SELECT MAX(??) as last_code FROM ?? WHERE ?? LIKE ?`;
        const result = yield (0, dbConfig_1.dbQuery)(query, [column, table, column, `${prefix}%`]);
        let nextNumber = 1;
        if (result.length > 0 && result[0].last_code) {
            const lastNumber = parseInt(result[0].last_code.replace(prefix, '')) || 0;
            nextNumber = lastNumber + 1;
        }
        return `${prefix}${nextNumber.toString().padStart(3, '0')}`;
    }
    finally {
        yield (0, dbConfig_1.dbQuery)('UNLOCK TABLES');
    }
});
exports.generateUniqueCode = generateUniqueCode;
