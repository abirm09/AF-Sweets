import { IUser } from "../model/userModel";

export const userInfo = (user: IUser) => {
  return {
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    profile_pic: user.profile_pic,
    user_role: user.role,
  };
};
