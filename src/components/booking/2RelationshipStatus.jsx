import { useTranslation } from "next-i18next";
import { useState } from "react";

import { useAppcontext } from "@/context/state";

export default function RelationshipStatus({ OnNext, OnPrevious }) {
    const { t } = useTranslation("common");
    const [relationshipStatus, setRelationshipStatus] = useState(""); // You can initialize it with a default value if needed
    const [error, setError] = useState(""); // Initialize error state
    const { bookingInfos, setBookingInfos } = useAppcontext();

    const SelectRelationshipStatus = (text) => {
        setRelationshipStatus(text);
        setBookingInfos({ relationshipStatus: text, ...bookingInfos });
    };

    const handleNextClick = () => {
        // Validate user input if necessary
        if (relationshipStatus) {
            // Reset the error message if there's no error
            setError("");

            // Call the onNext function and pass the data to it
            OnNext();
        } else {
            // Display an error message or handle validation as needed
            setError(t("Please select an option before proceeding."));
        }
    };

    return (
        <div className='bg-NeutralWhite  dark:bg-Dark_Accent min-w-screen mb-12'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite dark:bg-Dark_Accent'>
                <div className='mb-3 pt-6 font-ogg font-bold text-NeutralBlack dark:text-NeutralWhite capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("Let's match you with the right therapist")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack dark:text-NeutralWhite text-base lg:text-lg leading-relaxed'>
                    {t(
                        "Please fill out this short questionnaire to provide some general and anonymous background about you and the issues you'd like to deal with in online therapy. It would help us match you with the most suitable therapist for you."
                    )}{" "}
                </div>
                <div className='flex flex-col bg-NeutralWhite dark:bg-Dark_Accent lg:w-3/5 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    {error && (
                        <div className='text-Error text-center pt-5'>
                            {error}
                        </div>
                    )}
                    <h3 className='py-5 px-4 lg:py-10 lg:px-11 leading-normal text-NeutralBlack dark:text-NeutralWhite lg:text-2xl text-2xl font-regular font-poppins capitalize '>
                        {t("What is your relationship status?")}
                    </h3>

                    <div className=' px-3 mx-5  mt-1 lg:px-6 group'>
                        <h3
                            className={`rounded-md py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] pl-2 lg:pl-5 lg:py-5 cursor-pointer text-NeutralBlack dark:text-NeutralWhite  group-hover:text-NeutralWhite dark:hover:bg-[#3E4E68] group-hover:bg-Accent group-hover:scale-105 duration-300 text-lg lg:text-xl font-regular font-poppins capitalize
                                ${
                                    relationshipStatus === "Single"
                                        ? "bg-Accent"
                                        : ""
                                }`}
                            onClick={() => SelectRelationshipStatus("Single")}
                        >
                            {t("Single")}
                        </h3>
                    </div>
                    <div className=' px-3 mx-5  lg:px-6 mt-1 lg:mt-2  group'>
                        <h3
                            className={`rounded-md py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] pl-2 lg:pl-5 lg:py-5 cursor-pointer text-NeutralBlack dark:text-NeutralWhite  group-hover:text-NeutralWhite dark:hover:bg-[#3E4E68] group-hover:bg-Accent group-hover:scale-105 duration-300 text-lg lg:text-xl font-regular font-poppins capitalize
                            ${
                                relationshipStatus === "Married"
                                    ? "bg-Accent dark:bg-[#3E4E68]"
                                    : ""
                            }`}
                            onClick={() => SelectRelationshipStatus("Married")}
                        >
                            {t("Married")}
                        </h3>
                    </div>
                    <div className='px-3 mx-5  lg:px-6 mt-1 lg:mt-2  group'>
                        <h3
                            className={` rounded-md py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] pl-2 lg:pl-5 lg:py-5 cursor-pointer text-NeutralBlack dark:text-NeutralWhite  group-hover:text-NeutralWhite dark:hover:bg-[#3E4E68] group-hover:bg-Accent group-hover:scale-105 duration-300 text-lg lg:text-xl font-regular font-poppins capitalize
                            ${
                                relationshipStatus === "Divorced"
                                    ? "bg-Accent dark:bg-[#3E4E68]"
                                    : ""
                            }`}
                            onClick={() => SelectRelationshipStatus("Divorced")}
                        >
                            {t("Divorced")}
                        </h3>
                    </div>
                    <div className='flex justify-between '>
                        <div className=' pl-6 py-10 lg:py-10 lg:pl-11 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                                onClick={OnPrevious}
                            >
                                {t("Previous")}
                            </button>
                        </div>
                        <div className=' pr-6 py-10 lg:py-10 lg:pr-11 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                                onClick={handleNextClick}
                            >
                                {t("Next")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
