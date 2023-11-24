import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import ToggleButton from "./ToggleBtn";
import NewsletterSignUp from "../NewsletterSignUp/NewsletterSignUp";
import TranslationButton from "./TranslationButton";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");
    function emailChange(e) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    return (
        <footer className='px-10 py-5 bg-Accent dark:bg-Dark_Primary text-base-content flex flex-col md:flex-row lg:flex-row md:justify-between items-center'>
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between'>
                    <header className='font-bold mt-3 text-xl mb-[0.15rem] text-NeutralBlack dark:text-NeutralWhite'>
                        {t("Subscribe")}
                    </header>
                    <div className='flex md:hidden flex-row justify-end pt-1'>
                        <div className=' px-7 pt-2'>
                            <TranslationButton />{" "}
                        </div>
                        <ToggleButton />
                    </div>
                </div>
                <label className='label'>
                    <span className='label-text mb-[0.5rem] text-NeutralBlack dark:text-NeutralWhite'>
                        {t(
                            "We promise to never spam you, or share your email."
                        )}
                    </span>
                </label>
                <NewsletterSignUp />
            </div>
            <div className=' items-center flex flex-col justify-center h-full text-NeutralBlack dark:text-NeutralWhite'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <nav className='footer-title flex flex-wrap gap-4 justify-center  font-base my-4 text-NeutralBlack dark:text-NeutralWhite md:font-medium lg:font-medium '>
                        <Link
                            className='text-NeutralBlack dark:text-NeutralWhite'
                            href='/'
                        >
                            {t("Home")}
                        </Link>
                        <Link className=' ' href='../blogs'>
                            {t("Blogs")}
                        </Link>
                        <Link className=' ' href='../about'>
                            {t("About")}
                        </Link>
                        <Link className=' ' href='../contact'>
                            {t("Contact")}
                        </Link>
                        <Link className=' ' href='../careers'>
                            {t("Careers")}
                        </Link>
                    </nav>
                </div>
                <div className='flex flex-row'>
                    <div className='grid grid-flow-col gap-4 mt-5 md:mt-1 lg:mt-5 mx-4'>
                        <Link href='https://twitter.com/recodedofficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'>
                            <FaXTwitter className='text-3xl' />
                        </Link>
                        <Link href='https://www.facebook.com/recodedofficial/?locale=fr_FR'>
                            <FaFacebookSquare className='text-3xl' />
                        </Link>
                        <Link href='https://www.instagram.com/recodedofficial/'>
                            <FaInstagram className='text-3xl' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-row md:flex-col mx-4'>
                <div className='hidden md:flex flex-col md:flex-row justify-end pt-1'>
                    <div className=' px-7 pt-2'>
                        <TranslationButton />{" "}
                    </div>
                    <ToggleButton />
                </div>
                <p className='mt-6 text-center md:text-right text-NeutralBlack dark:text-NeutralWhite'>
                    {" "}
                    &copy; {new Date().getFullYear()}{" "}
                    {t("Hope Hub. All rights reserved.")}
                </p>
            </div>
        </footer>
    );
}

export default Footer;
