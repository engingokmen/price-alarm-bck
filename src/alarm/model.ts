import { Schema } from "mongoose";
import { IAlarm } from "../../types";

export const alarmSchema = new Schema<IAlarm>({
  price: { type: Number, unique: true },
  type: { type: String, enum: ["above", "below"], default: "above" },
  isDone: { type: Boolean, default: false },
});
