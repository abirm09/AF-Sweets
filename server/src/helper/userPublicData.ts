import { IUser } from "../model/userModel";
import settings from "../setting/settings.json";

export const userInfo = (user: IUser) => {
  return {
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    profile_pic: user.profile_pic,
    user_role: user.role,
    email_verified: user.email_verified,
    max_discount: settings.discount_price,
  };
};
