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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithGoogle = exports.loginWithEmail = void 0;
const dbService_1 = require("../services/dbService");
const jwtUtil_1 = require("../utils/jwtUtil");
const axios_1 = __importDefault(require("axios"));
const loginWithEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = yield (0, dbService_1.getUserByEmail)(email, password);
        if (!user.length) {
            throw new Error('Invalid credentials');
        }
        const token = (0, jwtUtil_1.generateToken)({ userId: user[0].id, email: user[0].email });
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginWithEmail = loginWithEmail;
const loginWithGoogle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { googleToken } = req.body;
        if (!googleToken) {
            throw new Error('Google token is required');
        }
        const response = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`);
        const googleUser = response.data;
        let user = yield (0, dbService_1.getUserByEmail)(googleUser.email);
        if (!user.length) {
            yield (0, dbService_1.createUser)(googleUser.email, googleUser.name);
            user = yield (0, dbService_1.getUserByEmail)(googleUser.email);
        }
        const token = (0, jwtUtil_1.generateToken)({ userId: user[0].id, email: user[0].email });
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginWithGoogle = loginWithGoogle;
