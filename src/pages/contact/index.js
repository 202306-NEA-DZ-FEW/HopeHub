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
                backgroundImage: `url('/assets/Background.png')`, // Replace with the actual path to your image
            }}
        >
            <Layout>
                <div className='flex flex-col ml-8 mr-10 my-12'>
                    <h1 className='text-NeutralBlack font-extrabold font-poppins text-xl md:text-3xl py-4'>
                        {t("SEND US YOUR REQUEST!")}
                    </h1>
                    <div
                        className='flex flex-col
                     py-2  bg-gray-200 bg-opacity-50 w-full  h-full p-6'
                    >
                        <div className='p-4'>
                            <p className='text-NeutralBlack font-semibold font-poppins text-sm md:text-lg'>
                                {t(
                                    "Do you have a question, concern, idea, feedback, or problem? If you need assistance, please fill out the form below, and we'd be happy to help!"
                                )}
                            </p>
                        </div>
                        <div className='flex flex-col md:flex-row md:mb-6'>
                            <ContactForm className='w-full' />
                            {/* Small card at the right bottom for "Find Us At" */}
                            <div className='flex justify-center md:w-9/12 lg:w-full max-w-6xl my-2.5 lg:p-4'>
                                <div className='card bg-Primary w-full md:h-5/6 rounded mx-1 md:mt-auto md:mb-12'>
                                    <div className='card-bod p-8'>
                                        <h2 className='card-title text-NeutralBlack font-poppins font-extrabold lg:text-3xl'>
                                            <FaLocationDot />
                                            {t("Find Us At")}
                                        </h2>
                                        <p className='text-NeutralBlack font-poppins font-semibold my-4'>
                                            {t("Nergiz Plaza")}
                                            <br />
                                            {t("Bakhtiyari Street 40m")} <br />
                                            {t("44001")}
                                        </p>
                                        <h2 className='card-title text-NeutralBlack font-poppins font-extrabold lg:text-3xl mt-9'>
                                            <FaPhoneVolume />
                                            {t("Call Us At")}
                                        </h2>
                                        <p className='text-NeutralBlack font-poppins font-semibold my-4'>
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
