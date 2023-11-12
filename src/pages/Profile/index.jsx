import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import TherapistProfile from "@/components/User/updateTherapist";
import UserProfile from "@/components/User/UserProfile";

import { useAppcontext } from "@/context/state";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function Profile() {
    const { user } = useAppcontext();
    console.log("therapist", user);
    return (
        <ProtectedRoute>
            {user?.isTherapist ? <TherapistProfile /> : <UserProfile />}
        </ProtectedRoute>
    );
}

export default Profile;

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
