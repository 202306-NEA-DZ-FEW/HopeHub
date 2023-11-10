import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import styles from "../../styles/PickaDate.module.css";

import { useAppcontext } from "@/context/state";

import hours from "../../data/hours";

function PickaDate({ OnPrevious, OnNext, dates = [] }) {
    let tomorrow = "";
    const { t } = useTranslation("common");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [bookedHours, setBookedHours] = useState([]);
    const { bookingInfos, setBookingInfos } = useAppcontext();
    const minDate = new Date();
    useEffect(() => {
        const d = new Date();
        const day = new Date(d);
        day.setDate(day.getDate() + 1);
        const dd = String(day.getDate()).padStart(2, "0");
        const mm = String(day.getMonth() + 1).padStart(2, "0");
        const yyyy = day.getFullYear();
        tomorrow = `${yyyy}-${mm}-${dd}`;
        setDate(tomorrow);
        setBookingInfos({ ...bookingInfos, date: tomorrow });
        // console.log('today is ', tomorrow)
    }, []);

    const [error, setError] = useState("");
    function selectDate(newDate) {
        setDate(newDate);
        setBookedHours(dates[date]);
        // console.log('selected', dates[date])
        setBookingInfos({ ...bookingInfos, date: newDate });
    }
    function selectTime(val) {
        setTime(val);
        setBookingInfos({ ...bookingInfos, start: val });
    }
    function handleNext() {
        if (date !== "" && time !== "") {
            // Check if at least one option is selected
            // console.log('time and date', time, date)
            setError("");
            OnNext();
        } else {
            setError(t("Please set the time and date."));
        }
    }

    return (
        <div className='bg-NeutralWhite dark:bg-Dark_Accent min-w-screen mb-12'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite dark:bg-Dark_Accent '>
                <div className='mb-3 pt-12 font-poppins font-semibold tracking-wider text-NeutralBlack dark:text-NeutralWhite capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("Let's match you with the right therapist")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack dark:text-NeutralWhite text-base lg:text-lg leading-relaxed'>
                    {t(
                        "Please fill out this short questionnaire to provide some general and anonymous background about you and the issues you'd like to deal with in online therapy. It would help us match you with the most suitable therapist for you."
                    )}
                </div>
                <div className=' flex flex-col bg-NeutralWhite dark:bg-Dark_Accent lg:w-3/5 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    {error && (
                        <div className='text-Error text-center pt-5'>
                            {t(error)}
                        </div>
                    )}
                    <h3 className='py-5 px-4 lg:py-10 lg:px-11 leading-normal text-NeutralBlack dark:text-NeutralWhite lg:text-2xl text-2xl font-regular font-poppins capitalize '>
                        {t("Select a date")}
                    </h3>
                    <div className='flex flex-col gap-2 md:flex-row lg:justify-between lg:px-11 px-4 items-center '>
                        <input
                            type='date'
                            value={date}
                            min={tomorrow}
                            className={
                                styles.date_input +
                                " w-full md:w-1/2 h-12 rounded-lg text-base bg-white px-4 border border-gray-300 outline-none"
                            }
                            onChange={(e) => selectDate(e.target.value)}
                        />
                        <select
                            onChange={(e) => selectTime(e.target.value)}
                            value={time}
                            className='select maxW select-bordered w-full lg:w-32 md:w-1/2  border border-gray-300 outline-none '
                        >
                            <option value='' disabled>
                                select time
                            </option>
                            {hours.map((h) => (
                                <option
                                    key={h}
                                    value={h}
                                    className={
                                        dates[date] &&
                                        dates[date].bookedHours.includes(h)
                                            ? "text-NeutralWhite"
                                            : "text-NeutralBlack dark:text-NeutralWhite"
                                    }
                                    disabled={dates[date]?.bookedHours.includes(
                                        h
                                    )}
                                >
                                    {h}
                                    {dates[date]?.bookedHours.includes(h)
                                        ? " not available"
                                        : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex justify-between '>
                        <div className=' pl-6 py-10 lg:py-10 lg:pl-11 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                                onClick={OnPrevious}
                            >
                                {t("Previous")}
                            </button>
                        </div>
                        <div className='self-end pr-6 py-10 lg:py-10 lg:pr-11 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                                onClick={handleNext}
                            >
                                {t("Next")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PickaDate;
