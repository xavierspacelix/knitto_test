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
exports.scheduleNotification = exports.getTopCustomers = exports.updateProductStock = exports.createOrderDetail = exports.createOrder = exports.syncExternalProduct = exports.createProduct = exports.createUser = exports.getUserByEmail = void 0;
const dbConfig_1 = require("../config/dbConfig");
const getUserByEmail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const query = password
        ? `SELECT * FROM users WHERE email = ? AND password = ?`
        : `SELECT * FROM users WHERE email = ?`;
    const params = password ? [email, password] : [email];
    return yield (0, dbConfig_1.dbQuery)(query, params);
});
exports.getUserByEmail = getUserByEmail;
const createUser = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO users (email, name) VALUES (?, ?)`;
    return yield (0, dbConfig_1.dbQuery)(query, [email, name]);
});
exports.createUser = createUser;
const createProduct = (product_code, data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO products (product_code, nama_produk, harga_jual) VALUES (?, ?, ?)`;
    return yield (0, dbConfig_1.dbQuery)(query, [product_code, data.nama_produk, data.harga_jual]);
});
exports.createProduct = createProduct;
const syncExternalProduct = (name, price) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO products (nama_produk, harga_jual) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE harga_jual = ?`;
    return yield (0, dbConfig_1.dbQuery)(query, [name, price, price]);
});
exports.syncExternalProduct = syncExternalProduct;
const createOrder = (customer_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO orders (customer_id, order_date) VALUES (?, NOW())`;
    return yield (0, dbConfig_1.dbQuery)(query, [customer_id]);
});
exports.createOrder = createOrder;
const createOrderDetail = (order_id, product_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO order_details (order_id, product_id, quantity) VALUES (?, ?, ?)`;
    return yield (0, dbConfig_1.dbQuery)(query, [order_id, product_id, quantity]);
});
exports.createOrderDetail = createOrderDetail;
const updateProductStock = (product_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `UPDATE products SET stock = stock - ? WHERE id = ?`;
    return yield (0, dbConfig_1.dbQuery)(query, [quantity, product_id]);
});
exports.updateProductStock = updateProductStock;
const getTopCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT 
      c.customer_id, 
      c.customer_name, 
      SUM(od.quantity * p.harga_jual) AS total_pembelian
    FROM customers c
    INNER JOIN orders o ON c.customer_id = o.customer_id
    INNER JOIN order_details od ON o.order_id = od.order_id
    INNER JOIN products p ON od.product_id = p.id
    GROUP BY c.customer_id, c.customer_name
    ORDER BY total_pembelian DESC
    LIMIT 10
  `;
    return yield (0, dbConfig_1.dbQuery)(query, []);
});
exports.getTopCustomers = getTopCustomers;
const scheduleNotification = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO notifications (message, status) VALUES (?, ?)`;
    return yield (0, dbConfig_1.dbQuery)(query, [message, 'SENT']);
});
exports.scheduleNotification = scheduleNotification;
