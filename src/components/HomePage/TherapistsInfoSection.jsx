import Image from "next/image";
import { useTranslation } from "next-i18next";
import React from "react";

import { useAppcontext } from "@/context/state";

import BookingButton from "../BookingButton/BookingButton";
import therapists from "../../../public/assets/therapists.svg";

export default function TherapistsInfoSection({ user }) {
    //Function used for translations
    const { t } = useTranslation("common");

    //Displaying the therapists info section
    return (
        <div className='w-full py-4 bg-Primary dark:bg-Dark_Primary lg:pb-4'>
            <h1 className='mx-6 mb-2 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 font-poppins uppercase font-medium inline-block text-NeutralBlack dark:text-NeutralWhite '>
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
            <p className='text-xs mx-6 my-4 md:text-xl md:mx-9 font-normal text-NeutralBlack dark:text-NeutralWhite font-poppins'>
                {t(
                    "Tap to the world's largest network of licensed, accredited, and experienced therapists who can help you with a range of issues including depression, anxiety, relationships, trauma, grief, and more. with our therapists, you get the same professionalism and quality you would expect from an in-office therapist, but with the ability to communicate whenever and however you want."
                )}
            </p>

            {/* Adding the button for booking an appointment */}
            <div className='inset-0 flex items-end justify-end my-2 md:my-8 mx-6 md:mx-10 mb-6 sm:mx-20 lg:mx-10'>
                <BookingButton
                    destination={
                        user !== undefined && user.isTherapist
                            ? `/call?userid=${user.uid}` // If user is a therapist, go to call page
                            : user !== undefined
                            ? `/booking?userid=${user.uid}` // If user is a patient, go to booking page
                            : "/Auth" // If user is not identified, redirect to auth
                    }
                    buttonText={
                        user !== undefined && user.isTherapist
                            ? "Join Call" // If user is a therapist, show 'Join Call'
                            : user !== undefined
                            ? "Book An Appointment" // If user is a patient, show 'Book An Appointment'
                            : "Book An Appointment"
                    }
                />
            </div>
        </div>
    );
}
