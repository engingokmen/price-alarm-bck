"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = require("./listen-price/service");
const controller_1 = require("./push/controller");
const controller_2 = require("./alarm/controller");
const startDB_1 = require("./startDB");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send(`price: ${service_1.price}`);
});
app.use(express_1.default.json());
app.post("/push", controller_1.pushMessage);
app.post("/add", controller_2.add);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
(0, startDB_1.startDB)().catch((err) => console.log(err));
