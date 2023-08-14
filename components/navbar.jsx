"use client"
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx"
import { Context } from './context';
import { CgProfile } from "react-icons/cg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, setUser } = useContext(Context);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-black">
      <div className=" mx-auto px-4 fixed top-0 bg-white z-[999] shadow-lg w-full hidden md:block">
        <div className="flex items-center justify-between h-16 font-Special">
          <div className="flex items-center">
            <div className="flex-shrink-0  font-semibold text-xl font-Raleway">Gaffor Grocery Outlet</div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <Link href="/" className="hover:text-[#4A7C59]  px-3 py-2 rounded-md">
                Home
              </Link>
              <Link href="/about" className="hover:text-[#4A7C59]  px-3 py-2 rounded-md">
                About
              </Link>
              {user._id ?
                <Link href="/profile" className="  px-3 py-2 rounded-md">
                  <CgProfile size={23} />
                </Link>
                :
                <Link href="/login" className="  px-3 py-2 rounded-md">
                  Login
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white shadow-lg text-black w-full fixed top-0 z-[999] md:hidden'>
        <div className='flex justify-between items-center mx-2 h-14 '>
          <div className='text-center mx-3 font-Raleway font-bold'>
            <h1>Gaffor Grocery Outlet</h1>
          </div>
          {
            isOpen ?
              <AiOutlineMenu size={27} className='cursor-pointer md:hidden ' onClick={toggleMenu} />
              :
              <RxCross1 size={27} className='cursor-pointer md:hidden ' onClick={toggleMenu} />
          }
        </div>
        <div onClick={toggleMenu} className={`bg-white fixed top-0  h-[100vh] font-semibold font-Special text-xl w-[19rem] flex flex-col py-4 px-5 text-[14.3px]  ${isOpen ? '-left-80' : 'left-0'} transition-all duration-200 `}>
          <Link className='border-gray-700 border-b-[0.1rem] py-2.5' href="/">Home</Link>
          <Link className='border-gray-700 border-b-[0.1rem] py-2.5' href="/about">About</Link>
          {user._id ? <Link className='border-gray-700 border-b-[0.1rem] py-2.5' href="/profile"><CgProfile size={25} /></Link>
            : <Link href="/login" className='bg-[#FFFFFF] animated-button text-sm my-2 w-36'>Login Now</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
