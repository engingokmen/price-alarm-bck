import mongoose, { Document } from "mongoose";

export interface IMessage {
  to: string;
  sound: string;
  title: string;
  body: string;
}

export interface IUser extends Document {
  _id: string;
  pushToken: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  alarms: mongoose.Types.DocumentArray<IAlarm>;
}

export interface IAlarm extends Document {
  _id: string;
  price: number;
  type: "above" | "below";
  isDone: boolean;
}

export interface IJob {
  runPriceCheck: boolean;
}
