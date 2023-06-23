import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tokenSchema = new Schema(
  {
    meterNumber: {
      type: String,
      minLength: 6,
      maxLength: 6,
      unique: true,
      required: true,
    },
    token: {
      type: String,
      minLength: 8,
      maxLength: 8,
      unique: true,
      required: true,
    },
    tokenStatus: {
      type: String,
      enum: ["USED", "NEW", "EXPIRED"],
      required: true,
    },
    tokenValueDays: {
      type: Number,
      maxLength: 11,
      required: true,
      validate: {
        validator: function (value) {
          return value <= 5 * 365; // Validate that number of days doesn't exceed 5 years
        },
        message: "Number of days should not exceed 5 years.",
      },
    },
    purchasedDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      maxLength: 11,
      required: true,
    },
  },
  { timestamps: true }
);

export const Token = model("token", tokenSchema);
