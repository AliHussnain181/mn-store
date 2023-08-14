import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    try {

        
        cookies().delete('mntoken', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
        })
        return NextResponse.json({ message: "your account logout",success: true}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error", error,success: false}, { status: 500 })
    }
}
