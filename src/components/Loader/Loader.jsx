import React from "react";

function Loader() {
    return (
        <div className='w-full p-10 md:p-20 flex flex-row justify-center items-center'>
            <h1 className='text-Accent font-poppins font-bold text-3xl animate-pulse'>
                Loading{" "}
            </h1>
            <span className='loading loading-ring loading-lg text-Accent'></span>
        </div>
    );
}

export default Loader;
