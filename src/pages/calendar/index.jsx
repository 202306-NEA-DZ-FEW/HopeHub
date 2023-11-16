import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import Layout from "@/layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/util/firebase";

function Calendar({ user }) {
    const router = useRouter();
    const { t } = useTranslation("common");
    const events = user?.appointments?.map((d) => ({ title: d.time, ...d }));
    console.log("user", user, "events", events);

    return (
        <Layout user={user} className='max-w-screen'>
            <div className='px-32 py-6 h-screen'>
                <FullCalendar
                    initialView='dayGridMonth'
                    events={events}
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
                                router.push("/booking");
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
        return { redirect: { destination: "/Auth", permanent: false } };
    }

    try {
        // Fetch user data from Firestore based on user ID
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
            },
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { props: { error: "Error fetching user data" } };
    }
}
