import mongoose, { Document, Model } from "mongoose";

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    price_info: {
      price: Number,
      price_updates: [
        {
          price: Number,
          user_id: String,
          updatedAt: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    },
    is_alive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export interface ISweet extends Document {
  name: string;
  image: string;
  price_info: {
    price: Number;
    price_updates: [
      {
        price: Number;
        user_id: String;
        updatedAt: Date;
      }
    ];
  };
  is_alive: boolean;
}

export const Sweet: Model<ISweet> = mongoose.model<ISweet>(
  "Sweets",
  sweetSchema
);
