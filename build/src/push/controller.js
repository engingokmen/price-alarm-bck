"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushMessage = void 0;
const service_1 = require("./service");
const messages_1 = require("./messages");
const pushMessage = (req, res) => {
    var _a;
    const token = (_a = req.body) === null || _a === void 0 ? void 0 : _a.pushToken;
    if (!token) {
        res.status(400).json({ error: "Push token is required" });
    }
    const ticket = (0, service_1.sendNotification)(token, (0, messages_1.getMessage)("testMessage"));
    res.json({ token, ticket });
};
exports.pushMessage = pushMessage;
