// this code is not being used in this version of Hope Hub

import { JaaSMeeting } from "@jitsi/react-sdk";
import { randomUUID } from "crypto";
import fs from "fs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { generate } from "@/util/jitsi";

export default function CallRoom({ token }) {
    // console.log('end key......', token)
    const { user } = useAppcontext();
    function handleReadyToClose() {
        alert("Ready to close...");
    }
    return (
        <>
            <Layout>
                <main className='pl-60 mt-10 border-red-500 border-8'>
                    <JaaSMeeting
                        // jwt={token}
                        roomName='HopeHubOnlineTherapy'
                        configOverwrite={{
                            startWithAudioMuted: false,
                            disableModeratorIndicator: true,
                            startScreenSharing: true,
                            enableEmailInStats: false,
                        }}
                        interfaceConfigOverwrite={{
                            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                        }}
                        onApiReady={(externalApi) => {
                            // here you can attach custom event listeners to the Jitsi Meet External API
                            // you can also store it locally to execute commands
                            // console.log('api ready jitsiii', externalApi)
                        }}
                        getIFrameRef={(iframeRef) => {
                            iframeRef.style.height = "600px";
                        }}
                        onReadyToClose={handleReadyToClose}
                    />
                </main>
            </Layout>
        </>
    );
}

export async function getServerSideProps({ locale, query }) {
    const specialToken = query.specialToken;

    // Check if there is a valid special token
    // if (specialToken !== process.env.NEXT_PUBLIC_SPECIAL_TOKEN) {
    //     return { redirect: { destination: "/Auth", permanent: false } };
    // }
    const privateKey = fs.readFileSync("./HopeHubApiKeyprivate.pk").toString();
    const jitsiId = randomUUID();
    const token = generate({
        privateKey,
        id: "auth0|6537ff15dd1cc21bb8b96709",
        name: "ghani.bahri",
        avatar: "",
        email: "bahri.ghani@rocketmail.com",
    });
    // console.log("the token..........", token)
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            token,
        },
    };
}
