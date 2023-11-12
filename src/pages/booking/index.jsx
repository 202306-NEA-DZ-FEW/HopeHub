import { collection, getDocs } from "firebase/firestore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { use, useState } from "react";

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
import { db, isLoggedIn } from "@/util/firebase";
import { usePathname, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function BookingPage({ dates }) {
    const [step, setStep] = useState(1);
    const { bookingInfos } = useAppcontext();
    const { authChange, user } = useAppcontext();
    const router = useRouter();

    console.log("yo", user);
    console.log("router", router);

    // console.log('dates', dates)
    function OnNext() {
        setStep(step + 1);
        // console.log(bookingInfos);
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
        <ProtectedRoute>
            <Layout className='max-w-screen'>{Step()}</Layout>
        </ProtectedRoute>
    );
}

export default BookingPage;

export async function getStaticProps({ locale }) {
    const querySnapshot = await getDocs(collection(db, "dates"));
    const dates = {};
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        dates[doc.id] = doc.data();
    });
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            dates,
        },
    };
}
