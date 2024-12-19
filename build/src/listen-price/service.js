"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.price = void 0;
exports.price = 0;
const connectWebSocket = () => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.p) {
            exports.price = parseFloat(data.p);
        }
    };
    ws.onerror = (error) => {
        const errorEvent = error;
        console.error("WebSocket error:", errorEvent.message);
    };
    ws.onclose = () => {
        console.log("WebSocket disconnected");
    };
};
connectWebSocket();
