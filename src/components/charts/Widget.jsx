import React from "react";

function Widget({ title, value }) {
    return (
        <div className='w-48 h-28 rounded-lg p-4 flex flex-col shadow-[0px_0px_8px_2px_rgba(0,0,0,10%)]'>
            <span className='text-2xl font-bold text-NeutralBlack'>
                {title}
            </span>
            <span className='text-5xl font-semibold text-Accent'>{value}</span>
        </div>
    );
}

export default Widget;
