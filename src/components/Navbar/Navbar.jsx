import React from "react";
import logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div
            className='navbar bg-base-100'
            style={{
                background: "rgba(234, 248, 249, 0.08)",
                boxShadow:
                    "-51.53333px 51.53333px 51.53333px 0px rgba(255, 255, 255, 0.08) inset, 51.53333px -51.53333px 51.53333px 0px rgba(178, 188, 189, 0.08) inset",
                backdropFilter: "blur(24.220666885375977px)",
            }}
        >
            <div className='navbar-start'>
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
                        className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52'
                        style={{
                            background: "rgba(234, 248, 249, 0.08)",
                            boxShadow:
                                "-51.53333px 51.53333px 51.53333px 0px rgba(255, 255, 255, 0.08) inset, 51.53333px -51.53333px 51.53333px 0px rgba(178, 188, 189, 0.08) inset",
                            backdropFilter: "blur(24.220666885375977px)",
                        }}
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

                        {/* <li>
              <a className='text-NeutralBlack font-semibold font-poppins'>About</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
             </li> */}
                    </ul>
                </div>

                <div className='px-6'>
                    <Link href='/'>
                        <Image
                            src={logo}
                            alt='Logo'
                            width={145}
                            height={85.872}
                            layout='fixed'
                        />
                    </Link>
                </div>
            </div>
            <div className='flex justify-end ml-auto px-4'>
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

                        {/* <li tabIndex={0}>
            <details>
              <summary className='text-NeutralBlack font-semibold font-poppins text-base'>About</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li> */}
                    </ul>
                </div>
                <div className='navbar-end'>
                    <Link
                        href='/login'
                        className='btn bg-Accent mx-4 h-0 w-32 text-base tracking-wider text-NeutralBlack font-extrabold font-poppins hover:bg-Primary'
                        style={{ textTransform: "capitalize" }}
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
