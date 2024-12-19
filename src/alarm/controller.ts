import { Request, Response } from "express";
import { addAlarm } from "./service";

export const add = async (req: Request, res: Response) => {
  console.log("req******");
  console.log("req.body", req.body);
  const price = req.body?.price;
  await addAlarm({ price });
  res.json({ price });
};
