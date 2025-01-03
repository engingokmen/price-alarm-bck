import { MAX_ALLOWED_ALARMS_PER_USER } from "../settings";
import { IAlarm } from "../../types";
import { createUser, getUserByPushToken } from "../user/service";
import { errorMessages, ErrorResponse } from "../utils/error";

export const getAlarms = async (pushToken: string) => {
  try {
    const user = await getUserByPushToken(pushToken);

    if (!user) {
      throw new ErrorResponse(errorMessages.USER_NOT_FOUND);
    }

    return user.alarms;
  } catch (error) {
    throw error;
  }
};

export const addAlarm = async (pushToken: string, alarm: IAlarm) => {
  try {
    let user = await getUserByPushToken(pushToken);

    if (!user) {
      user = await createUser(pushToken);
    }

    const numberOfAlarms = user.alarms.length;
    if (numberOfAlarms > MAX_ALLOWED_ALARMS_PER_USER) {
      throw new ErrorResponse(errorMessages.ALARM_LIMIT_EXCEEDED);
    }

    const alarmAdded = user.alarms.create(alarm);

    if (!alarmAdded) {
      throw new ErrorResponse(errorMessages.ALARM_NOT_ADDED);
    }

    user.alarms.push(alarm);
    user.save();

    return user.alarms;
  } catch (error) {
    throw error;
  }
};

export const updateAlarm = async (pushToken: string, alarm: IAlarm) => {
  try {
    const user = await getUserByPushToken(pushToken);

    if (!user) {
      throw new ErrorResponse(errorMessages.USER_NOT_FOUND);
    }

    const alarmFound = user.alarms.id(alarm);

    if (!alarmFound) {
      throw new ErrorResponse(errorMessages.ALARM_NOT_FOUND);
    }

    alarmFound.set(alarm);

    user.save();

    return user.alarms;
  } catch (error) {
    throw error;
  }
};

export const removeAlarm = async (pushToken: string, id: string) => {
  try {
    const user = await getUserByPushToken(pushToken);

    if (!user) {
      throw new ErrorResponse(errorMessages.USER_NOT_FOUND);
    }

    const alarmFound = user.alarms.id(id);

    if (!alarmFound) {
      throw new ErrorResponse(errorMessages.ALARM_NOT_FOUND);
    }

    await alarmFound?.deleteOne();

    user.save();

    return user.alarms;
  } catch (error) {
    throw error;
  }
};

export const removeAlarmAll = async (pushToken: string) => {
  try {
    const user = await getUserByPushToken(pushToken);

    if (!user) {
      throw new ErrorResponse(errorMessages.USER_NOT_FOUND);
    }

    user.alarms.splice(0, user.alarms.length);

    user.save();

    return user.alarms;
  } catch (error) {
    throw error;
  }
};
