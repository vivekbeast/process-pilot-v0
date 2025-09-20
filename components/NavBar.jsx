'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const toggleMenu = () => setIsOpen((prev) => !prev);
  
  return (
    <div className=' flex flex-col bg-[#3F4F5F] justify-center items-center w-full '>
      <nav className={`w-full pl-6 pr-10 md:px-12 h-20 z-10  flex items-center justify-between  ${isOpen ? " rounded-none" : "rounded-br-full"} `}>
      {/* Logo and Title */}
      <Link href="/" className="flex items-center gap-0">
        <Image src="/logo.png" alt="logo" width={60} height={60} quality={true} priority objectFit='cover' />
        <div>
          <h1 className="fontName text-white text-lg md:text-3xl font-bold underline decoration-amber-300 underline-offset-6">ProcessPilot</h1>
        </div>
      </Link>
    
      
      {/* Auth Buttons - Green Theme */}
      <div className="hidden lg:flex gap-4 text-md rounded-full px-6 py-2 bg-amber-400  transition-all shadow-md hover:shadow-lg">
        <button onClick={()=> {router.push('/auth/login')}} className="text-white cursor-pointer  font-medium transition-colors">
          Log In
        </button>
        <div className=' h-[24px] w-[1px] bg-white border-0 rounded-full border-white'></div>
        <button onClick={()=> {router.push('/auth/signup')}} className=" cursor-pointer text-white  font-medium ">
          Signup
        </button>
      </div>
      
      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden z-50">
        <button onClick={toggleMenu} className="text-white hover:text-amber-400 cursor-pointer">
          {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 top-20  left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-green-200 flex flex-col items-start px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3 mt-4 w-full z-50">
            <button onClick={()=> {router.push('/auth/login')}} className="text-gray-700 hover:text-green-600 cursor-pointer text-left font-medium transition-colors">
              Log In
            </button>
            <button onClick={()=> {router.push('/auth/signup')}} className="bg-amber-400 cursor-pointer text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 w-full font-medium transition-all shadow-md">
              Signup
            </button>
          </div>
        </div>
      )}

    </nav>
{/* <div 
  className="fixed top-[30px] left-0 h-[120px] w-full bg-[#3F4F5F]" 
  style={{ clipPath: "path('M0 0 H100 V50 Q10 50 0 120 Z')" }}
></div> */}
    </div>
  );
}