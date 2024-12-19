import { Request, Response } from "express";
import { sendNotification } from "./service";
import { getMessage } from "./messages";

export const pushMessage = (req: Request, res: Response) => {
  const token = req.body?.pushToken;

  if (!token) {
    res.status(400).json({ error: "Push token is required" });
  }
  const ticket = sendNotification(token, getMessage("testMessage"));

  res.json({ token, ticket });
};
