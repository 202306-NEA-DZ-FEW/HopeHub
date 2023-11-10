// import { useTranslation } from "next-i18next";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { TbDeviceImacCode } from "react-icons/tb";
function JobCard({ title, type, location, tags, category }) {
    // const { t } = useTranslation("common");
    return (
        <div className='shrink-0 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary rounded-md p-4 hover:scale-105 delay-75 cursor-pointer'>
            <div className='flex gap-2 py-3'>
                <TbDeviceImacCode></TbDeviceImacCode>
                <span>{category}</span>
            </div>
            <div className=' font-bold flex-1 py-3'>
                <span>
                    {title} | {tags} |{type}{" "}
                </span>
            </div>
            <div className='flex gap-2 py-3'>
                <CiLocationOn></CiLocationOn>
                {location}
            </div>
        </div>
    );
}

export default JobCard;
