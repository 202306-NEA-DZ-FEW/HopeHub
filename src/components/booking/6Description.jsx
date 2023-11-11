import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

import { useAppcontext } from "@/context/state";

export default function Description({ OnNext, OnPrevious }) {
    const { t } = useTranslation("common");
    const [error, setError] = useState(""); // Initialize error state
    const [description, setDescription] = useState("");
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
    const SubmitDescription = () => {
        // setDescription(text);
        setBookingInfos({ description: description, ...bookingInfos });
    };

    const handleNextClick = () => {
        // Validate user input if necessary
        if (description) {
            // Reset the error message if there's no error

            SubmitDescription();
            // Call the OnNext function and pass the data to it
            OnNext();
        } else {
            // Display an error toast message using toastifyError
            toastifyError(t("Please write us something before proceeding."));
        }
    };
    return (
        <div className='bg-NeutralWhite dark:bg-Dark_Accent min-w-screen min-h-screen'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite dark:bg-Dark_Accent flex flex-col '>
                <div className='mb-3 pt-6 font-poppins font-bold text-NeutralBlack dark:text-NeutralWhite  capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("What brings you here?")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack dark:text-NeutralWhite text-base lg:text-lg leading-relaxed'>
                    {t(
                        "Please specify (in a few sentences) why you would like counseling. This will give your counselor a good understanding of where to start."
                    )}{" "}
                </div>
                <div className='self-center flex flex-col w-full h-[500px] lg:w-[70%] lg:h-[350px] mt-14'>
                    {error && (
                        <div className='text-Error text-center font-poppins text-regular pt-5'>
                            {error}
                        </div>
                    )}

                    <textarea
                        id='details'
                        value={description}
                        className='textarea p-4 dark:brightness-90 text-NeutralBlack text-xl font-poppins text-regular bg-NeutralWhite lg:h-full h-[300px] sm:h-full sm:leading-tight shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-md '
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t("Tell us what you feel ...")}
                    ></textarea>
                    <div className='flex justify-between '>
                        <div className='pt-10 lg:py-8 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                                onClick={OnPrevious}
                            >
                                {t("Previous")}
                            </button>
                        </div>
                        <div className='pt-10 lg:py-8 group '>
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
