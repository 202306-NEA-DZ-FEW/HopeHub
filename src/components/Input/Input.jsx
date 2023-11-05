import { useTranslation } from "next-i18next";
import React from "react";

function Input({ label, type, id, name, state, setstate }) {
    const { t } = useTranslation("common");
    return (
        <div className='flex flex-col items-start justify-between gap-1 px-2'>
            <label
                htmlFor='name'
                className=' mt-4 w-full text-left font-poppins text-xl font-semibold text-NeutralBlack '
            >
                {t(label)}
            </label>
            <input
                value={state}
                type={type}
                name={name}
                id={id}
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                onChange={(e) => setstate(e.target.value)}
            />
        </div>
    );
}

export default Input;
