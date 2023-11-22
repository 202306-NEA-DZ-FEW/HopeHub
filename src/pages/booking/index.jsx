import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import React from "react";

import TypeOfCounseling from "@/components/booking/1TypeOfCounseling";
import RelationshipStatus from "@/components/booking/2RelationshipStatus";
import Therapy from "@/components/booking/3Therapy";
import CounseQualities from "@/components/booking/4CounseQualities";
import Issues from "@/components/booking/5Issues";
import Description from "@/components/booking/6Description";
import Submission from "@/components/booking/7Submission";
import Confirmation from "@/components/booking/8Confirmation";
import PickaDate from "@/components/booking/PickaDate";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

function BookingPage({ dates, user }) {
    const { t } = useTranslation("common");
    const [step, setStep] = useState(1);
    const { bookingInfos } = useAppcontext();

    function OnNext() {
        setStep(step + 1);
    }
    function OnPrevious() {
        setStep(step - 1);
    }
    function Step() {
        switch (step) {
            case 1:
                return (
                    <TypeOfCounseling OnNext={OnNext} OnPrevious={OnPrevious} />
                );
            case 2:
                return (
                    <RelationshipStatus
                        OnNext={OnNext}
                        OnPrevious={OnPrevious}
                    />
                );
            case 3:
                return <Therapy OnNext={OnNext} OnPrevious={OnPrevious} />;
            case 4:
                return (
                    <CounseQualities OnNext={OnNext} OnPrevious={OnPrevious} />
                );
            case 5:
                return <Issues OnNext={OnNext} OnPrevious={OnPrevious} />;
            case 6:
                return <Description OnNext={OnNext} OnPrevious={OnPrevious} />;
            case 8:
                return <Submission OnNext={OnNext} OnPrevious={OnPrevious} />;
            case 7:
                return (
                    <PickaDate
                        dates={dates}
                        OnNext={OnNext}
                        OnPrevious={OnPrevious}
                    />
                );
            case 9:
                return <Confirmation OnNext={OnNext} OnPrevious={OnPrevious} />;
        }
    }
    return (
        <Layout user={user} className='max-w-screen'>
            <Head>
                <title>{t("Booking")}</title>
            </Head>
            <div className='my-12'>{Step()}</div>
        </Layout>
    );
}

export default BookingPage;

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

        // Fetch dates data
        console.log("fetch the dates");
        const dateSnapshot = await getDocs(collection(db, "dates"));
        const dates = {};

        dateSnapshot.forEach((doc) => {
            dates[doc.id] = doc.data();
        });

        return {
            props: {
                ...(await serverSideTranslations(locale, ["common"])),
                user,
                dates,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { props: { error: "Error fetching data" } };
    }
}
