import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

function Input({ label, type, id, name }) {
    const { t } = useTranslation("common");

    return (
        <div className='mb-5 flex'>
            <label for='name' className=' mt-4 w-1/2 '>
                {t(label)}
            </label>
            <input
                type={type}
                name={name}
                id={id}
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
            />
        </div>
    );
}

export default Input;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
