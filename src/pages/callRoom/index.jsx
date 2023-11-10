import { JitsiMeeting } from "@jitsi/react-sdk";
import React from "react";

import Layout from "@/layout/Layout";

function index() {
    return (
        <>
            <Layout>
                <main className='pl-60 mt-10 border-red-500 border-8'>
                    <JitsiMeeting
                        //  domain = "localhost:3000"
                        roomName='PleaseUseAGoodRoomName'
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
                            displayName: "YOUR_USERNAME",
                        }}
                        onApiReady={(externalApi) => {
                            // here you can attach custom event listeners to the Jitsi Meet External API
                            // you can also store it locally to execute commands
                        }}
                        getIFrameRef={(iframeRef) => {
                            iframeRef.style.height = "600px";
                        }}
                    />
                </main>
            </Layout>
        </>
    );
}

export default index;
