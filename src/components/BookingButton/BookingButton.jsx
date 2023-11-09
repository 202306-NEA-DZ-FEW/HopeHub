import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function BookingButton({ destination, buttonText }) {
    // Function used for translations
    const { t } = useTranslation("common");

    // Rendering the button with dynamic destination and text
    return (
        <div>
            <button
                className='button-container bg-Accent dark:bg-Dark_Accent rounded-md w-36 h-14 sm:w-52 sm:h-12 lg:w-64 lg:h-14 hover:bg-NeutralWhite'
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
