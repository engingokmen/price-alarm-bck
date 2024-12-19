"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = void 0;
const getMessage = (type) => {
    return messages[type];
};
exports.getMessage = getMessage;
const messages = {
    testMessage: {
        to: "",
        sound: "default",
        title: "Test Notification",
        body: "This is a test notification",
    },
    welcome: {
        to: "",
        sound: "default",
        title: "Welcome!",
        body: "Welcome to the app!",
    },
    goodbye: {
        to: "",
        sound: "default",
        title: "Goodbye!",
        body: "Goodbye from the app!",
    },
};
