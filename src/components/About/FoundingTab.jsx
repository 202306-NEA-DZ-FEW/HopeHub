import { useSpring, animated } from "react-spring";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import React from "react";
import { useAppcontext } from "@/context/state";

const FoundingCard = () => {
    const { t } = useTranslation("common");
    const [fadeIn, setFadeIn] = useState(false);
    const { darkMode } = useAppcontext();

    const fadeInProps = useSpring({
        opacity: fadeIn ? 1 : 0,
        from: { opacity: 0 },
    });

    useEffect(() => {
        // Trigger the fade-in effect after mounting
        setFadeIn(true);
        // Simulating the dark mode change
        setTimeout(() => {}, 1000);
    }, []);

    // Define different images for light and dark modes
    const lightImage = "/assets/Group182.png";
    const darkImage = "/assets/Group181.png";

    // Choose the image based on the dark mode state
    const selectedImage = darkMode ? darkImage : lightImage;

    return (
        <animated.div style={fadeInProps} className='card mt-12'>
            <div>
                <div className='flex flex-wrap lg:flex-nowrap lg:w-[80%] lg:h-[20%] lg:mx-auto px-100 justify-center'>
                    <Image
                        src={selectedImage}
                        alt='Founder'
                        width={380}
                        height={200}
                        className=' lg:pb-12 px-8 rounded-md'
                    />
                    <div className='mx-6 lg:mb-10'>
                        <p className='text-NeutralBlack dark:text-NeutralWhite text-xl md:text-4xl lg:text-[1.32rem] font-poppins text-justify indent-4 px-6 py-6 lg:py-0 leading-relaxed'>
                            {t(
                                "HopeHub was founded by a group of Re:coded students in 2023. It was called HopeHub Online and started as a blog and an online community where approved therapists shared their research and ideas. We launched the Beginners Guide to Therapy and our first study, and that hub of industry expertise transformed into a small consulting firm and led us to create the Online Therapist of today!"
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </animated.div>
    );
};

export default FoundingCard;
