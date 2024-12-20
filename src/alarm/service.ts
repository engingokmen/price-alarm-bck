import { IAlarm } from "../../types";
import { getUserByPushToken } from "../user/service";
import { errorMessages, ErrorResponse } from "../utils/error";

export const getAlarms = async (pushToken: string) => {
  try {
    const user = await getUserByPushToken(pushToken);

    return user.alarms;
  } catch (error) {
    throw error;
  }
};

export const addAlarm = async (pushToken: string, alarm: IAlarm) => {
  try {
    const user = await getUserByPushToken(pushToken);

    const alarmAdded = user.alarms.create(alarm);

    if (!alarmAdded) {
      throw new ErrorResponse(errorMessages.ALARM_NOT_ADDED);
    }

    user.alarms.push(alarm);
    user.save();

    return alarmAdded;
  } catch (error) {
    throw error;
  }
};

export const removeAlarm = async (pushToken: string, alarm: IAlarm) => {
  try {
    const user = await getUserByPushToken(pushToken);

    const alarmFound = user.alarms.id(alarm);

    if (!alarmFound) {
      throw new ErrorResponse(errorMessages.ALARM_NOT_FOUND);
    }

    const alarmRemoved = await alarmFound?.deleteOne();

    user.save();

    return alarmRemoved;
  } catch (error) {
    throw error;
  }
};

export const removeAlarmAll = async (pushToken: string) => {
  try {
    const user = await getUserByPushToken(pushToken);

    user.alarms.splice(0, user.alarms.length);

    user.save();

    return user.alarms;
  } catch (error) {
    throw error;
  }
};
