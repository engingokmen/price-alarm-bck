import { model, Model, Schema } from "mongoose";
import { IUser } from "../../types";
import { alarmSchema } from "../alarm/model";

const UserSchema = new Schema<IUser, UserModelType>({
  pushToken: { unique: true, type: String },
  firstname: String,
  lastname: String,
  email: String,
  alarms: { type: [alarmSchema], default: [] },
});

export const UserModel = model<IUser, UserModelType>("User", UserSchema);

type UserModelType = Model<IUser>;
