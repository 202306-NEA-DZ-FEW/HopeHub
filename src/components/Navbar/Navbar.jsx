import { signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { PiMagnifyingGlass } from "react-icons/pi";
import { TbVideo } from "react-icons/tb";
import { animated, useSpring } from "react-spring";

import { useAppcontext } from "@/context/state";
import { auth, db } from "@/util/firebase";

import placeholderImage from "../../../public/assets/AvatarPlaceHolder.svg";
import darklogo from "../../../public/assets/darklogo.svg";
import logo from "../../../public/assets/logo.svg";

export default function Navbar({ user }) {
    //Function used for translations
    const { t } = useTranslation("common");
    //Using variables from context to set up dark mode, router, and navbar changes once a user is logged in
    const { darkMode } = useAppcontext();
    const { isLogged, setIsLogged } = useAppcontext();

    const [visible, setVisible] = useState(true);
    const [profileMenuVisible, setProfileMenuVisible] = useState(true);

    //Defining blogs
    const [blogs, setBlogs] = useState([]);

    //Initializing the Next.js router
    const router = useRouter();

    //State variables to control the menu and search
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [textDirectionClass, setTextDirectionClass] = useState("ltr");

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
                router.push("/Auth");
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

    const handleMouseMove = (event) => {
        const threshold = 20; // Adjust this threshold to set how close to the top of the screen the mouse needs to be for the navbar to appear
        const posY = event.clientY;

        const shouldShowNavbar = posY <= threshold;
        setVisible(shouldShowNavbar);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 20; // Same threshold used for mousemove
            const posY = window.event.clientY;

            const shouldShowNavbar = posY <= threshold || window.scrollY < 400; // Adjust the scroll threshold as needed
            setVisible(shouldShowNavbar);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleVisibility = () => {
            const threshold = 230; // Adjust this threshold to set how close to the top of the screen the mouse needs to be for the navbar to appear
            const posY = window.event.clientY;

            const shouldShowNavbar = posY <= threshold || window.scrollY < 400; // Adjust the scroll threshold as needed
            setVisible(shouldShowNavbar);
        };

        window.addEventListener("scroll", handleVisibility);
        window.addEventListener("mousemove", handleVisibility);

        return () => {
            window.removeEventListener("scroll", handleVisibility);
            window.removeEventListener("mousemove", handleVisibility);
        };
    }, []);

    const navbarSpring = useSpring({
        top: visible ? "0px" : "-260px",
    });

    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const isSmallScreen = screenWidth <= 768;

    const AnimatedNav = animated.nav;

    return (
        <>
            {isSmallScreen ? (
                <nav className='navbar sticky h-8 top-0 z-10 dark:bg-NeutralBlack dark:backdrop-blur-lg dark:bg-opacity-30 bg-white backdrop-filter text-NeutralBlack dark:text-NeutralWhite backdrop-blur-lg bg-opacity-30 border-b-slate-400'>
                    <div className='navbar-start w-auto'>
                        <div className='dropdown '>
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
                                className='menu menu-sm dropdown-content -mx-2  px-3 shadow w-screen mt-2 bg-Primary dark:bg-Dark_Primary'
                            >
                                <li className={`py-1 ${isPageActive("/")}`}>
                                    <Link className='text-lg ' href='/'>
                                        {t("Home")}
                                    </Link>
                                </li>
                                <li
                                    className={`py-1 ${isPageActive("/blogs")}`}
                                >
                                    <Link className='text-lg' href='/blogs'>
                                        {t("Blogs")}
                                    </Link>
                                </li>
                                <li
                                    className={`py-1 ${isPageActive("/about")}`}
                                >
                                    <Link className='text-lg' href='/about'>
                                        {t("About")}
                                    </Link>
                                </li>
                                <li
                                    className={`py-1 ${isPageActive(
                                        "/contact"
                                    )}`}
                                >
                                    <Link className='text-lg' href='/contact'>
                                        {t("Contact")}
                                    </Link>
                                </li>
                                <div className='border-t-2 border-NeutralWhite pb-4 text-NeutralBlack dark:text-NeutralWhite'></div>
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
                                            <ul
                                                dir={
                                                    textDirectionClass === "rtl"
                                                        ? "rtl"
                                                        : "ltr"
                                                }
                                                className='menu text-NeutralBlack dark:text-NeutralWhite w-36 font-medium font-poppins'
                                            >
                                                <li>
                                                    <Link
                                                        href={`/profile?userid=${user.uid}`}
                                                    >
                                                        <FaRegUser />
                                                        {t("Profile")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`/calendar?userid=${user.uid}`}
                                                    >
                                                        <FaRegCalendarAlt />
                                                        {t("Calendar")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`/call?userid=${user.uid}`}
                                                    >
                                                        <TbVideo />
                                                        {t("Join Call")}
                                                    </Link>
                                                </li>
                                                {user.isTherapist ? (
                                                    <></>
                                                ) : (
                                                    <li>
                                                        <Link
                                                            href={`/tickets?userid=${user.uid}`}
                                                        >
                                                            <FaFileInvoiceDollar />
                                                            {t("Tickets")}
                                                        </Link>
                                                    </li>
                                                )}

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
                        <div className='flex justify-between items-center'>
                            <div className='logo-container flex lg:px-6'>
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

                            <div className='flex relative   items-center'>
                                <div
                                    className='search-icon mx-4'
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

                                {searchQuery && filteredBlogs.length > 0 && (
                                    <div className='search-results-dropdown  visible  rounded-lg z-10 w- font-poppins'>
                                        <ul className='p-2 dropdown-content absolute -ml-44 mt-6 text-xs z-[1] menu  shadow bg-base-100 rounded-md'>
                                            {filteredBlogs.map((blog) => (
                                                <li
                                                    key={blog.id}
                                                    className='hover:bg-Primary'
                                                >
                                                    <Link
                                                        href={`/blog/${blog.id}`}
                                                    >
                                                        {t(blog.title)}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            ) : (
                <AnimatedNav
                    style={{
                        ...navbarSpring,
                        position: "fixed",
                        width: "100%",
                        transition: "top 0.3s ease",
                        zIndex: 1000,
                    }}
                >
                    <div
                        dir={textDirectionClass === "rtl" ? "rtl" : "ltr"}
                        className='navbar sticky flex justify-between  h-8 top-0 z-10 dark:bg-NeutralBlack dark:backdrop-blur-lg dark:bg-opacity-30 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b-slate-400'
                    >
                        <div className='navbar-content flex justify-between items-center w-full px-6'>
                            {/* Content for larger screens */}
                            <div className='logo-container -ml-6 lg:px-6'>
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

                            <div className='navbar-menu flex'>
                                <div className='flex justify-end items-center'>
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
                                    </div>{" "}
                                </div>

                                {searchQuery && filteredBlogs.length > 0 && (
                                    <div className='search-results-dropdown visible absolute  rounded-lg z-10 w-1/3 font-poppins'>
                                        <ul className='p-2 dropdown-content z-[1] menu mt-12 shadow bg-base-100 rounded-md'>
                                            {filteredBlogs.map((blog) => (
                                                <li
                                                    key={blog.id}
                                                    className='hover:bg-Primary'
                                                >
                                                    <Link
                                                        href={`/blog/${blog.id}`}
                                                    >
                                                        {t(blog.title)}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className='navbar-center justify-end items-end mr-4 hidden lg:flex'>
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
                                            <Link href='/blogs'>
                                                {t("Blogs")}
                                            </Link>
                                        </li>
                                        <li
                                            className={`text-Accent font-semibold font-poppins text-base tracking-wider ${isPageActive(
                                                "/about"
                                            )}`}
                                        >
                                            <Link href='/about'>
                                                {t("About")}
                                            </Link>
                                        </li>
                                        <li
                                            className={`text-Accent font-semibold font-poppins text-base tracking-wider ${isPageActive(
                                                "/contact"
                                            )}`}
                                        >
                                            <Link href='/contact'>
                                                {t("Contact")}
                                            </Link>
                                        </li>
                                        {user ? (
                                            <div className='dropdown dropdown-end dropdown-bottom'>
                                                <div
                                                    tabIndex={0}
                                                    className='relative flex items-center'
                                                >
                                                    <div
                                                        className='relative w-10 h-10 ml-2  -mr-6 rounded-full cursor-pointer'
                                                        onClick={toggleUserMenu}
                                                    >
                                                        {user.photoURL ? (
                                                            <div className='avatar '>
                                                                <div className='w-10 rounded-full '>
                                                                    <Image
                                                                        alt={
                                                                            user.name
                                                                        }
                                                                        width={
                                                                            50
                                                                        }
                                                                        height={
                                                                            50
                                                                        }
                                                                        src={
                                                                            user.photoURL
                                                                        }
                                                                        className='object-fill'
                                                                    />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-Accent'>
                                                                <Image
                                                                    src={
                                                                        placeholderImage
                                                                    }
                                                                    alt='Placeholder'
                                                                    className='w-full h-full object-cover rounded-full'
                                                                />
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
                                                            <ul className='dropdown-content z-[1] menu p-2 shadow bg-Accent dark:bg-Dark_Primary text-NeutralBlack  dark:text-NeutralWhite rounded-md w-40 mt-0.5'>
                                                                <li>
                                                                    <Link
                                                                        href={`/profile?userid=${user.uid}`}
                                                                        className='hover:text-NeutralWhite'
                                                                    >
                                                                        <FaRegUser />

                                                                        {t(
                                                                            "Profile"
                                                                        )}
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={`/calendar?userid=${user.uid}`}
                                                                        className='hover:text-NeutralWhite'
                                                                    >
                                                                        <FaRegCalendarAlt />
                                                                        {t(
                                                                            "Calendar"
                                                                        )}
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={`/call?userid=${user.uid}`}
                                                                        className='hover:text-NeutralWhite'
                                                                    >
                                                                        <TbVideo />
                                                                        {t(
                                                                            "Join Call"
                                                                        )}
                                                                    </Link>
                                                                </li>
                                                                {user.isTherapist ? (
                                                                    <></>
                                                                ) : (
                                                                    <li>
                                                                        <Link
                                                                            href={`/tickets?userid=${user.uid}`}
                                                                        >
                                                                            <FaFileInvoiceDollar />
                                                                            {t(
                                                                                "Tickets"
                                                                            )}
                                                                        </Link>
                                                                    </li>
                                                                )}
                                                                <li>
                                                                    <a
                                                                        className='hover:text-NeutralWhite'
                                                                        onClick={
                                                                            handleLogout
                                                                        }
                                                                    >
                                                                        <BiLogOutCircle />
                                                                        {t(
                                                                            "Log Out"
                                                                        )}
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <button className='button-container w-28 h-9 mx-4 md:-mr-4 md:w-40 bg-Accent dark:bg-Dark_Accent dark:hover:bg-Dark_Primary hover-bg-Primary rounded-md'>
                                                <Link
                                                    href='/Auth'
                                                    className='text-base tracking-wider text-NeutralBlack dark:text-NeutralWhite font-semibold font-poppins'
                                                    style={{
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {t("Log In")}
                                                </Link>
                                            </button>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedNav>
            )}
        </>
    );
}
