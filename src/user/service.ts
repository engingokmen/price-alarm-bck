import { errorMessages, ErrorResponse } from "../utils/error";
import { UserModel } from "./model";

export const createUser = async (pushToken: string) => {
  try {
    const newUser = new UserModel({ pushToken });
    newUser.save();
    return newUser;
  } catch (error) {
    throw new ErrorResponse(errorMessages.USER_NOT_CREATED);
  }
};

export const getUserByPushToken = async (pushToken: string) => {
  try {
    const user = await UserModel.findOne({ pushToken });

    if (!user) {
      throw new ErrorResponse(errorMessages.USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    throw new ErrorResponse(errorMessages.USER_NOT_FOUND);
  }
};
