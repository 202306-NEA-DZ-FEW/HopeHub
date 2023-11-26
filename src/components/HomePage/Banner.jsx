import Image from "next/image";
import { useTranslation } from "next-i18next";
import React from "react";

import BookingButton from "../BookingButton/BookingButton";
import IndexBanner from "../../../public/assets/indexBanner.jpg";
import { useSpring, animated } from "react-spring";

export default function Banner({ user }) {
    //Function used for translations
    const { t } = useTranslation("common");

    const fadeInProps = useSpring({
        from: { opacity: 0, transform: "translateY(50px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: { duration: 1000 },
    });

    //Displaying the Homepage Banner
    return (
        <div className='Banner-container top-0 relative dark:brightness-75 -mt-20 md:-mt-20'>
            <Image
                src={IndexBanner}
                alt='Photo by Taryn Elliott: https://www.pexels.com/photo/couple-with-hands-apart-8204503/'
                width='screen'
                height='screen'
                layout='fixed'
            />

            <div className='flex mx-7 pr-3 inset-0 items-center absolute'>
                <animated.h1
                    className='text-lg px-3 mb-2 sm:text-4xl sm:mb-32 sm:ml-8 lg:text-6xl lg:mb-48 lg:ml-0 font-poppins font-semibold text-NeutralBlack'
                    style={fadeInProps}
                >
                    {t("WE ARE HERE TO")}
                </animated.h1>
                <animated.h1
                    className='text-2xl  mb-2 sm:text-6xl sm:mb-32 lg:text-8xl lg:mb-48  text-violet-400 font-aclonica font-semibold custom-text-shadow'
                    style={fadeInProps}
                >
                    {t("HELP")}
                </animated.h1>
            </div>

            {/* Adding the button for booking an appointment */}
            <div className='absolute inset-0 flex items-end justify-end mx-6 md:mx-10 mb-6 sm:m-20 lg:mx-10 lg:mb-32'>
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
