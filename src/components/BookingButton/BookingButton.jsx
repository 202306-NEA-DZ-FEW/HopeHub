import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function BookingButton() {
    //Function used for translations
    const { t } = useTranslation("common");

    //Rendering the button that leads to booking
    return (
        <div>
            <button
                className='button-container bg-Accent dark:bg-Dark_Accent rounded-md w-36 h-7 sm:w-52 sm:h-12 lg:w-64 lg:h-14 hover:bg-NeutralWhite dark:hover:bg-NeutralBlack'
                data-testid='booking-button'
            >
                <Link
                    href='/booking'
                    className='text-xs sm:text-base lg:text-xl text-NeutralBlack dark:text-NeutralWhite uppercase font-normal font-poppins'
                >
                    {t("Book An Appointement")}
                </Link>
            </button>
        </div>
    );
}
