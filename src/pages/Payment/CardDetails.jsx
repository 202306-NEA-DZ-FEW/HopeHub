// pages/CardDetails.js

import React from "react";

import PaymentForm from "@/components/PaymentForm/PaymentForm";

import Layout from "@/layout/Layout";

const CardDetailsPage = () => {
    return (
        <Layout>
            <div className='bg-cover bg-center bg-NeutralWhite flex flex-col'>
                <h1>Add Card Details</h1>
                <p>
                    Please make sure all of the info you enter are the same as
                    your card registration info.
                </p>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'></div>
                    <PaymentForm />
                </div>
            </div>
        </Layout>
    );
};

export default CardDetailsPage;
