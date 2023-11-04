import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

import ToggleBtn from "./toggleBtn";
import logo from "../../../public/assets/logo.svg";

export default function Navbar() {
    //Function used for translations
    const { t } = useTranslation("common");

    //Navbar for small and big screens
    return (
        <div className='navbar h-8 sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b-slate-400'>
            <div className='navbar-start'>
                {/* Dropdown menu for small screens */}
                <div className='dropdown'>
                    <label
                        tabIndex={0}
                        className='btn btn-ghost md:pl-6 lg:hidden'
                    >
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
                        className='menu menu-sm dropdown-content -ml-2 p-2 shadow w-28 mt-2 bg-Primary'
                    >
                        <li className='text-Accent font-bold underline font-poppins'>
                            <Link href='/'>{t("Home")}</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins'>
                            <Link href='/blogs'>{t("Blogs")}</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins'>
                            <Link href='/about'>{t("About")}</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins'>
                            <Link href='/contact'>{t("Contact")}</Link>
                        </li>
                    </ul>
                </div>

                {/* Our Logo */}
                <div className='logo-container lg:px-6'>
                    <Link href='/'>
                        <Image
                            src={logo}
                            alt='Logo'
                            width={120}
                            height={60}
                            layout='fixed'
                        />
                    </Link>
                </div>
            </div>

            {/* Navbar for large screens*/}
            <div className='flex justify-between ml-auto'>
                <Link href='/profile'>profile</Link>
                <ToggleBtn />
                <div className='navbar-center hidden lg:flex'>
                    <ul className='menu menu-horizontal'>
                        <li className='text-Accent font-bold underline font-poppins text-base tracking-wider'>
                            <Link href='/'>{t("Home")}</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins text-base tracking-wider '>
                            <Link href='/blogs'>{t("Blogs")}</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins text-base tracking-wider '>
                            <Link href='/about'>{t("About")}</Link>
                        </li>
                        <li className='text-NeutralBlack font-semibold font-poppins text-base tracking-wider'>
                            <Link href='/contact'>{t("Contact")}</Link>
                        </li>
                    </ul>
                </div>

                {/* Login button */}
                <button className='button-container w-28 h-9 mx-4 md:mr-8 md:w-40 bg-Accent hover:bg-Primary rounded-md'>
                    <Link
                        href='/login'
                        className='text-base tracking-wider text-NeutralBlack font-extrabold font-poppins'
                        style={{ textTransform: "capitalize" }}
                    >
                        {t("Log In")}
                    </Link>
                </button>
            </div>
        </div>
    );
}
