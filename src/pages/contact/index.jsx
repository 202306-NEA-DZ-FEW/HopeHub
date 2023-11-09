import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";

import ContactForm from "@/components/ContactForm/ContactForm";

import Layout from "@/layout/Layout";

function Contact() {
    const { t } = useTranslation("common");

    return (
        <div
            className='bg-cover bg-center bg-no-repeat brightness-75 flex flex-col'
            style={{
                backgroundImage: `url('/assets/login-bg.svg')`, // Replace with the actual path to your image
            }}
        >
            <Layout>
                <div className='flex flex-col ml-8 mr-10 lg:mb-24 my-12'>
                    <h1 className='text-NeutralBlack  font-semibold font-poppins text-2xl md:text-3xl lg:py-0 lg:mb-3 py-4'>
                        {t("SEND US YOUR REQUEST!")}
                    </h1>
                    <p className='text-NeutralBlack font-normal font-poppins lg:mb-14 text-sm md:text-lg mb-4'>
                        {t(
                            "Do you have a question, concern, idea, feedback, or problem? If you need assistance, please fill out the form below, and we'd be happy to help!"
                        )}
                    </p>

                    <div className='flex flex-col justify-center ml-auto mr-auto py-2 bg-gray-200 dark:bg-Dark_Primary shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] w-10/12 h-full p-6'>
                        <div className='flex flex-col lg:mb-0 md:flex-row md:mb-6'>
                            <ContactForm className='w-full' />
                            {/* Small card at the right bottom for "Find Us At" */}
                            <div className='flex justify-center md:w-8/12 lg:w-9/12 xl:w-6/12 max-w-6xl my-6 lg:p-3'>
                                <div className='card bg-Primary dark:bg-Dark_Primary w-full md:h-5/6 lg:h-max rounded mx-1 md:mt-auto md:mb-12 lg:mb-9'>
                                    <div className='card-bod py-6 px-9'>
                                        <h2 className='card-title text-NeutralBlack dark:text-NeutralWhite font-poppins font-medium text-xl lg:text-xl'>
                                            <FaLocationDot />
                                            {t("Find Us At")}
                                        </h2>
                                        <p className='text-NeutralBlack dark:text-NeutralWhite font-poppins font-normal text-sm lg:text-lg md:my-4 lg:my-2.5'>
                                            {t("Nergiz Plaza")}
                                            <br />
                                            {t("3rd Floor")}
                                            <br />
                                            {t("Bakhtiyari Street 40m")} <br />
                                            {t("Algiers, Algeria")} <br />
                                            {t("44001")}
                                        </p>
                                        <h2 className='card-title text-NeutralBlack dark:text-NeutralWhite font-poppins font-medium text-xl lg:text-xl mt-4'>
                                            <FaPhoneVolume />
                                            {t("Call Us At")}
                                        </h2>
                                        <p className='text-NeutralBlack dark:text-NeutralWhite font-poppins font-normal text-sm lg:text-lg my-4'>
                                            +213 213 213 213
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Contact;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}