import { signOut } from "firebase/auth";
import Cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useSpring, animated } from "react-spring";

import { useAppcontext } from "@/context/state";
import { auth, db } from "@/util/firebase";

import darklogo from "../../../public/assets/darklogo.svg";
import logo from "../../../public/assets/logo.svg";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Navbar({ user }) {
    //Function used for translations
    const { t } = useTranslation("common");
    //Using variables from context to set up dark mode, router, and navbar changes once a user is logged in
    const { darkMode } = useAppcontext();
    const { isLogged, setIsLogged } = useAppcontext();

    const [visible, setVisible] = useState(true);
    const [profileMenuVisible, setProfileMenuVisible] = useState(true);

    const handleMouseMove = (event) => {
        const posY = event.clientY || event.pageY;

        if (posY < 80 || window.pageYOffset === 0 || profileMenuVisible) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.pageYOffset < 400); // Adjust the threshold value here (e.g., 100 pixels)
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const navbarSpring = useSpring({
        top: visible ? "0px" : "-230px",
    });

    //Defining blogs
    const [blogs, setBlogs] = useState([]);

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

        signOut(auth)
            .then(() => {
                // Refresh the page and then redirect the user
                router.push("/Auth"); // Replace "/login" with the actual login page route
                window.location.href;
                setIsLogged(false);
            })
            .catch((error) => {
                console.error("Error during logout:", error);
            });
    }

    const [searchQuery, setSearchQuery] = useState("");

    // Function to handle changes in the search input
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase()); // Convert the search query to lowercase for case-insensitive search
    };

    // Function to fetch blog data from Firestore
    const fetchBlogsFromFirestore = async () => {
        try {
            const blogsCollection = collection(db, "blogs");
            const q = query(blogsCollection, orderBy("date", "desc"));
            const data = await getDocs(q);
            const blogData = data.docs.map((doc) => doc.data());
            setBlogs(blogData);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    // Function to filter blogs based on the search query
    const filterBlogs = (blogsData, query) => {
        return blogsData.filter((blog) => {
            if (!blog) return false;
            const blogTitle = (blog.title || "").toLowerCase();
            const blogSubtitle = (blog.subTitle || "").toLowerCase();
            const tags = (blog.tags || []).map((tag) =>
                (tag || "").toLowerCase()
            );

            return (
                blogTitle.includes(query) ||
                blogSubtitle.includes(query) ||
                tags.some((tag) => tag.includes(query))
            );
        });
    };

    useEffect(() => {
        fetchBlogsFromFirestore();
    }, []);

    const filteredBlogs = filterBlogs(blogs, searchQuery);

    return (
        <animated.nav
            style={{
                ...navbarSpring,
                position: "fixed",
                width: "100%",
                transition: "top 0.3s ease",
                zIndex: 1000, // Ensure Navbar is above other elements
            }}
        >
            <div className='navbar sticky h-8 top-0 z-10 dark:bg-NeutralBlack dark:backdrop-blur-lg dark:bg-opacity-30 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b-slate-400'>
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
                            {user ? (
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
                                            <li>
                                                <Link
                                                    href={`/Profile?userid=${user.uid}`}
                                                >
                                                    {t("Profile")}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/calendar?userid=${user.uid}`}
                                                >
                                                    {t("Calendar")}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`/Payment?userid=${user.uid}`}
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
                                            style={{
                                                textTransform: "capitalize",
                                            }}
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
                        <div
                            className={`search-bar${
                                isSearchOpen ? " open" : ""
                            }`}
                        >
                            <input
                                type='text'
                                placeholder='Type here'
                                className='input input-bordered input-sm w-full'
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </div>
                    </div>

                    {searchQuery && filteredBlogs.length > 0 && (
                        <div className='search-results-dropdown visible absolute bg-NeutralWhite rounded-lg shadow-md z-10 w-full font-poppins pl-8'>
                            <ul className='p-2 dropdown-content z-[1] menu mt-6 shadow bg-base-100 rounded-md'>
                                {filteredBlogs.map((blog) => (
                                    <li
                                        key={blog.id}
                                        className='hover:bg-Primary'
                                    >
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
                            {user ? (
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
                                                            ? user.name.charAt(
                                                                  0
                                                              )
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
                                        <div className='menu-sm-dropdown dropdown-hover'>
                                            {/* Conditionally showing the login button or the profile menu for large screens */}

                                            {userMenuOpen && (
                                                <ul className='dropdown-content z-[1] menu p-2 shadow bg-Accent rounded-md w-40 mt-0.5'>
                                                    <li>
                                                        <Link
                                                            href={`/Profile?userid=${user.uid}`}
                                                        >
                                                            {t("Profile")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href={`/calendar?userid=${user.uid}`}
                                                        >
                                                            {t("Calendar")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href={`/Payments?userid=${user.uid}`}
                                                        >
                                                            {t("Payments")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={
                                                                handleLogout
                                                            }
                                                        >
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
        </animated.nav>
    );
}
