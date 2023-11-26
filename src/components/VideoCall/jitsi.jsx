// this component is not being used in this version of Hope Hub

import { JitsiMeeting } from "@jitsi/react-sdk";
import React from "react";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";

function CallRoom() {
    const { user } = useAppcontext();
    function handleReadyToClose() {
        alert("Ready to close...");
    }
    return (
        <>
            <Layout>
                <main className='pl-60 mt-10 border-red-500 border-8'>
                    <JitsiMeeting
                        //  domain = "localhost:3000"
                        roomName='HopeHubOnlineTherapy'
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
                            displayName: `${user ? user.name : "Hope Hub"}`,
                        }}
                        onApiReady={(externalApi) => {
                            // here you can attach custom event listeners to the Jitsi Meet External API
                            // you can also store it locally to execute commands
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

export default CallRoom;
