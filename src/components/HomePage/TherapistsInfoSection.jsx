import React from "react";
import therapists from "../../../public/assets/therapists.svg";
import Image from "next/image";
import BookingButton from "../BookingButton/BookingButton";
import { useTranslation } from "next-i18next";

export default function () {
    //Function used for translations
    const { t } = useTranslation("common");

    //Displaying the therapists info section
    return (
        <div className='w-full bg-Primary'>
            <h1 className='mx-6 mt-4 mb-2 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 font-poppins uppercase font-black inline-block'>
                {t(
                    "Professional, licensed, and vetted therapists that you can trust."
                )}
            </h1>

            <div className='mx-6 w-64 md:w-96 lg:w-auto md:mx-9'>
                <Image
                    src={therapists}
                    alt='therapists'
                    width={500}
                    height={60}
                    layout='fixed'
                />
            </div>
            <p className='text-xs mx-6 my-4 md:text-xl md:mx-9 font-bold font-poppins'>
                {t(
                    "Tap to the world's largest network of licensed, accredited, and experienced therapists who can help you with a range of issues including depression, anxiety, relationships, trauma, grief, and more. with our therapists, you get the same professionalism and quality you would expect from an in-office therapist, but with the ability to communicate whenever and however you want."
                )}
            </p>

            {/* Adding the button for booking an appointment */}
            <div className='inset-0 flex items-end justify-end mx-6 md:mx-10 mb-6 sm:mx-20 lg:mx-10'>
                <BookingButton
                    destination='/booking'
                    buttonText='Book An Appointment'
                />
            </div>
        </div>
    );
}
