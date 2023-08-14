
import { User } from "@/schema/user.js";
import { connectDB, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function POST(req) {

    try {

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Please provide all required fields.' }, { status: 400 });
        }
        connectDB()

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return NextResponse.json({ error: 'Incorrect Email or Password' }, { status: 409 });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return NextResponse.json({ message: 'Incorrect Email or Password' }, { status: 401 });
        }

        const token = generateToken(user._id)

        cookies().set('mntoken', token, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: 'strict',
            maxAge: 15 * 24 * 60 * 60 * 1000
        })

        return NextResponse.json({user, message: `${user.name} login successfully.`, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error registering user:', error.message);
        return NextResponse.json({ error: 'An internal server error occurred.', success: false }, { status: 500 });
    }
}