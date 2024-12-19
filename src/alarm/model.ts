import mongoose from "mongoose";

const alarmSchema = new mongoose.Schema({
  price: Number,
});

export const AlarmModel = mongoose.model("Alarm", alarmSchema);
