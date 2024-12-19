"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const alarmSchema = new mongoose_1.default.Schema({
    price: Number,
});
exports.AlarmModel = mongoose_1.default.model("Alarm", alarmSchema);
