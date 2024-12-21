'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiAccountCircleLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import homeSlice from '@/store/Slices/home';
import ProfileModal from '../products/profileModal';



const Nav = () => {
    const dispatch=useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    const profileModalOpen=()=>{
        dispatch(homeSlice.actions.isProfileModalOpenedChangeHandler(true))
    }

    return (
        <nav className="bg-gray-200 text-white px-12 py-2 flex justify-between items-center ">
            <div className="text-xl font-bold text-orange-500">Hepsiburada</div>
            <div className="flex gap-8 text-gray-700">
                <ProfileModal/>
                <Link
                    href={'discount'}
                    className="hover:underline underline-offset-2"
                >
                    Discounted Products
                </Link>
                <Link
                    href={'products'}
                    className="hover:underline underline-offset-2"
                >
                    Products
                </Link>
            </div>
            <div className="relative">
                <div>
                    <button>
                    <FaShoppingCart />

                        {/*EMRE Tam Buraya sepet logosu koyulcak ve sepet modalı açma eklencek */}
                    </button>
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <RiAccountCircleLine className="w-8 h-8 text-gray-600 hover:text-gray-800 transition-all duration-150" />
                    </button>
                </div>
                {/* aşağıdaki linklerde ona göre düzenlencek */}
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={profileModalOpen}
                            >
                                Profile
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
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
