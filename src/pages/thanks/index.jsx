import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import Layout from "@/layout/Layout";

function Thanks() {
    const query = useSearchParams();
    const from = query.get("from");
    const { t } = useTranslation("common");

    let background, text;

    switch (from) {
        case "Auth":
            background = "/assets/thank-bg-1.svg";
            text = t(
                "Thank you for taking the first step towards well-being! We're honored to be part of your mental health journey, and our team is here to support you every step of the way."
            );
            break;
        case "contact":
            background = "/assets/thank-bg-2.svg";
            text = t(
                "Thank you for reaching out to us! We appreciate your message and will get back to you as soon as possible. Your interest means a lot to us, and we look forward to assisting you on your journey to well-being."
            );
            break;
        case "booking":
            background = "/assets/thank-bg-2.svg";
            text = t(
                "Thank you for scheduling an appointment with us! We look forward to supporting you on your path to mental wellness."
            );
            break;

        default:
            background = "/assets/thank-bg-2.svg";
            text = t(
                "Thank you for choosing our online therapy services! We're here to support you on your journey to well-being."
            );
    }

    return (
        <Layout>
            <main
                className='h-fit -mt-16 py-48 px-20 flex flex-col items-center bg-no-repeat bg-cover text-NeutralWhite dark:text-NeutralBlack font-poppins'
                style={{
                    backgroundImage: `url(${background})`,
                }}
            >
                <h1 className='text-7xl font-poppins font-extrabold text-NeutralWhite dark:text-NeutralBlack w-full text-left'>
                    {t("Thank you")}
                </h1>
                <p className='font-medium text-2xl text-NeutralWhite dark:text-NeutralBlack w-full py-5'>
                    {text}
                </p>
                <Link
                    href='/'
                    className='btn ml-auto font-poppins border-none font-medium text-2xl bg-Accent text-NeutralBlack dark:text-NeutralWhite  dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    {t("Back to Home")}
                </Link>
            </main>
        </Layout>
    );
}

export default Thanks;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
