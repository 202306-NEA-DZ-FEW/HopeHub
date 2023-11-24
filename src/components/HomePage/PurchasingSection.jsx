import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import { useAppcontext } from "@/context/state";
import { auth } from "@/util/firebase";

import { CheckoutURL } from "../../components/StripePayment/CheckoutURL";
import TotalTickets from "../StripePayment/TotalTickets";
import { Slide, toast } from "react-toastify";

const PurchasingSection = ({ user }) => {
    const [totalTickets, setTotalTickets] = useState(); // Track total tickets

    const { t } = useTranslation("common");
    const router = useRouter();
    const { isLogged } = useAppcontext();

    const ticketsNum = [5, 25, 50];
    const ticketsPrice = [10, 40, 70];
    const priceIds = [
        "price_1OAwiBBYW5nxWxJ3NuXZrMJJ",
        "price_1OAxH5BYW5nxWxJ3XkbeFPIe",
        "price_1OAxIoBYW5nxWxJ3SwluE4pQ",
    ];

    const handlePurchase = async (priceId, ticketsNum) => {
        try {
            // If there is no user, redirect to /Auth
            if (isLogged != true) {
                window.location.replace("/Auth");
                return;
            } else if (user.isTherapist == true) {
                console.log("helooooooooo");
                toast.error("Can't purchase tickets as a therapist!", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 2500,
                    transition: Slide,
                    className:
                        "dark:bg-slate-800 dark:text-NeutralWhite text-NeutralBlack bg-NeutralWhite",
                });
            } else {
                // Set up the listener and wait for the checkout URL
                const url = await CheckoutURL(auth, priceId);

                // Redirect to Stripe Checkout
                window.location.replace(url);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const cards = ticketsNum.map((item, index) => {
        return (
            <div
                key={index}
                className=' card flex flex-col items-center my-2 p-3 md:px-5 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-xl w-48 h-58 md:w-64 md:h-60 lg:w-[23rem] lg:h-60 lg:m-6'
            >
                <div className='card-body flex flex-col items-center'>
                    <h1 className='card-title text-xl md:text-3xl uppercase font-normal'>
                        {item} {t("Tickets")}
                    </h1>
                    <h1 className='text-gray-500 font-light text-base md:text-xl  '>
                        ${ticketsPrice[index]}
                    </h1>
                    <div className='card-actions justify-end md:mt-4'>
                        <button
                            onClick={() => handlePurchase(priceIds[index])}
                            className='w-36 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                        >
                            {t("Purchase")}
                        </button>
                        <div className='hidden'>
                            <TotalTickets
                                user={user}
                                setTotalTickets={setTotalTickets}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className=' dark:bg-Dark_Accent dark:text-NeutralWhite  bg-NeutralWhite text-NeutralBlack  w-full font-poppins flex flex-col lg:pb-16'>
            <h1 className='mx-6 mt-6 mb-2 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 uppercase font-medium'>
                {t("Purchase Tickets")}
            </h1>
            <h1 className='text-base mx-6 md:text-xl md:mx-9 uppercase font-normal'>
                {t("Purchase tickets that can be used to book appointments!")}
            </h1>
            <div className='flex flex-col items-center mb-10 lg:mb-0'>
                <div className='flex flex-wrap my-8 px-6 md:mx-28 lg:mx-2 justify-around w-full'>
                    {cards}
                </div>
                <div className='card items-center my-2 rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] w-10/12 h-auto'>
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
                                <button className='w-36 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'>
                                    {t("Learn More")}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasingSection;
