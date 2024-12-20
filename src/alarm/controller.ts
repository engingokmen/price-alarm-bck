import { NextFunction, Request, Response } from "express";
import { getAlarms, addAlarm, removeAlarm, removeAlarmAll } from "./service";

export const all = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pushToken } = req.body;
    const alarms = await getAlarms(pushToken);
    res.json(alarms);
  } catch (error) {
    next(error);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pushToken, alarm } = req.body;
    const alarmAdded = await addAlarm(pushToken, alarm);
    res.json(alarmAdded);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pushToken, alarm } = req.body;
    const alarmRemoved = await removeAlarm(pushToken, alarm);
    res.json(alarmRemoved);
  } catch (error) {
    next(error);
  }
};

export const removeAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pushToken } = req.body;
    const alarms = await removeAlarmAll(pushToken);
    res.json(alarms);
  } catch (error) {
    next(error);
  }
};
