import { Product } from "@/schema/product";
import { connectDB } from "@/utils/features";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {

        await connectDB()

        let product = await Product.findById(res.params.id)

        if (!product) {
            return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
        }

        return NextResponse.json(product,{message: "updated product data", success:true});

    } catch (error) {
        NextResponse.json({ error,success:true }, { status: 500 })
    }
}