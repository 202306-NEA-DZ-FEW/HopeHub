import React from "react";
import { useTranslation } from "next-i18next";
import ContactForm from "@/components/ContactForm/ContactForm";
import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";

function Contact() {
    const { t } = useTranslation("common");

    return (
        <div
            className='bg-cover bg-center bg-no-repeat flex flex-col'
            style={{
                backgroundImage: `url('/assets/login-bg.svg')`, // Replace with the actual path to your image
            }}
        >
            <Layout>
                <div className='flex flex-col ml-8 mr-10 my-12'>
                    <h1 className='text-NeutralBlack font-extrabold font-poppins text-xl md:text-3xl py-4'>
                        {t("SEND US YOUR REQUEST!")}
                    </h1>
                    <p className='text-NeutralBlack font-semibold font-poppins text-sm md:text-lg mb-4'>
                        {t(
                            "Do you have a question, concern, idea, feedback, or problem? If you need assistance, please fill out the form below, and we'd be happy to help!"
                        )}
                    </p>

                    <div className='flex flex-col justify-center ml-auto mr-auto py-2  bg-gray-200 bg-opacity-50 w-10/12 h-full p-6'>
                        <div className='flex flex-col md:flex-row md:mb-6'>
                            <ContactForm className='w-full' />
                            {/* Small card at the right bottom for "Find Us At" */}
                            <div className='flex justify-center md:w-8/12 lg:w-9/12 xl:w-6/12 max-w-6xl my-6 lg:p-4'>
                                <div className='card bg-Primary w-full md:h-5/6 lg:h-auto rounded mx-1 md:mt-auto md:mb-12 lg:mb-8'>
                                    <div className='card-bod py-5 px-9'>
                                        <h2 className='card-title text-NeutralBlack font-poppins font-extrabold text-xl lg:text-2xl'>
                                            <FaLocationDot />
                                            {t("Find Us At")}
                                        </h2>
                                        <p className='text-NeutralBlack font-poppins font-semibold text-sm lg:text-lg md:my-4 lg:my-2.5'>
                                            {t("Nergiz Plaza")}
                                            <br />
                                            {t("3rd Floor")}
                                            <br />
                                            {t("Bakhtiyari Street 40m")} <br />
                                            {t("Algiers, Algeria")} <br />
                                            {t("44001")}
                                        </p>
                                        <h2 className='card-title text-NeutralBlack font-poppins font-extrabold text-xl lg:text-2xl mt-4'>
                                            <FaPhoneVolume />
                                            {t("Call Us At")}
                                        </h2>
                                        <p className='text-NeutralBlack font-poppins font-semibold text-sm lg:text-lg my-4'>
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
