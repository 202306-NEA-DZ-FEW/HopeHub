import AgoraRTC from "agora-rtc-sdk-ng";
import React, { useRef, useState } from "react";

export default function Videocall() {
    const [joined, setJoined] = useState(false);

    const rtc = {
        // For the local client
        client: null,
        // For the local audio and video tracks
        localAudioTrack: null,
        localVideoTrack: null,
    };

    const options = {
        // Pass your app ID here
        appId: "<your AppID>",
        // Pass a token if your project enables the App Certificate
        token: null,
    };

    const channelRef = useRef("");
    const remoteRef = useRef("");
    const leaveRef = useRef("");
    async function handleLeave(e) {}

    async function handleSubmit(e) {
        try {
            if (channelRef.current.value === "") {
                return console.log("Please Enter Channel Name");
            }
            setJoined(true);
            rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
            // Create an audio track from the audio captured by a microphone
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            // Create a video track from the video captured by a camera
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            // Play localStream
            rtc.localVideoTrack.play("local-stream");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className='container'>
                <input
                    type='text'
                    ref={channelRef}
                    id='channel'
                    placeholder='Enter Channel name'
                />
                <input
                    type='submit'
                    value='Join'
                    onClick={handleSubmit}
                    disabled={joined ? true : false}
                />
                <input
                    type='button'
                    ref={leaveRef}
                    value='Leave'
                    onClick={handleLeave}
                    disabled={joined ? false : true}
                />
            </div>
            {joined ? (
                <>
                    <div
                        id='local-stream'
                        className='stream local-stream'
                    ></div>
                    <div
                        id='remote-stream'
                        ref={remoteRef}
                        className='stream remote-stream'
                    ></div>
                </>
            ) : null}
        </>
    );
}
