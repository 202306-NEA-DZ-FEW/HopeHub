import React, { useState } from "react";
import Cookies from "js-cookie";
import { BsGlobe } from "react-icons/bs";

const TranslationButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeLanguage = (newLanguage) => {
        Cookies.set("userLanguage", newLanguage, { expires: 365 });
        window.location.reload();
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
                <ul className='dropdown menu py-2 bg-NeutralWhite rounded-md '>
                    <li>
                        <a
                            href='/en'
                            onClick={() => {
                                changeLanguage("en");
                                toggleDropdown();
                            }}
                            className='block px-3 py-2'
                        >
                            English
                        </a>
                    </li>
                    <li>
                        <a
                            href='/ar'
                            onClick={() => {
                                changeLanguage("ar");
                                toggleDropdown();
                            }}
                            className='block px-3 py-2'
                        >
                            العربية
                        </a>
                    </li>
                    <li>
                        <a
                            href='/fr'
                            onClick={() => {
                                changeLanguage("fr");
                                toggleDropdown();
                            }}
                            className='block px-3 py-2'
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
