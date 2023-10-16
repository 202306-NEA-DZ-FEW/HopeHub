import React from "react";
import logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-start'>
                {/* Dropdown menu for small screens */}
                <div className='dropdown'>
                    <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h8m-8 6h16'
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className='menu-s menu-sm dropdown-content mt-6 z-[4] p-2 shadow w-52'
                    >
                        <li className='text-Accent font-bold underline font-poppins'>
                            <Link href='/'>Home</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins'>
                            <Link href='/blogs'>Blogs</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins'>
                            <Link href='/about'>About</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins'>
                            <Link href='/contact'>Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* Our Logo */}
                <div className='logo-container'>
                    <Link href='/'>
                        <Image
                            src={logo}
                            alt='Logo'
                            width={145}
                            height={85.872 * (115 / 145)}
                            layout='fixed'
                        />
                    </Link>
                </div>
            </div>

            {/* Navbar for large screens*/}
            <div className='flex justify-between ml-auto px-4'>
                <div className='navbar-center hidden lg:flex'>
                    <ul className='menu menu-horizontal px-1 gap-6'>
                        <li className='text-Accent font-bold underline font-poppins text-base tracking-wider'>
                            <Link href='/'>Home</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins text-base tracking-wider'>
                            <Link href='/blogs'>Blogs</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins text-base tracking-wider'>
                            <Link href='/about'>About</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins text-base tracking-wider'>
                            <Link href='/contact'>Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* Login button */}
                <div className='navbar-end'>
                    <Link
                        href='/login'
                        className='button-container btn  bg-Accent mx-4 h-0 w-32 text-base tracking-wider text-NeutralBlack font-extrabold font-poppins hover:bg-Primary'
                        style={{ textTransform: "capitalize" }}
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
