import { Types } from "mongoose";

type UserModelType = {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    mobile?: string
    role: "user" | "admin" | "deliveryBoy";
}