import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
function Calendar() {
    const router = useRouter();
    const { user } = useAppcontext();
    const { t } = useTranslation("common");
    const events = user?.appointments?.map((d) => ({ title: d.time, ...d }));
    console.log("user", user, "events", events);
    return (
        <Layout className='max-w-screen'>
            <div className='px-32 py-6 h-screen'>
                <FullCalendar
                    initialView='dayGridMonth'
                    events={events}
                    plugins={[dayGridPlugin, timeGridPlugin]}
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
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
