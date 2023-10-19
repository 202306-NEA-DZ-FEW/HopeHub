import { useState } from "react";

export default function Submission({ onNext }) {
    const [selectedOption, setSelectedOption] = useState(""); // You can initialize it with a default value if needed

    const handleNextClick = () => {
        // Validate user input if necessary
        if (selectedOption) {
            // Call the onNext function and pass the data to it
            onNext({ selectedOption });
        } else {
            // Display an error message or handle validation as needed
        }
    };
    return (
        <div className='bg-NeutralWhite'>
            <div className='w-full h-[650px] px-20 bg-zinc-100 '>
                <div className='pt-12 font-poppins font-extrabold text-NeutralBlack uppercase text-4xl leading-loose'>
                    Submit your appointment
                </div>
                <div className='font-poppins font-extrabold text-justify text-NeutralBlack text-lg leading-relaxed'>
                    Click Submit if you are sure of all your choices.
                </div>
                <div className='flex flex-col text-center bg-NeutralWhite w-[803px] h-[300px] mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    <h3 className='pt-12  text-NeutralBlack text-2xl font-bold font-poppins capitalize'>
                        Submit Appointment?{" "}
                    </h3>

                    <div className=' '>
                        <h3 className='rounded-md py-12 text-NeutralBlack text-xl font-extrabold font-poppins capitalize'>
                            Please be aware that this action will cost you a
                            ticket!
                        </h3>
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
