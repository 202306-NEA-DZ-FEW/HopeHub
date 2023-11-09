import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

export default function PurchasingSection() {
    //Function used for translations
    const { t } = useTranslation("common");

    //Arrays for the different info displayed in each card
    const ticketsNum = [5, 25, 50];
    const ticketsPrice = [10, 40, 70];

    //Mapping over the arrays to create the cards
    const cards = ticketsNum.map((item, index) => {
        return (
            <div
                key={index}
                className=' card flex flex-col items-center my-2 p-3 md:px-5 border-2 rounded-xl shadow-xl w-48 h-58 md:w-64 md:h-60 lg:w-96 lg:h-60 lg:m-6'
            >
                <div className='card-body flex flex-col items-center'>
                    <h1 className='card-title text-xl md:text-3xl uppercase font-normal'>
                        {item} {t("Tickets")}
                    </h1>
                    <h1 className='text-gray-500 font-light text-base md:text-xl'>
                        ${ticketsPrice[index]}
                    </h1>
                    <div className='card-actions justify-end md:mt-4'>
                        <Link href='/buyticket/'>
                            <button className='btn font-poppins dark:bg-slate-800 dark:text-NeutralWhite dark:hover:bg-slate-500 font-normal bg-Accent hover:bg-Primary'>
                                {t("Purchase")}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    });

    //Displaying the cards and the section title
    return (
        <div className=' dark:bg-Dark_Neutral dark:text-NeutralWhite bg-BgWhite text-NeutralBlack w-full font-poppins flex flex-col pb-8'>
            <h1 className='mx-6 mt-4 mb-2 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 uppercase font-medium'>
                {t("Purchase")} {t("Tickets")}
            </h1>
            <h1 className='text-xs mx-6  md:text-xl md:mx-9 uppercase font-normal'>
                {t("Purchase tickets that can be used to book appointments!")}
            </h1>
            <div className='flex flex-col items-center'>
                <div className='flex flex-wrap my-8 mx-2 md:mx-28 lg:mx-2 justify-around w-full'>
                    {cards}
                </div>
                <div className='card items-center my-2 border-2 rounded-xl shadow-xl w-10/12 h-auto'>
                    <div className='card-body items-center'>
                        <h1 className='card-title my-2 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 uppercase text-center font-normal'>
                            {t("Are you a counselor?")}
                        </h1>
                        <p className='text-xs my-2 md:text-2xl md:mx-9 text-center font-light'>
                            {t(
                                "Interested in joining our mental health platform? You decide your schedule and how much you want to work, we’ll take care of the client referrals and billing details!"
                            )}
                        </p>
                        <div className='card-actions justify-around'>
                            <Link href='/requirement'>
                                <button className='btn font-normal dark:bg-slate-800 dark:text-NeutralWhite dark:hover:bg-slate-500 bg-Accent hover:bg-Primary my-2'>
                                    {t("Learn More")}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
