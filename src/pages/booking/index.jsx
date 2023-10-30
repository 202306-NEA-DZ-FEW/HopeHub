import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

import TypeOfCounseling from "@/components/booking/1TypeOfCounseling";
import RelationshipStatus from "@/components/booking/2RelationshipStatus";
import Therapy from "@/components/booking/3Therapy";
import CounseQualities from "@/components/booking/4CounseQualities";
import Issues from "@/components/booking/5Issues";
import Description from "@/components/booking/6Description";
import Submission from "@/components/booking/7Submission";
import Confirmation from "@/components/booking/8Confirmation";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";

function BookingPage() {
    const [step, setStep] = useState(1);
    const { bookingInfos } = useAppcontext();
    function OnNext() {
        setStep(step + 1);
        console.log(bookingInfos);
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
            case 7:
                return <Submission OnNext={OnNext} OnPrevious={OnPrevious} />;
            case 8:
                return <Confirmation OnNext={OnNext} OnPrevious={OnPrevious} />;
        }
    }
    return (
        <Layout className='max-w-screen'>
            {/* <TypeOfCounseling OnNext={OnNext} />
            <RelationshipStatus OnNext={OnNext} />
            <Therapy OnNext={OnNext} />
            <CounseQualities OnNext={OnNext} />
            <Issues OnNext={OnNext} />
            <Description OnNext={OnNext} />
            <Submission OnNext={OnNext} /> */}
            {Step()}
        </Layout>
    );
}

export default BookingPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
