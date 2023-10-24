import mongoose, { Document, Model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    authentication: [
      {
        device: String,
        os: String,
        token: String,
      },
    ],
    profile_pic: {
      type: String,
    },
    role: {
      type: String,
      enum: ["owner", "seller", "user"],
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    is_banned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  authentication: [
    {
      device: string;
      os: string;
      token: string;
    }
  ];
  profile_pic?: string;
  role?: string;
  email_verified: boolean;
  phone_number: string;
  is_banned: boolean;
}
const User: Model<IUser> = mongoose.model<IUser>("users", userSchema);

export default User;
