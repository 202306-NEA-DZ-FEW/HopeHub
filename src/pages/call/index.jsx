import { JitsiMeeting } from "@jitsi/react-sdk";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import Loader from "@/components/Loader/Loader";

// import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

function CallRoom({ user }) {
    const [callFinished, setCallFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    // const { user } = useAppcontext();
    const { t } = useTranslation("common");
    function handleReadyToClose() {
        alert("Ready to close...");
    }

    return (
        <Layout user={user} className='max-w-screen'>
            <Head>
                <title>{t("Therapy Session")} </title>
            </Head>
            <main className={` -mt-20 ${callFinished ? "" : "p-12 mt-1"}`}>
                {callFinished ? (
                    <div
                        className='flex items-center justify-center h-screen py-8 w-full bg-NeutralWhite dark:bg-Dark_Accent bg-cover bg-center bg-no-repeat'
                        style={{
                            backgroundImage: `url('/assets/login-bg.svg')`,
                        }}
                    >
                        <div className='text-center flex flex-col items-center justify-center gap-14 w-3/4 h-3/4 p-8  rounded-xl bg-[rgba(255,255,255,60%)]'>
                            <h1 className='text-6xl font-poppins font-bold text-Accent  '>
                                Call Finished
                            </h1>
                            <p className='text-xl mt-2 font-poppins font-medium  '>
                                Thank you for participating in the call
                            </p>
                            <div className='flex flex-row w-1/2 mx-auto items-center justify-between'>
                                <Link
                                    href='/'
                                    className='text-lg tracking-wider w-48 py-4 px-8 bg-Accent rounded-md text-center text-white font-semibold font-poppins'
                                    style={{ textTransform: "capitalize" }}
                                >
                                    Homepage
                                </Link>
                                <button
                                    className='text-lg tracking-wider w-48 py-4 px-8 bg-Accent rounded-md text-center font-semibold font-poppins text-white'
                                    onClick={() => setCallFinished(false)}
                                >
                                    Join again
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {" "}
                        {loading && <Loader />}
                        <JitsiMeeting
                            //  domain = "localhost:3000"
                            roomName='HopeHubTherapy'
                            configOverwrite={{
                                startWithAudioMuted: true,
                                disableModeratorIndicator: true,
                                startScreenSharing: true,
                                enableEmailInStats: false,
                            }}
                            interfaceConfigOverwrite={{
                                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                            }}
                            userInfo={{
                                id: user?.uid,
                                displayName: `${user ? user.name : "Hope Hub"}`,
                                email: `${
                                    user ? user.email : "test@email.com"
                                }`,
                                avatar: `${user ? user.photoURL : ""}`,
                                moderator: true,
                            }}
                            onApiReady={(externalApi) => {
                                // here you can attach custom event listeners to the Jitsi Meet External API
                                // you can also store it locally to execute commands
                                setLoading(false);
                                externalApi.on("participantLeft", () => {
                                    setCallFinished(true);
                                });
                                console.log("external API ", externalApi);
                            }}
                            getIFrameRef={(iframeRef) => {
                                iframeRef.style.height = "600px";
                            }}
                            onReadyToClose={handleReadyToClose}
                            onPart
                        />{" "}
                    </>
                )}
            </main>
        </Layout>
    );
}

export default CallRoom;
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
