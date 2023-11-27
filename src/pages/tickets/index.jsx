import { parse } from "cookie";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import TotalTickets from "@/components/StripePayment/TotalTickets";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";
import { auth } from "@/util/firebase";

import { CheckoutURL } from "../../util/CheckoutURL";
import BookingButton from "@/components/BookingButton/BookingButton";

const Tickets = ({ user }) => {
    const { t } = useTranslation("common");
    const [totalTickets, setTotalTickets] = useState(); // Track total tickets

    const router = useRouter();

    const ticketsNum = [5, 25, 50];
    const ticketsPrice = [10, 40, 70];
    const priceIds = [
        "price_1OAwiBBYW5nxWxJ3NuXZrMJJ",
        "price_1OAxH5BYW5nxWxJ3XkbeFPIe",
        "price_1OAxIoBYW5nxWxJ3SwluE4pQ",
    ];

    const handlePurchase = async (priceId, ticketsNum) => {
        try {
            // Set up the listener and wait for the checkout URL
            const url = await CheckoutURL(auth, priceId);

            // Redirect to Stripe Checkout
            window.location.replace(url);
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
                <div className='card-body flex flex-col items-center text-NeutralBlack dark:text-NeutralWhite'>
                    <h1 className='card-title text-xl md:text-3xl uppercase font-normal'>
                        {item} {t("Tickets")}
                    </h1>
                    <h1 className='text-NeutralBlack dark:text-NeutralWhite font-light text-base md:text-xl'>
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
                            />{" "}
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <Layout
            user={user}
            className=' dark:bg-Dark_Accent  bg-NeutralWhite text-NeutralBlack dark:text-NeutralWhite w-full font-poppins flex flex-col lg:pb-16'
        >
            <h1 className='mx-6 pt-12 mb-2 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 uppercase font-medium text-NeutralBlack dark:text-NeutralWhite '>
                {t("Purchase Tickets")}
            </h1>
            <h1 className='text-xs mx-6 md:text-xl md:mx-9 uppercase font-normal text-NeutralBlack dark:text-NeutralWhite '>
                {t("Purchase tickets that can be used to book appointments!")}
            </h1>
            <div className='flex flex-col items-center'>
                <div className='flex flex-wrap my-8 px-6 md:mx-28 lg:mx-2 justify-around w-full'>
                    {cards}
                </div>
            </div>
            <div className='pb-16 dark:bg-slate-800'>
                {user.totalTickets == 0 || user.totalTickets == undefined ? (
                    <h2 className='font-poppins text-2xl text-NeutralBlack dark:text-NeutralWhite px-10 pt-8 '>
                        {t("You currently have")} 0 {t("tickets")}.
                    </h2>
                ) : (
                    <h2 className='font-poppins text-2xl text-NeutralBlack dark:text-NeutralWhite px-10 pt-8 '>
                        {t("You currently have")} {user.totalTickets}{" "}
                        {t("tickets")}.
                    </h2>
                )}
                <h2 className='font-poppins  text-NeutralBlack dark:text-NeutralWhite px-10 py-4'>
                    {t(
                        "Every appointment costs 1 ticket, book an appointement now."
                    )}
                </h2>
                <div className='items center justify-center flex py-2'>
                    <BookingButton
                        destination={`/booking?userid=${user.uid}`}
                        buttonText='Book An Appointment'
                    />{" "}
                </div>{" "}
            </div>{" "}
        </Layout>
    );
};

export default Tickets;

// Server side function to fetch user data, and translations
export async function getServerSideProps({ locale, req }) {
    // Check if there is a logged-in user
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.loggedInUser;
    if (!userId || userId == "undefined") {
        return { redirect: { destination: "/Auth", permanent: false } };
    }
    try {
        if (userId) {
            // Fetch user data from Firestore based on user ID
            const userDoc = await getDoc(doc(db, "users", userId));

            if (!userDoc.exists()) {
                // Handle the case when the user with the specified ID is not found
                return { notFound: true };
            }

            // Extract user data from the document
            const user = userDoc.data();

            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                    user,
                },
            };
        } else {
            // User is not logged in
            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { props: { error: "Error fetching user data" } };
    }
}
