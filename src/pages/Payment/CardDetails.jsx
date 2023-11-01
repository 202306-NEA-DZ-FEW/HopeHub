// pages/CardDetails.js

import React from "react";

import PaymentFormII from "@/components/PaymentForm/PaymentFormII";

import Layout from "@/layout/Layout";

const CardDetailsPage = () => {
    return (
        <Layout>
            <div className='bg-cover bg-center bg-NeutralWhite w-full h-screen pt-10'>
                <h1 className='text-black font-poppins font-bold text-[25px]'>
                    Add Card Details
                </h1>
                <p>
                    Please make sure all of the info you enter are the same as
                    your card registration info.
                </p>

                <div className='flex flex-col gap-4 mt-6'>
                    <PaymentFormII />
                </div>
            </div>
        </Layout>
    );
};

export default CardDetailsPage;
