import { IMessage } from "../../types";
import { price } from "../listen-price/service";
import { sendNotification } from "../push/service";
import { getAllUsers } from "../user/service";
import { jobs } from "./controller";

let intervalId: any = null;
export const runJob = async () => {
  if (jobs.runPriceCheck) {
    intervalId = setInterval(() => {
      sendAlarmNotifications(price);
    }, 1000 * 5);
  } else {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }
};

const sendAlarmNotifications = async (price: number) => {
  try {
    await ringAlarmsAllUsers(price);

    return price;
  } catch (error) {
    throw error;
  }
};

const ringAlarmsAllUsers = async (price: number) => {
  try {
    const users = await getAllUsers();

    for await (const user of users) {
      for await (const alarm of user.alarms) {
        if (
          (!alarm.isDone && alarm.type === "above" && price >= alarm.price) ||
          (!alarm.isDone && alarm.type === "below" && price <= alarm.price)
        ) {
          const pushToken = user.pushToken;
          const message: IMessage = {
            to: pushToken,
            sound: "default",
            title: alarm.price.toString(),
            body: `Price has reached the alarm price of ${alarm.price}`,
          };

          const ticket = await sendNotification(pushToken, message);
          if (ticket?.[0].status === "ok") {
            alarm.isDone = true;
          }
        }
      }
      user.save();
    }
  } catch (error) {
    throw error;
  }
};
