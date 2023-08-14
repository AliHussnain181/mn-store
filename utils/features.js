import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "@/schema/user";
import { cookies } from 'next/headers'


export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Database Connected`);
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};


export const checkAuth = async () => {

  const cookie = cookies()

  let token = cookie.get('mntoken')?.value

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decoded._id);
}

export const checkAdmin = async () => {

  const cookie = cookies()

  let token = cookie.get('mntoken')?.value

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id);

  return user && user.role === 'admin';
}
