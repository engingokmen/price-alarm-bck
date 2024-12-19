import { IMessage } from "../../types";

export const getMessage = (type: Message): IMessage => {
  return messages[type];
};

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

type Message = keyof typeof messages;
