"use client"
import { Context } from '@/components/context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('available');
    const { user } = useContext(Context);

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    price,
                    image,
                    stock
                })
            });

            if (response.ok) {
                toast.success('Product added successfully!');
                router.push('/');
            } else {
                toast.error('Error adding product');
            }
        } catch (error) {
            toast.error('An error occurred:', error);
        }
    }

    return (
        <>
            {user && user.role === "admin" && (
                <div className="p-8 mt-20">
                    <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Price</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Image Source:(only https image used)</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Availability</label>
                            <select
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            >
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="animated-button"
                        >
                            Add Product
                        </button>
                    </form>
                    <button className="animated-button my-5">
                        <Link href="/">Product Page</Link>
                    </button>
                </div>
            )}
        </>
    );
};

export default ProductForm;
