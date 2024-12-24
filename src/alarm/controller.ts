import { NextFunction, Request, Response } from "express";
import {
  getAlarms,
  addAlarm,
  removeAlarm,
  removeAlarmAll,
  updateAlarm,
} from "./service";

export const all = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pushToken } = req.query;
    const alarms = await getAlarms(String(pushToken));
    res.json(alarms);
  } catch (error) {
    next(error);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pushToken, alarm } = req.body;
    const alarms = await addAlarm(pushToken, alarm);
    res.json(alarms);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pushToken, alarm } = req.body;
    const alarms = await updateAlarm(pushToken, alarm);
    res.json(alarms);
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
    const { pushToken, id } = req.body;
    const alarms = await removeAlarm(pushToken, id);
    res.json(alarms);
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
