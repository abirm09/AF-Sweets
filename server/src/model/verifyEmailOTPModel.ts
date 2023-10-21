import mongoose, { Document, Model } from "mongoose";

const verifyEmailOTPSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    requested_user_id: {
      type: String,
      required: true,
    },
    exp_time: {
      type: Date,
      required: true,
      default: () => {
        return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes in the future
      },
    },
  },
  { timestamps: true }
);

export interface IVerifyEmailOTPSchema extends Document {
  otp: string;
  requested_user_id: string;
  exp_time: Date;
}

export const VerifyEmailOtp: Model<IVerifyEmailOTPSchema> =
  mongoose.model<IVerifyEmailOTPSchema>(
    "verifyEmailOPTs",
    verifyEmailOTPSchema
  );
