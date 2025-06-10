"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/login/email', authController_1.loginWithEmail);
router.post('/login/google', authController_1.loginWithGoogle);
exports.default = router;
