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
exports.scheduleNotification = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const dbService_1 = require("../services/dbService");
const scheduleNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, scheduleTime } = req.body;
        if (!message || !scheduleTime) {
            throw new Error('Message and schedule time are required');
        }
        const job = node_schedule_1.default.scheduleJob(new Date(scheduleTime), () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, dbService_1.scheduleNotification)(message);
            console.log(`Notification sent: ${message}`);
        }));
        res.status(200).json({ message: 'Notification scheduled', jobId: job.name });
    }
    catch (error) {
        next(error);
    }
});
exports.scheduleNotification = scheduleNotification;
