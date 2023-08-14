
import { User } from "@/schema/user.js";
import { connectDB, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function POST(req) {

  try {

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Please provide all required fields.' }, { status: 400 });
    }
    connectDB()

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered.' }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hashPassword });

    const token = generateToken(user._id)

    
    cookies().set('mntoken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: "/",
      maxAge: 15 * 24 * 60 * 60 * 1000
    })

   

    return NextResponse.json({ user, message: 'User registered successfully.',success: true }, { status: 200 });
  } catch (error) {
    console.error('Error registering user:', error.message);
    return NextResponse.json({ error: 'An internal server error occurred.', success:false }, { status: 500 });
  }
}