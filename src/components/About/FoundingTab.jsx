import Image from "next/image";
import { useTranslation } from "next-i18next";
import React from "react";

import Founding from "../../../public/assets/Our-Founding.png";
const FoundingCard = () => {
    const { t } = useTranslation("common");
    return (
        <div className='card mt-12'>
            <div>
                <div className='flex flex-wrap lg:flex-nowrap lg:w-[80%] lg:h-[15%] lg:mx-auto px-100 justify-center'>
                    <Image
                        src={Founding}
                        alt='Founder'
                        width={400}
                        height={10}
                        className='w-[30%] pb-12 rounded-md'
                    />
                    <div className='mx-6 lg:mb-10 '>
                        <p className='text-NeutralBlack lg:text-[1.32rem] font-poppins text-justify indent-8 leading-relaxed'>
                            {t(
                                "HopeHub was founded by a group of Re:coded students in 2023. It was called HopeHub Online and started as a blog and an online community where approved therapists shared their research and ideas. We launched the Beginners Guide to Therapy and our first study, and that hub of industry expertise transformed into a small consulting firm and led us to create the Online Therapist of today!"
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoundingCard;
