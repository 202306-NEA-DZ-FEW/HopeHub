import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

function EventModal({ eventData, position, closeModal, userId }) {
    const { t } = useTranslation("common");

    const event = { ...eventData._def.extendedProps, date: eventData.startStr };
    return (
        <>
            <div
                className='absolute top-0 right-0 left-0 bottom-0 bg-transparent z-10'
                onClick={closeModal}
            ></div>
            <div
                style={position}
                className='text-NeutralBlack dark:text-NeutralWhite dark:bg-NeutralBlack w-60 md:w-96 bg-white shadow-Accent shadow-[0px_0px_8px_0px] rounded-xl h-fit p-5 flex flex-col items-start absolute z-20 '
            >
                <h1 className='text-Accent text-2xl font-semibold flex flex-row items-center justify-between w-full'>
                    {event.name || "Patient Name"}
                    <Link
                        href={`/call?userid=${userId}`}
                        // onClick={console.log("go to calroom", userId)}
                        className='w-fit h-fit px-4 py-1 bg-Accent rounded text-white text-lg font-semibold '
                    >
                        {t("Call")}{" "}
                    </Link>
                </h1>
                <span className='text-base text-gray-400'>
                    {event.date} {t("at")} {event.time}{" "}
                </span>
                <span className='text-lg font-medium flex flex-col w-full items-start'>
                    {t("Relationship status")}:{" "}
                    <span className='font-normal '>
                        {" "}
                        {t(event.relationship)}
                    </span>
                </span>

                <span className='text-lg font-medium flex flex-col w-full items-start'>
                    {t("Therapy type")}:{" "}
                    <span className='font-normal '> {t(event.type)}</span>
                </span>
                <span className='text-lg font-medium flex flex-col w-full items-start'>
                    {t("Had therapy before")}:{" "}
                    <span className='font-normal '> {t(event.hadTherapy)}</span>
                </span>

                <p className='text-lg font-medium flex flex-col w-full items-start'>
                    {t("Issues")}:{" "}
                    <span className='font-normal '>
                        {" "}
                        {event.issues.lenght === 0
                            ? event.issues.map((issue) => {
                                  <span
                                      key={issue}
                                      className='border border-gray-300 rounded py-1 px-2 text-NeutralBlack bg-NeutralWhite'
                                  >
                                      {issue}
                                  </span>;
                              })
                            : "N/A"}
                    </span>
                </p>
                <span className='text-lg font-medium flex flex-col w-full items-start'>
                    {t("Description")}:
                    <p className='w-full font-normal p-2 h-24 rounded border bg-slate-100 dark:text-NeutralWhite dark:bg-slate-600 text-NeutralBlack'>
                        {event.description}
                    </p>
                </span>
            </div>
        </>
    );
}

export default EventModal;
