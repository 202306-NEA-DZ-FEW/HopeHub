import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";

import EventModal from "@/components/calendarEvents/EventModal";

import Layout from "@/layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/util/firebase";

function Calendar({ appointments, user }) {
    const router = useRouter();
    const { t } = useTranslation("common");
    const events = user.isTherapist
        ? appointments /* .map((ev)=>{
            return { title: ev.time, id: ev.uid, ...ev };
        }) */
        : user?.appointments?.map((d) => ({ title: d.time, ...d }));
    console.log("calender ave", events);
    // console.log("appointments", appointments);
    // if(user.isTherapist){
    //     appointments.forEach((obj, id) => {
    //         const key = Object.keys(obj)[id];
    //         // console.log('objjjj',obj[key])
    //         return { title: obj[key]?.time, id: key, ...obj[key] };
    //     })
    // }

    const [modalOpen, setModalOpen] = useState(false);
    const [eventData, setEventData] = useState(null);
    const [modalPosition, setModalPosition] = useState({
        left: "0px",
        top: "0px",
    });
    function handleEventClick(info) {
        const event = events.filter((obj) => {
            return obj.id === info.event.id;
        });
        setEventData(event[0]);
        const click = info.jsEvent.clientX;
        let horizontal = 0;
        const modalWidth = window.innerWidth > 700 ? 390 : 240;
        const rect = info.el.getBoundingClientRect();
        if (click + modalWidth + rect.width > window.innerWidth) {
            horizontal = rect.left - modalWidth;
            // if(horizontal-240<0){
            //     horizontal= rect.left}
        } else {
            horizontal = rect.left + rect.width;
        }
        // console.log('horiiiiiiiii______window',click+modalWidth+rect.width, horizontal, window.innerWidth)
        setModalPosition({
            left: `${horizontal}px`,
            top: `${rect.top - rect.height}px`,
        });
        setModalOpen(!modalOpen);
    }
    useEffect(() => {}, []);
    return (
        <Layout user={user} className='max-w-screen'>
            {modalOpen && (
                <EventModal
                    event={eventData}
                    position={modalPosition}
                    closeModal={() => {
                        setModalOpen(false);
                    }}
                />
            )}
            <div className='px-32 py-6 h-screen'>
                <FullCalendar
                    initialView='dayGridMonth'
                    events={events}
                    eventClick={handleEventClick}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    expandRows={false}
                    // aspectRatio={2}
                    contentHeight='auto'
                    headerToolbar={{
                        start: "bookApp",
                        center: "title",
                        end: "prev,next",
                    }}
                    footerToolbar={{
                        start: "",
                        center: "",
                        end: "",
                    }}
                    customButtons={{
                        bookApp: {
                            text: "Book appointment",
                            click: function () {
                                router.push(`/booking?userid=${user.uid}`);
                            },
                        },
                    }}
                    nowIndicator={true}
                />
            </div>
        </Layout>
    );
}

export default Calendar;

export async function getServerSideProps({ locale, query }) {
    const userId = query.userid; // Assuming the user ID is provided in the query parameter

    if (!userId || userId == "undefined") {
        // console.log('user',userId)
        return { redirect: { destination: "/Auth", permanent: false } };
    }

    try {
        const appointmentSnapshot = await getDocs(
            collection(db, "appointments")
        );
        const events = {};
        const appointments = [];
        appointmentSnapshot.forEach((doc) => {
            // events.push(doc.data());
            events[doc.id] = doc.data();
            // console.log('each doc', doc.id, doc.data())
        });
        // console.log('server appoin', events)
        for (let index in events) {
            for (let key in events[index]) {
                appointments.push({
                    title: events[index][key].time,
                    id: index,
                    ...events[index][key],
                });
            }
        }
        console.log("appointments..............", appointments);

        const userDoc = await getDoc(doc(db, "users", userId));
        console.log("im userdoc in serverside", userDoc.exists());
        if (!userDoc.exists()) {
            // Handle the case when the user with the specified ID is not found
            return { notFound: true };
        }
        // Extract user data from the document
        const user = userDoc.data();

        return {
            props: {
                ...(await serverSideTranslations(locale, ["common"])),
                user,
                appointments,
            },
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { props: { error: "Error fetching user data" } };
    }
}
