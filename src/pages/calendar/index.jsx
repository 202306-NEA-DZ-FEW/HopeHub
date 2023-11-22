import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { collection, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import EventModal from "@/components/calendarEvents/EventModal";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

function Calendar({ appointments, user }) {
    const router = useRouter();
    const { t } = useTranslation("common");
    // const [filteredAppointments, setFilteredAppointments] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [eventData, setEventData] = useState(null);
    const [modalPosition, setModalPosition] = useState({
        left: "0px",
        top: "0px",
    });

    const events = user.isTherapist
        ? appointments.filter(
              (appointment) => user?.patients.includes(appointment.id) // we filter only the patients assigned to this therapist
          )
        : user?.appointments?.map((appointment) => ({
              title: appointment.time,
              ...appointment,
          })); // return the evens array in format accepted by FullCalndar

    function handleEventClick(info) {
        if (user.isTherapist) {
            setEventData(info.event);
            const click = info.jsEvent.clientX; // the mouse position
            let horizontal = 0;
            const modalWidth = window.innerWidth > 700 ? 390 : 240; //specify the modal widt, small or bigger screens
            const rect = info.el.getBoundingClientRect(); // get the event rectangle to use its coordinates to calculate the modal postion
            if (click + modalWidth + rect.width > window.innerWidth) {
                horizontal = rect.left - modalWidth;
                // if(horizontal-240<0){
                //     horizontal= rect.left}
            } else {
                horizontal = rect.left + rect.width;
            }
            setModalPosition({
                left: `${horizontal}px`,
                top: `${rect.top - rect.height}px`,
            });
            setModalOpen((prevModalOpen) => !prevModalOpen);
        }
        return;
    }
    return (
        <Layout user={user} className='max-w-screen'>
            <Head>
                <title>{t("Calender")}</title>
            </Head>
            {modalOpen && (
                <EventModal
                    eventData={eventData}
                    position={modalPosition}
                    closeModal={() => {
                        setModalOpen((prevModalOpen) => !prevModalOpen);
                        setEventData(null); // Reset event data when closing the modal
                        // console.log("im in here", events);
                    }}
                    userId={user.uid}
                />
            )}
            <div className='px-32 py-6 h-screen'>
                <FullCalendar
                    className='dark:bg-Dark_Primary text-NeutralBlack'
                    initialView='dayGridMonth'
                    events={events}
                    eventClick={handleEventClick}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    expandRows={false}
                    dayMaxEventRows={3}
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
                    customButtons={
                        user.isTherapist
                            ? {}
                            : {
                                  bookApp: {
                                      text: "Book appointment",
                                      click: function () {
                                          router.push(
                                              `/booking?userid=${user.uid}`
                                          );
                                      },
                                  },
                              }
                    }
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

        const userDoc = await getDoc(doc(db, "users", userId));
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
