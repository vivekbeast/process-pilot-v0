// // import React from 'react'
// // import { Menu, User } from 'lucide-react';

// // export default function NavBarDashboard() {
// //   return (
// //     <div>
// //         <header className="bg-white shadow-sm">
// //         <div className="flex items-center justify-between px-6 py-4">
// //           <div className="flex items-center gap-4">
// //             <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
// //             <h1 className="text-xl font-bold text-gray-900">ProcessPilot</h1>
// //           </div>
// //           <User className="w-6 h-6 text-gray-600 cursor-pointer" />
// //         </div>
// //       </header>
// //     </div>
// //   )
// // }
// "use client";
// import React, { useState, useEffect } from 'react';
// import { Menu, User, X, Home, Briefcase, FileText, Settings, BarChart2, Book, Box } from 'lucide-react';
// import Link from 'next/link';

// // You would typically use Next.js's Link and useRouter
// // For this self-contained example, we'll use standard <a> tags and placeholder functions.
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';

// const Navbar = () => {
//     // const router = useRouter();
//     const [isMasterMenuOpen, setMasterMenuOpen] = useState(false);
//     const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

//     const toggleMasterMenu = () => {
//         setProfileMenuOpen(false); // Close other menu if open
//         setMasterMenuOpen(!isMasterMenuOpen);
//     };

//     const toggleProfileMenu = () => {
//         setMasterMenuOpen(false); // Close other menu if open
//         setProfileMenuOpen(!isProfileMenuOpen);
//     };
    
//     // Close menus when escape key is pressed
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === 'Escape') {
//                 setMasterMenuOpen(false);
//                 setProfileMenuOpen(false);
//             }
//         };
//         document.addEventListener('keydown', handleKeyDown);
//         return () => document.removeEventListener('keydown', handleKeyDown);
//     }, []);

//     // Main component for the left sidebar (Master Menu)
//     const MasterMenu = () => (
//         <div 
//             className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-72 shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
//                 isMasterMenuOpen ? 'translate-x-0' : '-translate-x-full'
//             }`}
//         >
//             <div className="flex justify-between items-center p-4 border-b border-gray-700">
//                 <h2 className="text-xl font-bold">Master Menu</h2>
//                 <button onClick={toggleMasterMenu} className="hover:bg-gray-700 p-2 rounded-full">
//                     <X size={24} />
//                 </button>
//             </div>
//             <ul className="p-4 space-y-2">
//                 <li><a href="/dashboard" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><Home size={20}/> Manufacturing Orders</a></li>
//                 <li><a href="/dashboard/work-orders" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><Briefcase size={20}/> Work Orders</a></li>
//                 <li><a href="/dashboard/boms" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><FileText size={20}/> Bills of Materials</a></li>
//                 <li><a href="/dashboard/work-centers" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><Settings size={20}/> Work Center</a></li>
//                 <li><a href="/dashboard/stock-ledger" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><Box size={20}/> Stock Ledger</a></li>
//             </ul>
//         </div>
//     );

//     // Main component for the right sidebar (Profile Setup)
//     const ProfileSetupMenu = () => (
//         <div 
//             className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-72 shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
//                 isProfileMenuOpen ? 'translate-x-0' : 'translate-x-full'
//             }`}
//         >
//             <div className="flex justify-between items-center p-4 border-b border-gray-700">
//                 <h2 className="text-xl font-bold">Profile Setup</h2>
//                 <button onClick={toggleProfileMenu} className="hover:bg-gray-700 p-2 rounded-full">
//                     <X size={24} />
//                 </button>
//             </div>
//             <ul className="p-4 space-y-2">
//                 <li><a href="/profile" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><User size={20}/> My Profile</a></li>
//                 <li><a href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><BarChart2 size={20}/> My Reports</a></li>
//             </ul>
//         </div>
//     );
    
//     // Overlay to close menus when clicking outside
//     const Overlay = () => (
//         <div 
//             className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
//                 isMasterMenuOpen || isProfileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//             }`}
//             onClick={() => {
//                 setMasterMenuOpen(false);
//                 setProfileMenuOpen(false);
//             }}
//         />
//     );

//     return (
//         <>
//             <div className='flex flex-col bg-[#3F4F5F] justify-center items-center w-full'>
//                 <nav className="w-full pl-6 pr-10 md:px-12 h-20 z-30 flex items-center justify-between relative">
//                     {/* Left Side: Hamburger Menu */}
//                     <div className="flex-1 flex justify-start">
//                         <button onClick={toggleMasterMenu} className="text-white cursor-pointer hover:text-amber-300 p-2 rounded-full transition-colors">
//                             <Menu size={28} />
//                         </button>
//                     </div>

//                     {/* Middle: Logo and Title */}
//                     <div className="flex-shrink-0">
//                          {/* Replace with Next.js Link and Image if needed */}
//                         <Link href="/dashboard" className="flex items-center gap-0">
//                             <img src="/logo.png" alt="logo" className="w-12 h-12" />
//                             <div>
//                                 <h1 className="fontName text-white text-xl md:text-3xl font-bold underline decoration-amber-300 underline-offset-8">
//                                     ProcessPilot
//                                 </h1>
//                             </div>
//                         </Link>
//                     </div>
                    
//                     {/* Right Side: User Profile */}
//                     <div className="flex-1 flex justify-end">
//                         <button onClick={toggleProfileMenu} className="text-white cursor-pointer hover:text-amber-300 p-2 rounded-full transition-colors">
//                             <User size={28} />
//                         </button>
//                     </div>
//                 </nav>
//             </div>
            
//             {/* Render Sidebars and Overlay */}
//             <MasterMenu />
//             <ProfileSetupMenu />
//             <Overlay />
//         </>
//     );
// };

// export default Navbar;
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Menu, User, X, Home, Briefcase, FileText, Settings, BarChart2, Box } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    const [isMasterMenuOpen, setMasterMenuOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

    const toggleMasterMenu = () => {
        setProfileMenuOpen(false);
        setMasterMenuOpen(!isMasterMenuOpen);
    };

    const toggleProfileMenu = () => {
        setMasterMenuOpen(false);
        setProfileMenuOpen(!isProfileMenuOpen);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setMasterMenuOpen(false);
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const MasterMenu = () => (
        <div 
            className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-72 shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
                isMasterMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Master Menu</h2>
                <button onClick={toggleMasterMenu} className="hover:bg-gray-700 p-2 rounded-full">
                    <X size={24} />
                </button>
            </div>
            <ul className="p-4 space-y-2">
                <li><a href="/dashboard" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><Home size={20}/> Manufacturing Orders</a></li>
                <li><a href="/dashboard/work-orders" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><Briefcase size={20}/> Work Orders</a></li>
                <li><a href="/dashboard/boms" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><FileText size={20}/> Bills of Materials</a></li>
                <li><a href="/dashboard/work-centers" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><Settings size={20}/> Work Center</a></li>
                <li><a href="/dashboard/stock-ledger" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><Box size={20}/> Stock Ledger</a></li>
            </ul>
        </div>
    );

    const ProfileSetupMenu = () => (
        <div 
            className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-72 shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
                isProfileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Profile Setup</h2>
                <button onClick={toggleProfileMenu} className="hover:bg-gray-700 p-2 rounded-full">
                    <X size={24} />
                </button>
            </div>
            <ul className="p-4 space-y-2">
                <li><a href="/profile" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><User size={20}/> My Profile</a></li>
                <li><a href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"><BarChart2 size={20}/> My Reports</a></li>
            </ul>
        </div>
    );

    const Overlay = () => (
        <div 
            className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
                isMasterMenuOpen || isProfileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => {
                setMasterMenuOpen(false);
                setProfileMenuOpen(false);
            }}
        />
    );

    return (
        <>
            <div className='flex flex-col bg-[#3F4F5F] justify-center items-center w-full'>
                <nav className="w-full pl-6 pr-10 md:px-12 h-20 z-30 flex items-center justify-between relative">
                    {/* Left Side: Hamburger Menu */}
                    <div className="flex-1 flex justify-start">
                        <button onClick={toggleMasterMenu} className="text-white cursor-pointer hover:text-amber-300 p-2 rounded-full transition-colors">
                            <Menu size={28} />
                        </button>
                    </div>

                    {/* Middle: Logo and Title with Bounce Animation */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-shrink-0"
                    >
                        <Link href="/dashboard" className="flex items-center gap-0">
                            <img src="/logo.png" alt="logo" className="w-12 h-12 " />
                            <div>
                                <h1 className="fontName text-white text-xl md:text-3xl font-bold underline decoration-amber-300 underline-offset-8">
                                    ProcessPilot
                                </h1>
                            </div>
                        </Link>
                    </motion.div>
                    
                    {/* Right Side: User Profile */}
                    <div className="flex-1 flex justify-end">
                        <button onClick={toggleProfileMenu} className="text-white cursor-pointer hover:text-amber-300 p-2 rounded-full transition-colors">
                            <User size={28} />
                        </button>
                    </div>
                </nav>
            </div>
            
            {/* Render Sidebars and Overlay */}
            <MasterMenu />
            <ProfileSetupMenu />
            <Overlay />
        </>
    );
};

export default Navbar;
