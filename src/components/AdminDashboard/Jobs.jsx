import { useTranslation } from "next-i18next";
import React from "react";

export default function Jobs({ onEdit, onDelete, job, title }) {
    const handleEditClick = () => {
        // Trigger the onEdit function with the entire job object
        onEdit(job);
    };

    const handleDeleteClick = async () => {
        try {
            // Trigger the onDelete function with the job ID
            await onDelete(job);
        } catch (error) {
            console.log("im a joooob", job);
            console.error("Error deleting job:", error);
        }
    };

    const { t } = useTranslation("common");

    return (
        <div className='flex flex-col font-poppins text-NeutralBlack w-[1080px] '>
            <div className='flex bg-slate-200 mt-3 mx-4 py-2 px-2 space-x-2 rounded-md hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.30)] duration-500 '>
                <h3 className='flex-1'>{title}</h3>
                <button
                    onClick={handleEditClick}
                    className='w-28 h-6 rounded-md self-end text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    {t("Edit")}
                </button>
                <button
                    onClick={handleDeleteClick}
                    className='w-28 h-6 rounded-md self-end text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    {t("Delete")}
                </button>
            </div>
        </div>
    );
}
