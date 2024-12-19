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
exports.sendNotification = void 0;
const expo_server_sdk_1 = require("expo-server-sdk");
// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new expo_server_sdk_1.Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
    /*
     * @deprecated
     * The optional useFcmV1 parameter defaults to true, as FCMv1 is now the default for the Expo push service.
     *
     * If using FCMv1, the useFcmV1 parameter may be omitted.
     * Set this to false to have Expo send to the legacy endpoint.
     *
     * See https://firebase.google.com/support/faq#deprecated-api-shutdown
     * for important information on the legacy endpoint shutdown.
     *
     * Once the legacy service is fully shut down, the parameter will be removed in a future PR.
     */
    useFcmV1: true,
});
const sendNotification = (pushToken, message) => __awaiter(void 0, void 0, void 0, function* () {
    // Check that the push token appears to be valid
    if (!expo_server_sdk_1.Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        return;
    }
    const tokenAddedMessage = Object.assign(Object.assign({}, message), { to: pushToken });
    // Send the message
    try {
        let ticket = yield expo.sendPushNotificationsAsync([tokenAddedMessage]);
        return ticket;
    }
    catch (error) {
        console.error(error);
    }
});
exports.sendNotification = sendNotification;
