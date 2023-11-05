import Link from "next/link";
import React from "react";

import SavedCards from "@/components/SavedCards/SavedCards";

import Layout from "@/layout/Layout";

const SavedCardPage = () => {
    const cardsData = [
        {
            title: "Card 1",
            color: "bg-[#FFBD12]",
        },
        {
            title: "Card 2",
            color: "bg-[#3558D5]",
        },
        {
            title: "Card 3",
            color: "bg-[#F66A8C]",
        },
    ];

    return (
        <Layout>
            <div className=' bg-center bg-NeutralWhite w-full h-full pt-10'>
                <h1 className='text-black font-poppins font-bold text-[25px]'>
                    SELECT CARD
                </h1>
                <p>Please select the card you want to buy the tickets with</p>

                <div className='flex'>
                    {cardsData.map((card, index) => (
                        <div key={index} className='w-1/3'>
                            <SavedCards title={card.title} color={card.color} />
                        </div>
                    ))}
                </div>
                <button className='button-container mx-4 md:mr-8 bg-Accent hover:bg-Primary rounded-md w-32 h-12 mt-4 md:mt-0'>
                    <Link
                        href='/'
                        className='text-base tracking-wider text-NeutralBlack font-extrabold font-poppins'
                        style={{ textTransform: "capitalize" }}
                    >
                        CONFIRM PURCHASE
                    </Link>
                </button>
            </div>
        </Layout>
    );
};

export default SavedCardPage;
