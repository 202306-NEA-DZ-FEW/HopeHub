import { useTranslation } from "next-i18next";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { TbDeviceImacCode } from "react-icons/tb";

function JobCard({ title, location }) {
    const { t } = useTranslation("common");

    return (
        <div className='bg-NeutralWhite w-36 h-44 md:w-56 md:h-28 lg:w-96 lg:h-32 dark:bg-Dark_Primary rounded-md shadow-md p-4 hover:shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden'>
            <div className='flex items-center gap-2 my-2 '>
                <TbDeviceImacCode className='text-gray-500 dark:text-gray-400' />
            </div>
            <div className='font-bold h-2/4 md:h-1/4 my-2 overflow-hidden'>
                <span className='text-lg text-black dark:text-white'>
                    {t(title)}
                </span>
            </div>
            <div className='flex items-center gap-2 py-2'>
                <CiLocationOn className='text-gray-500 dark:text-gray-400' />
                <span className='text-sm text-gray-600 dark:text-gray-300  truncate'>
                    {t(location)}
                </span>
            </div>
        </div>
    );
}

export default JobCard;
