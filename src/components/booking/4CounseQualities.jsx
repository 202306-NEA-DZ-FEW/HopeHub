import { useState } from "react";

import Checkbox from "../Checkbox";

export default function CounseQualities({ onNext }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [error, setError] = useState(""); // Initialize error state

    const handleNextClick = () => {
        if (selectedOption) {
            // Reset the error message if there's no error
            setError("");

            // Call the onNext function and pass the data to it
            onNext({ selectedOption });
        } else {
            // Display an error message or handle validation as needed
            setError("Please select an option before proceeding.");
        }
    };

    return (
        <div className='bg-NeutralWhite'>
            <div className='w-full h-[1000px] px-20 bg- zinc-100'>
                <div className='pt-12 font-poppins font-extrabold text-NeutralBlack uppercase text-4xl leading-loose'>
                    Let us match you with the right therapist
                </div>
                <div className='font-poppins font-extrabold text-justify text-NeutralBlack text-lg leading-relaxed'>
                    Please fill out this short questionnaire to provide some
                    general and anonymous background about you and the issues
                    you would like to deal with in online therapy. It would help
                    us match you with the most suitable therapist for you.
                </div>
                <div className='bg-NeutralWhite w-[803px] h-[557px] mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    {error && (
                        <div className='text-Error text-center pt-5'>
                            {error}
                        </div>
                    )}
                    <h3 className='py-10 pl-11 text-NeutralBlack text-2xl font-bold font-poppins capitalize'>
                        Are there any specific qualities that you would like in
                        a counselor?
                    </h3>

                    <div>
                        <Checkbox
                            label='I prefer a male counselor'
                            selected={
                                selectedOption === "I prefer a male counselor"
                            }
                            onClick={() =>
                                setSelectedOption("I prefer a male counselor")
                            }
                        />
                    </div>
                    <div>
                        <Checkbox
                            label='I prefer a female counselor'
                            selected={
                                selectedOption === "I prefer a female counselor"
                            }
                            onClick={() =>
                                setSelectedOption("I prefer a female counselor")
                            }
                        />
                    </div>
                    <div>
                        <Checkbox
                            label='I prefer an older counselor (45+)'
                            selected={
                                selectedOption ===
                                "I prefer an older counselor (45+)"
                            }
                            onClick={() =>
                                setSelectedOption(
                                    "I prefer an older counselor (45+)"
                                )
                            }
                        />
                    </div>
                    <div>
                        <Checkbox
                            label='I prefer a non-religious counselor'
                            selected={
                                selectedOption ===
                                "I prefer a non-religious counselor"
                            }
                            onClick={() =>
                                setSelectedOption(
                                    "I prefer a non-religious counselor"
                                )
                            }
                        />
                    </div>
                    <div>
                        <Checkbox
                            label='I prefer an older counselor (45+)'
                            selected={
                                selectedOption ===
                                "I prefer an older counselor (45+)"
                            }
                            onClick={() =>
                                setSelectedOption(
                                    "I prefer an older counselor (45+)"
                                )
                            }
                        />
                    </div>

                    <div className='absolute bottom-0 right-0 pb-10 pr-11 group'>
                        <button
                            className='w-28 h-10 rounded-md text-lg bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
