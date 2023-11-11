import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import TherapistProfile from "@/components/User/updateTherapist";
import UserProfile from "@/components/User/UserProfile";

import { useAppcontext } from "@/context/state";

function Profile() {
    const { user } = useAppcontext();
    console.log("therapist", user);
    return <>{user?.isTherapist ? <TherapistProfile /> : <UserProfile />}</>;
}

export default Profile;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
