import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function Calendar() {
    const router = useRouter();
    const { user } = useAppcontext();
    const { t } = useTranslation("common");
    const events = user?.appointments?.map((d) => ({ title: d.time, ...d }));
    console.log("user", user, "events", events);

    return (
        <ProtectedRoute>
            <Layout className='max-w-screen'>
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
        </ProtectedRoute>
    );
}

export default Calendar;

export async function getServerSideProps({ locale, query }) {
    const userId = query.userid; // Assuming the user ID is provided in the query parameter

    if (!userId || userId == "undefined") {
        return { redirect: { destination: "/Auth", permanent: false } };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
