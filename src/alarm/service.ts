import { IAlarm } from "../../types";
import { AlarmModel } from "./model";

export const addAlarm = async (alarm: IAlarm) => {
  const newAlarm = new AlarmModel(alarm);
  return newAlarm.save();
};
