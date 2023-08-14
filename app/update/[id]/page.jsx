"use client"
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Context } from '@/components/context';

const Page = ({ params }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('available');
    const router = useRouter();

    const { user } = useContext(Context);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            toast.error("You don't have access to this page.");
            router.push('/');
        } else {
            const getData = async () => {
                try {
                    let res = await fetch(`/api/product/single/${params.id}`);
                    if (res.ok) {
                        let result = await res.json();
                        setName(result.name);
                        setPrice(result.price);
                        setImage(result.image);
                        setStock(result.stock);
                    } else {
                        toast.error('Failed to fetch product data');
                    }
                } catch (error) {
                    toast.error('Error while fetching product data:', error);
                }
            };
            getData();
        }
    }, [user, params.id,router]);

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            let result = await fetch(`/api/product/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ name, price, stock, image }),
            });

            if (result.ok) {
                toast.success("Product updated");
                router.push('/');
            } else {
                toast.error('Failed to update product');
            }
        } catch (error) {
            toast.error('Error while updating product:', error);
        }
    }

    return (
        <div className="p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update a Product</h2>
            <form onSubmit={updateProduct} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Price</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Image Source:(only https image used)</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <div>
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
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default Page;
