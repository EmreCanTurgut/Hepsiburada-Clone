'use client'
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="bg-gray-200 text-white px-12 py-2 flex justify-between items-center ">
            <div className="text-xl font-bold text-orange-500">Hepsiburada</div>

            <div className="relative">
                <button onClick={toggleMenu} className="focus:outline-none">
                    <FaUserCircle className="w-8 h-8 text-gray-600 hover:text-gray-800 transition-all duration-150" />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Profile
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Settings
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
