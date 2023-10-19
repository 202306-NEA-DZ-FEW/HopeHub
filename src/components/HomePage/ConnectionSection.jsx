import React from "react";
import {
    BsTelephoneForward,
    BsChatLeftText,
    BsCameraVideo,
} from "react-icons/bs";
import { useTranslation } from "next-i18next";

export default function ConnectionSection() {
    //Function used for translations
    const { t } = useTranslation("common");

    //Arrays for the different info displayed in each card
    const title = ["Voice Call", "Chat", "Video Call"];
    const description = [
        "Feeling ready to start a conversation? Give your therapist a voice call and talk your heart out!",
        "Need to talk to someone? Come have a chat with your therapist!",
        "For a better experience therapists recommend video calls, but always remember that it's your choice!",
    ];
    const icons = [BsTelephoneForward, BsChatLeftText, BsCameraVideo];

    //Mapping over the arrays to create the cards
    const cards = title.map((item, index) => {
        const IconComponent = icons[index];
        return (
            <div
                key={index}
                className='card flex flex-col items-center my-2 p-3 md:px-5 border-2 rounded-xl shadow-xl w-48 h-58 md:w-64 md:h-60 lg:w-96 lg:h-60'
            >
                <div className='my-2 lg:my-6'>
                    <IconComponent className='text-3xl md:text-5xl' />
                </div>
                <h3 className='text-lg md:text-xl lg:text-2xl font-poppins font-extrabold text-teal-600'>
                    {t(item)}
                </h3>
                <p className='text-xs md:text-base lg:text-base text-center m-2 font-poppins font-bold'>
                    {t(description[index])}
                </p>
            </div>
        );
    });

    //Displaying the cards and the section title
    return (
        <div className='bg-BgWhite w-full pb-6'>
            <h1 className='text-base mx-6 my-2 md:mx-9 mt-8 mb-2 md:mb-4 md:text-3xl md:mt-10 lg:mx-9 font-poppins uppercase font-extrabold inline-block'>
                {t("Connect with us through")}
            </h1>
            <div className='flex flex-wrap my-2 mx-6 md:mx-28 lg:mx-2 justify-around'>
                {cards}
            </div>
        </div>
    );
}
