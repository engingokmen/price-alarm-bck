import { Schema } from "mongoose";
import { IAlarm } from "../../types";

export const alarmSchema = new Schema<IAlarm>({
  price: { type: Number, unique: true },
});
