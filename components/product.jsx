"use client"
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GrUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { Context } from './context';
import Image from 'next/image';
import Link from 'next/link';
import Loader from './Loader';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const { user, setUser } = useContext(Context);

    useEffect(() => {
        const getProducts = async () => {
            try {
                let res = await fetch('/api/product');
                if (res.ok) {
                    res = await res.json();
                    setProducts(res);
                } else {
                    throw new Error('Failed to fetch products');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            let res = await fetch(`/api/product/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProducts(products.filter(product => product._id !== id));
                toast.success('Product deleted');
            } else {
                const errorData = await res.json();
                toast.error(`Error deleting product: ${errorData.message}`);
            }
        } catch (error) {
            toast.error(`An error occurred while deleting the product: ${error.message}`);
        }
    };

    
    // Filter products based on search input and selected price
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'lowToHigh') {
            return a.price - b.price;
        } else if (sortOrder === 'highToLow') {
            return b.price - a.price;
        }
        return 0;
    });

    const filteredProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );


    return (
        <>
            <div className="flex flex-col md:flex-row w-[80%] mx-auto items-center justify-between font-Raleway mb-8 mt-28">
                <div className="mb-4 md:mb-0 md:mr-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                    <div className="relative rounded-md overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full h-full border-black border-b-[1px] px-4 py-2 focus:outline-none focus:border-gradient-blue placeholder-gray-400"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                    <div className="relative rounded-md overflow-hidden">
                        <select
                            className="w-full h-full border-black border-b-[1px] px-4 py-2 focus:outline-none focus:border-gradient-blue"
                            value={sortOrder}
                            onChange={handleSortChange}
                        >
                            <option value="">Sort By Price</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>


            <div>
                <div className='w-full my-8 flex flex-wrap justify-center items-center bg-[#FFFCF4] '>
                    {loading ? (
                        <Loader />
                    ) : filteredProducts.length === 0 ? (
                        <div>No products available.</div>
                    ) : (
                        filteredProducts.map((dt, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    x: '-100%',
                                    opacity: 0,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    delay: index * 0.12, // Adding delay based on index
                                }}
                                className={`w-[10rem] ${user.role === 'admin' ? 'h-[17rem]' : 'h-[15rem]'} border-[#464545] border-[1px] rounded-sm overflow-hidden cursor-pointer m-2`}
                            >
                                <Image
                                    className='w-[8rem] h-[8rem] mt-3 mx-auto object-center rounded-md'
                                    src={dt.image}
                                    width={500}
                                    height={500}
                                    alt='product'
                                />
                                <div className='pt-4 px-4 font-Special text-left'>
                                    <div className='font-[500] font-Roboto text-[14px] tracking-wider leading-5 line-clamp-2 text-[#c98e9d]'>{dt.name}</div>
                                    <div className='text-[16px] font-[400] text-[#A0AEA6] hover:text-[#fdbfc5]'>{dt.stock}</div>
                                    <div className='text-sm font-[400]'>Rs {dt.price}</div>
                                </div>
                                <div className='flex items-center gap-x-20 px-4'>
                                    {user && user.role === 'admin' && (
                                        <Link href={`/update/${dt._id}`} className='text-xl cursor-pointer text-center'>
                                            <div className='bg-back h-1 w-full'></div>
                                            <GrUpdate />
                                        </Link>
                                    )}
                                    {user && user.role === 'admin' && (
                                        <div onClick={() => deleteProduct(dt._id)} className='text-xl w1 text-red-700 cursor-pointer text-center'>
                                            <AiFillDelete />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Products;



