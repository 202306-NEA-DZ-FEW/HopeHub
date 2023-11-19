import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import React from "react";

import { useAppcontext } from "@/context/state";

import Checkbox from "../Checkbox";

export default function CounseQualities({ OnNext, OnPrevious }) {
    const { t } = useTranslation("common");
    const [counseQualities, setCounseQualities] = useState([]); // Use an array for multiple selections
    const [error, setError] = useState("");
    const { bookingInfos, setBookingInfos } = useAppcontext();
    const toastifyError = (message) => {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            transition: Slide,
            className:
                "dark:bg-slate-800 dark:text-NeutralWhite text-NeutralBlack bg-NeutralWhite",
        });
    };
    const handleNextClick = () => {
        if (counseQualities.length > 0) {
            // Check if at least one option is selected

            OnNext();
        } else {
            // Display an error toast message using toastifyError
            toastifyError(t("Please select an option before proceeding."));
        }
    };

    const handleCheckboxChange = (label, isChecked) => {
        if (!isChecked) {
            setCounseQualities([...counseQualities, label]); // Add to the selected options
        } else {
            setCounseQualities(
                counseQualities.filter((option) => option !== label)
            ); // Remove from selected options
        }
        setBookingInfos({ ...bookingInfos, counseQualities: counseQualities });
    };
    return (
        <div className='bg-NeutralWhite dark:bg-Dark_Accent min-w-screen mb-12'>
            <Head>
                <title>Counselor Qualities</title>
            </Head>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite dark:bg-Dark_Accent'>
                <div className='mb-3 pt-6 font-ogg font-bold text-NeutralBlack dark:text-NeutralWhite uppercase text-2xl lg:text-4xl leading-normal'>
                    {t("Let's match you with the right therapist")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack dark:text-NeutralWhite text-base lg:text-lg leading-relaxed'>
                    {t(
                        "Please fill out this short questionnaire to provide some general and anonymous background about you and the issues you'd like to deal with in online therapy. It would help us match you with the most suitable therapist for you."
                    )}
                </div>
                <div className='flex flex-col bg-NeutralWhite dark:bg-Dark_Accent lg:w-3/5 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    {error && (
                        <div className='text-Error text-center font-poppins text-regular pt-5'>
                            {error}
                        </div>
                    )}
                    <h3 className='py-5 px-4 lg:py-10 lg:px-11 leading-normal text-NeutralBlack dark:text-NeutralWhite text-xl lg:text-2xl font-regular font-poppins capitalize'>
                        {t(
                            "Are there any specific qualities that you would like in a counselor?"
                        )}
                    </h3>

                    <div className='flex flex-col'>
                        <div>
                            <Checkbox
                                label={t("I prefer a male counselor")}
                                selected={counseQualities.includes(
                                    "I prefer a male counselor"
                                )}
                                btnChecked={handleCheckboxChange}
                            />
                        </div>
                        <Checkbox
                            label={t("I prefer a female counselor")}
                            selected={counseQualities.includes(
                                "I prefer a female counselor"
                            )}
                            btnChecked={handleCheckboxChange}
                        />
                        <div>
                            <Checkbox
                                label={t("I prefer an older counselor (45+)")}
                                selected={counseQualities.includes(
                                    "I prefer an older counselor (45+)"
                                )}
                                btnChecked={handleCheckboxChange}
                            />
                        </div>
                        <div>
                            <Checkbox
                                label={t("I prefer a non-religious counselor")}
                                selected={counseQualities.includes(
                                    "I prefer a non-religious counselor"
                                )}
                                btnChecked={handleCheckboxChange}
                            />
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
        </div>
    );
}
