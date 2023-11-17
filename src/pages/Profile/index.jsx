import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import TherapistProfile from "@/components/User/updateTherapist";
import UserProfile from "@/components/User/UserProfile";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/util/firebase";

function Profile({ user }) {
    return (
        <>
            {user?.isTherapist ? (
                <TherapistProfile user={user} />
            ) : (
                <UserProfile user={user} />
            )}
        </>
    );
}

export default Profile;

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
