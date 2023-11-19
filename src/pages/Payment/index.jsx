import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import PaymentFormII from "@/components/PaymentForm/PaymentFormII";

import Layout from "@/layout/Layout";

import card from "../../../public/assets/Group 166.png";

const CardDetailsPage = () => {
    const { t } = useTranslation("common");

    return (
        <div className='bg-cover bg-NeutralWhite dark:bg-Dark_Accent bg-center  flex flex-col'>
            <Layout>
                <Head>
                    <title>{t("Payment")}</title>
                </Head>
                <div className=' flex flex-col ml-8 mr-10 my-12 '>
                    <h1 className='text-NeutralBlack dark:text-NeutralWhite font-poppins font-bold text-3xl'>
                        {t("Add Card Details")}
                    </h1>
                    <p className='text-NeutralBlack dark:text-NeutralWhite font-poppins  text-lg'>
                        {t(
                            "Please make sure all of the info you enter are the same as your card registration info."
                        )}
                    </p>
                    <div className='flex flex-col gap-4 md:justify-center mt-6 md:flex-row md:items-center'>
                        <div className='w-full lg:w-2/3 md:pr-6'>
                            <PaymentFormII />
                        </div>
                        <div className='w-full hidden lg:block md:w-fit md:pl-6 '>
                            <div className='h-full flex items-center justify-center -mt-4 dark:brightness-90'>
                                <Image
                                    src={card}
                                    alt='payment cards'
                                    width={300}
                                    height={150}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default CardDetailsPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
