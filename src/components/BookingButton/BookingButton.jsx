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
                className='w-28 md:w-72 h-10 rounded-md text-xs sm:text-base lg:text-xl font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite uppercase   dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                data-testid='booking-button'
            >
                <Link href={destination}>{t(buttonText)}</Link>
            </button>
        </div>
    );
}
