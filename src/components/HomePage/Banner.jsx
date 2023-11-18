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
        <div className='Banner-container top-0 relative dark:brightness-75 -mt-24'>
            <Image
                src={IndexBanner}
                alt='Photo by Taryn Elliott: https://www.pexels.com/photo/couple-with-hands-apart-8204503/'
                width='screen'
                height='screen'
                layout='fixed'
            />

            <div className='flex inset-0 items-center absolute'>
                <animated.h1
                    className='text-lg ml-6 mb-2 sm:text-4xl sm:mb-32 sm:ml-8 lg:text-6xl lg:mb-48 lg:ml-8 font-poppins font-semibold text-NeutralBlack'
                    style={fadeInProps}
                >
                    WE ARE HERE TO
                </animated.h1>
                <animated.h1
                    className='text-2xl px-1 mb-2 sm:text-6xl sm:mb-32 lg:text-8xl lg:mb-48 lg:px-3 text-violet-400 font-aclonica font-semibold custom-text-shadow'
                    style={fadeInProps}
                >
                    HELP
                </animated.h1>
            </div>

            {/* Adding the button for booking an appointment */}
            <div className='absolute inset-0 flex items-end justify-end mx-6 md:mx-10 mb-6 sm:m-20 lg:mx-10 lg:mb-32'>
                <BookingButton
                    destination={
                        user !== undefined
                            ? `/booking?userid=${user.uid}`
                            : "/Auth"
                    }
                    buttonText='Book An Appointment'
                />
            </div>
        </div>
    );
}
