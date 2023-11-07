import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import styles from "../../styles/PickaDate.module.css";

import { useAppcontext } from "@/context/state";

import hours from "../../data/hours";

function PickaDate({ OnNext, dates = [] }) {
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
        <div className='bg-NeutralWhite min-w-screen min-h-screen'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite '>
                <div className='mb-3 pt-12 font-poppins font-semibold tracking-wider text-NeutralBlack capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("Let's match you with the right therapist")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack text-base lg:text-lg leading-relaxed'>
                    {t(
                        "Please fill out this short questionnaire to provide some general and anonymous background about you and the issues you'd like to deal with in online therapy. It would help us match you with the most suitable therapist for you."
                    )}
                </div>
                <div className=' flex flex-col bg-NeutralWhite lg:w-1/2 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    {error && (
                        <div className='text-Error text-center pt-5'>
                            {t(error)}
                        </div>
                    )}
                    <h3 className='py-5 px-4 lg:py-10 lg:px-11 leading-normal text-NeutralBlack lg:text-2xl text-2xl font-regular font-poppins capitalize '>
                        {t("Select a date")}
                    </h3>
                    <div className='flex flex-col lg:flex-row justify-between lg:px-11 px-4 items-center '>
                        <input
                            type='date'
                            value={date}
                            min={tomorrow}
                            className={
                                styles.date_input +
                                " w-1/2 h-12 rounded-lg text-base bg-white px-4"
                            }
                            onChange={(e) => selectDate(e.target.value)}
                        />
                        <select
                            onChange={(e) => selectTime(e.target.value)}
                            value={time}
                            className='select select-bordered w-full lg:w-32  max-w-xs '
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
                                            ? "text-gray-500"
                                            : "text-NeutralBlack"
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
    );
}

export default PickaDate;
