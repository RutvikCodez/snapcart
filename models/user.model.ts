import { UserModelType } from "@/types";
import { model, Schema, models } from "mongoose";

const userSchema = new Schema<UserModelType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    mobile: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "deliveryBoy"],
      default: "user",
    },
    image: {
      type: String,
    }
  },
  { timestamps: true },
);

const User = models.User || model("User", userSchema);

export default User;

