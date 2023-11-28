import { Schema, model } from "mongoose";
import otpGenerator from "otp-generator";

interface ISales {
  customer_name: string;
  sweet_info: {
    sweet_id: string;
    name: string;
    unit: number;
    price: number;
  };
  seller_id: string;
  tr_id: string;
  net_price: number;
  price: number;
}

const SalesSchema = new Schema<ISales>(
  {
    customer_name: String,
    sweet_info: [
      {
        sweet_id: {
          type: String,
          required: true,
        },
        unit: {
          type: Number,
          required: true,
        },
      },
    ],
    seller_id: {
      type: String,
      required: true,
    },
    tr_id: {
      type: String,
      required: true,
      default: otpGenerator.generate(10, {
        upperCaseAlphabets: true,
        specialChars: false,
        lowerCaseAlphabets: false,
      }),
    },
    net_price: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Sales = model<ISales>("Sales", SalesSchema);
