import { useTranslation } from "next-i18next";
import { useState } from "react";

import { useAppcontext } from "@/context/state";

export default function Description({ OnNext, OnPrevious }) {
    const { t } = useTranslation("common");
    const [error, setError] = useState(""); // Initialize error state
    const [description, setDescription] = useState("");
    const { bookingInfos, setBookingInfos } = useAppcontext();

    const SubmitDescription = () => {
        // setDescription(text);
        setBookingInfos({ description: description, ...bookingInfos });
    };

    const handleNextClick = () => {
        // Validate user input if necessary
        if (description) {
            // Reset the error message if there's no error
            setError("");
            SubmitDescription();
            // Call the OnNext function and pass the data to it
            OnNext();
        } else {
            // Display an error message or handle validation as needed
            setError(t("Please write something before proceeding."));
        }
    };
    return (
        <div className='bg-NeutralWhite min-w-screen min-h-screen'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite flex flex-col '>
                <div className='mb-3 pt-12 font-ogg font-bold text-NeutralBlack capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("What brings you here?")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack text-base lg:text-lg leading-relaxed'>
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
                        className='textarea p-4 text-NeutralBlack text-xl font-poppins text-regular bg-NeutralWhite lg:h-full sm:h-full sm:leading-tight shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-md '
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t("Tell us what you feel ...")}
                    ></textarea>
                    <div className='flex justify-between '>
                        <div className='py-10 lg:py-10 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                                onClick={OnPrevious}
                            >
                                {t("Previous")}
                            </button>
                        </div>
                        <div className=' py-10 lg:py-10 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
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
