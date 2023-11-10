import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { BsGlobe } from "react-icons/bs";

const TranslationButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n } = useTranslation();
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeLanguage = (newLanguage) => {
        Cookies.set("userLanguage", newLanguage, { expires: 365 });
        i18n.changeLanguage(newLanguage);
        // window.location.reload();
    };

    return (
        <div className='relative inline-block text-base rounded-md'>
            <button
                onClick={toggleDropdown}
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                aria-label='Select Language'
            >
                <BsGlobe className='inline-block w-5 h-5 mr-2' />
            </button>
            <div
                className='absolute bottom-10 w-36'
                style={{ display: isOpen ? "block" : "none" }}
            >
                <ul className='dropdown menu py-2 bg-NeutralWhite dark:bg-Dark_Primary rounded-md '>
                    <li>
                        <a
                            href='/en'
                            onClick={(e) => {
                                e.preventDefault();
                                changeLanguage("en");
                                toggleDropdown();
                            }}
                            className='block px-3 py-2 text-NeutralBlack dark:text-NeutralWhite '
                        >
                            English
                        </a>
                    </li>
                    <li>
                        <a
                            href='/ar'
                            onClick={(e) => {
                                e.preventDefault();
                                changeLanguage("ar");
                                toggleDropdown();
                            }}
                            className='block px-3 py-2 text-NeutralBlack dark:text-NeutralWhite'
                        >
                            العربية
                        </a>
                    </li>
                    <li>
                        <a
                            href='/fr'
                            onClick={(e) => {
                                e.preventDefault();
                                changeLanguage("fr");
                                toggleDropdown();
                            }}
                            className='block px-3 py-2 text-NeutralBlack dark:text-NeutralWhite'
                        >
                            French
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TranslationButton;
