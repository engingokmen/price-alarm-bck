import { NextFunction, Request, Response } from "express";
import { sendNotification } from "./service";
import { getMessage } from "./messages";

export const pushMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pushToken } = req.body;
    const ticket = await sendNotification(pushToken, getMessage("testMessage"));
    res.json({ message: "Push message sent", ticket });
  } catch (error) {
    next(error);
  }
};
