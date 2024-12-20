import { Expo } from "expo-server-sdk";
import { IMessage } from "../../types";
import { errorMessages, ErrorResponse } from "../utils/error";

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({
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

export const sendNotification = async (
  pushToken: string,
  message: IMessage
) => {
  try {
    // Check that the push token appears to be valid
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new ErrorResponse(errorMessages.INVALID_TOKEN);
    }

    const tokenAddedMessage = { ...message, to: pushToken };

    // Send the message
    let ticket = await expo.sendPushNotificationsAsync([tokenAddedMessage]);
    return ticket;
  } catch (error) {
    console.error(error);
  }
};

export const sendMultipleNotifications = async (messages: IMessage[]) => {
  const tickets = expo.sendPushNotificationsAsync(messages);
  return tickets;
};
