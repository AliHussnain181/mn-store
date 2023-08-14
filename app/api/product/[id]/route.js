import { Product } from "@/schema/product";
import { checkAdmin, connectDB } from "@/utils/features";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
    try {
        const { name, price, stock, image } = await req.json();

        if (!name || !price || !stock || !image) {
            return NextResponse.json({ error: 'Please provide all required fields.' }, { status: 400 });
        }
        const isAdmin = await checkAdmin();

        if (!isAdmin) {
            return NextResponse.json({ error: 'Only admin allow' }, { status: 400 });
        }

        connectDB();

        const product = await Product.findById(res.params.id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
        }

        if (name) product.name = name;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (image) product.image = image;

        await product.save();

        return NextResponse.json({ product, message: "Updated successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error, message: "Server error." }, { status: 500 });
    }
}

export async function DELETE(req, res) {
    try {
        const isAdmin = await checkAdmin();

        if (!isAdmin) {
            return NextResponse.json({ error: 'Only admin allow' }, { status: 400 });
        }

        await connectDB()

        let product = await Product.findById(res.params.id)

        if (!product) {
            return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
        }

        await product.deleteOne();

        return NextResponse.json({ message: "product deleted" });

    } catch (error) {
        NextResponse.json({ error }, { status: 500 })
    }
}