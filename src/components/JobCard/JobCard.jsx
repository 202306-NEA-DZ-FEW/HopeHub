// import { useTranslation } from "next-i18next";
import React from "react";
import { TbDeviceImacCode } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
function JobCard({ title, type, location, tags, category }) {
    // const { t } = useTranslation("common");
    return (
        <div className='shrink-0 shadow-[5px_12px_12px_0px_rgba(0,0,0,0.61)] rounded-[11px] p-4'>
            <div className='flex gap-2 py-3'>
                <TbDeviceImacCode></TbDeviceImacCode>
                <span>{category}</span>
            </div>
            <div className=' font-bold py-3'>
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
