import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";
export default function BookingButton({ destination, buttonText }) {
    // Function used for translations
    const { t } = useTranslation("common");

    // Rendering the button with dynamic destination and text
    return (
        <div>
            <button
                className='w-64 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralBlack dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                data-testid='booking-button'
            >
                <Link
                    href={destination}
                    className='text-xs sm:text-base lg:text-xl text-NeutralBlack dark:text-NeutralWhite uppercase font-semibold font-poppins'
                >
                    {t(buttonText)}
                </Link>
            </button>
        </div>
    );
}
