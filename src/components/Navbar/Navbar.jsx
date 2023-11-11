import { signOut } from "firebase/auth";
import Cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { PiMagnifyingGlass } from "react-icons/pi";

import { useAppcontext } from "@/context/state";
import { auth } from "@/util/firebase";

import darklogo from "../../../public/assets/darklogo.svg";
import logo from "../../../public/assets/logo.svg";

export default function Navbar() {
    //Function used for translations
    const { t } = useTranslation("common");
    //Using variables from context to set up dark mode, router, and navbar changes once a user is logged in
    const { darkMode } = useAppcontext();
    const { isLogged, user, blogs } = useAppcontext();
    console.log("all blogs from context", blogs);
    //Initializing the Next.js router
    const router = useRouter();

    //State variables to control the menu and search
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Function to toggle the user menu visibility
    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    // Function to handle the search icon click
    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // Function to determine if a page is currently active
    const isPageActive = (pathname) => {
        return router.asPath === pathname
            ? "text-Accent font-bold underline"
            : "text-NeutralBlack font-semibold dark:text-NeutralWhite";
    };

    // Function to handle user logout
    function handleLogout() {
        // Clear the user's session or remove the cookie
        Cookie.remove("loggedInUser"); // Remove the user cookie
        // You may also need to sign the user out from your authentication provider
        // For Firebase, you can use `signOut` from the auth object
        signOut(auth)
            .then(() => {
                // Redirect the user to the login page or any other appropriate location
                router.push("/Auth"); // Replace "/login" with the actual login page route
            })
            .catch((error) => {
                console.error("Error during logout:", error);
            });
    }

    const [searchQuery, setSearchQuery] = useState("");
    // const { blogs } = useAppcontext(); // Access the blogs data from the context

    // Function to handle changes in the search input
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase()); // Convert the search query to lowercase for case-insensitive search
    };

    // Function to filter blogs based on the search query
    const filteredBlogs = blogs.filter((blog) => {
        if (!blog) return false; // Check if blog is defined
        const blogTitle = (blog.title || "").toLowerCase(); // Check if title is defined
        const blogSubtitle = (blog.subTitle || "").toLowerCase(); // Check if subTitle is defined
        const tags = (blog.tags || []).map((tag) => (tag || "").toLowerCase()); // Check if tags is defined

        return (
            blogTitle.includes(searchQuery) ||
            blogSubtitle.includes(searchQuery) ||
            tags.some((tag) => tag.includes(searchQuery))
        );
    });

    return (
        <div className='navbar h-8 sticky top-0 z-10 dark:bg-NeutralBlack dark:backdrop-blur-lg dark:bg-opacity-30 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b-slate-400'>
            <div className='navbar-start w-auto'>
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
                        className='menu menu-sm dropdown-content -ml-2 px-3 shadow w-screen mt-2 bg-Primary'
                    >
                        <li className={`py-1 ${isPageActive("/")}`}>
                            <Link className='text-lg' href='/'>
                                {t("Home")}
                            </Link>
                        </li>
                        <li className={`py-1 ${isPageActive("/blogs")}`}>
                            <Link className='text-lg' href='/blogs'>
                                {t("Blogs")}
                            </Link>
                        </li>
                        <li className={`py-1 ${isPageActive("/about")}`}>
                            <Link className='text-lg' href='/about'>
                                {t("About")}
                            </Link>
                        </li>
                        <li className={`py-1 ${isPageActive("/contact")}`}>
                            <Link className='text-lg' href='/contact'>
                                {t("Contact")}
                            </Link>
                        </li>
                        <div className='border-t-2 border-NeutralWhite pb-4'></div>
                        {/* Conditionally showing the login button or the profile menu for small screens */}
                        {isLogged ? (
                            <li>
                                <details
                                    open
                                    onToggle={(e) => e.preventDefault()}
                                >
                                    <summary
                                        className={`text-Accent text-lg font-bold underline font-poppins ${isPageActive(
                                            "/profile"
                                        )}`}
                                    >
                                        {user.name || "User"}
                                    </summary>
                                    <ul className='menu w-32 text-NeutralBlack font-medium font-poppins'>
                                        <li
                                            className={` ${isPageActive(
                                                "/Profile"
                                            )}`}
                                        >
                                            <Link
                                                className='text-base'
                                                href='/profile'
                                            >
                                                {t("Profile")}
                                            </Link>
                                        </li>
                                        <li
                                            className={` ${isPageActive(
                                                "/booking"
                                            )}`}
                                        >
                                            <Link
                                                className='text-base'
                                                href='/calendar'
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                {t("Appointments")}
                                            </Link>
                                        </li>
                                        <li
                                            className={` ${isPageActive(
                                                "/payment"
                                            )}`}
                                        >
                                            <Link
                                                className='text-base'
                                                href='/payment'
                                            >
                                                {t("Payments")}
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                className='text-base'
                                                onClick={handleLogout}
                                            >
                                                <BiLogOutCircle />
                                                {t("Log Out")}
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        ) : (
                            <li>
                                <button className='button-container w-32 mx-2 mb-1 h-9 md:mr-8 md:w-40 bg-Accent hover-bg-Primary rounded-md'>
                                    <Link
                                        href='/Auth'
                                        className='text-lg tracking-wider text-NeutralBlack font-semibold font-poppins'
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {t("Log In")}
                                    </Link>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                <div className='logo-container lg:px-6'>
                    <Link href='/'>
                        {darkMode ? ( // Conditionally render SVG for dark mode
                            <Image
                                src={darklogo}
                                alt='Dark Mode Logo'
                                width={120}
                                height={60}
                                layout='fixed'
                            />
                        ) : (
                            <Image
                                src={logo}
                                alt='Normal Logo'
                                width={120}
                                height={60}
                                layout='fixed'
                            />
                        )}
                    </Link>
                </div>
            </div>
            {/* Search bar */}
            <div className='flex justify-between ml-auto dropdown'>
                <div className='flex items-center'>
                    <div
                        className='search-icon mr-2'
                        onClick={handleSearchClick}
                    >
                        <PiMagnifyingGlass className='w-6 h-6 dark:fill-NeutralWhite' />
                    </div>
                    <div className={`search-bar${isSearchOpen ? " open" : ""}`}>
                        <input
                            type='text'
                            placeholder='Type here'
                            className='input input-bordered input-sm w-full'
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </div>

                {/* Add the "visible" class to enable the pop-in effect */}
                {searchQuery && filteredBlogs.length > 0 && (
                    <div className='search-results-dropdown visible absolute bg-NeutralWhite rounded-lg shadow-md z-10 w-full font-poppins pl-8'>
                        <ul className='p-2 dropdown-content z-[1] menu mt-6 shadow bg-base-100 rounded-md'>
                            {filteredBlogs.map((blog) => (
                                <li key={blog.id} className='hover:bg-Primary'>
                                    <Link href={`/blog/${blog.id}`}>
                                        {blog.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* Menu for large screen */}
                <div className='navbar-center mr-4 hidden lg:flex'>
                    <ul className='menu menu-horizontal'>
                        <li
                            className={`text-Accent font-semibold font-poppins text-base tracking-wider ${isPageActive(
                                "/"
                            )}`}
                        >
                            <Link href='/'>{t("Home")}</Link>
                        </li>
                        <li
                            className={`text-Accent font-semibold font-poppins text-base tracking-wider ${isPageActive(
                                "/blogs"
                            )}`}
                        >
                            <Link href='/blogs'>{t("Blogs")}</Link>
                        </li>
                        <li
                            className={`text-Accent font-semibold font-poppins text-base tracking-wider ${isPageActive(
                                "/about"
                            )}`}
                        >
                            <Link href='/about'>{t("About")}</Link>
                        </li>
                        <li
                            className={`text-Accent font-semibold font-poppins text-base tracking-wider ${isPageActive(
                                "/contact"
                            )}`}
                        >
                            <Link href='/contact'>{t("Contact")}</Link>
                        </li>
                        {isLogged ? (
                            <div className='dropdown dropdown-end dropdown-bottom'>
                                <div
                                    tabIndex={0}
                                    className='relative flex items-center'
                                >
                                    <div
                                        className='relative w-10 h-10 ml-2 rounded-full cursor-pointer'
                                        onClick={toggleUserMenu}
                                    >
                                        {user.photoURL ? (
                                            <div className='avatar '>
                                                <div className='w-10 rounded-full '>
                                                    <img
                                                        src={user.photoURL}
                                                        className='object-fill'
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-violet-400'>
                                                <span className='text-white text-xl'>
                                                    {user.name
                                                        ? user.name.charAt(0)
                                                        : "U"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <span
                                        className='cursor-pointer ml-2'
                                        onClick={toggleUserMenu}
                                    >
                                        {user.displayName}
                                    </span>
                                    <div className='menu-sm-dropdown'>
                                        {/* Conditionally showing the login button or the profile menu for large screens */}

                                        {userMenuOpen && (
                                            <ul className='dropdown-content z-[1] menu p-2 shadow bg-Accent rounded-md w-40 mt-1'>
                                                <li>
                                                    <Link href='/profile'>
                                                        {t("Profile")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href='/calendar'>
                                                        {t("Appointments")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href='/payment'>
                                                        {t("Payments")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a onClick={handleLogout}>
                                                        <BiLogOutCircle />
                                                        {t("Log Out")}
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button className='button-container w-28 h-9 mx-4 md:mr-2 md:w-40 bg-Accent dark:bg-Dark_Accent dark:hover:bg-Dark_Primary hover-bg-Primary rounded-md'>
                                <Link
                                    href='/Auth'
                                    className='text-base tracking-wider text-NeutralBlack dark:text-NeutralWhite font-semibold font-poppins'
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {t("Log In")}
                                </Link>
                            </button>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
