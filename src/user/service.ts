import { errorMessages, ErrorResponse } from "../utils/error";
import { UserModel } from "./model";

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find();

    if (!users) {
      throw new ErrorResponse(errorMessages.USERS_NOT_FOUND);
    }

    return users;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (pushToken: string) => {
  try {
    const newUser = new UserModel({ pushToken });
    newUser.save();
    return newUser;
  } catch (error) {
    throw error;
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
    throw error;
  }
};
