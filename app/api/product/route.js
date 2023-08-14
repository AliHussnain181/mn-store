import { Product } from '@/schema/product';
import { checkAdmin, connectDB } from '@/utils/features';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, price, stock, image } = await req.json();

        if (!name || !price || !stock || !image) {
            return NextResponse.json({ error: 'Please provide all required fields.' }, { status: 400 });
        }
        const isAdmin = await checkAdmin();

        if (!isAdmin) {
            return NextResponse.json({ error: 'Only admin allow' }, { status: 400 });
        }

        await connectDB();

        const newProduct = await Product.create({
            name, price, stock, image
        });

        return NextResponse.json({ newProduct, message: "product save" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "server error", error }, { status: 500 });
    }
}


export async function GET() {
    try {

        await connectDB()

        let product = await Product.find();

        return NextResponse.json(product, { status: 200, message: "product data" })

    } catch (error) {
        return NextResponse.json({ message: "server error" }, { status: 500 })
    }
}