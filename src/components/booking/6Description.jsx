import { useState } from "react";

export default function Description({ onNext }) {
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
            <div className='w-full h-[1000px] px-20 bg-zinc-100 '>
                <div className='pt-12 font-poppins font-extrabold text-NeutralBlack uppercase text-4xl leading-loose'>
                    What brings you here?
                </div>
                <div className='font-poppins font-extrabold text-justify text-NeutralBlack text-lg leading-relaxed'>
                    Please specify (in a few sentences) why you would like
                    counseling.This will give your counselor a good
                    understanding of where to start.
                </div>
                <div className='flex flex-col justify-center'>
                    <textarea
                        className='textarea p-4 text-NeutralBlack text-lg bg-NeutralWhite w-[803px] h-[557px] mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'
                        placeholder='Tell us what you feel ...'
                    ></textarea>
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
    );
}
