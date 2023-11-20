var jsonwebtoken = require("jsonwebtoken");
// var uuid = require('uuid-random');
// import fs from 'fs'
/**
 * Function generates a JaaS JWT.
 */

export const generate = ({ privateKey, id, name, email, avatar }) => {
    // const privateKey= process.env.NEXT_PUBLIC_JITSI_KEY.replace(/\\n/g, '');
    // const privateKey = fs.readFileSync('./Jitsi_Key.pk')

    const kid = process.env.NEXT_PUBLIC_JITSI_API_KEY;
    const appId = process.env.NEXT_PUBLIC_JITSI;
    const now = new Date();

    // if (!privateKey || typeof privateKey !== 'string') {
    //   console.log('private key is not correct', typeof privateKey)
    //   return
    // }

    const jwt = jsonwebtoken.sign(
        {
            aud: "jitsi",
            context: {
                user: {
                    id: id,
                    name: name,
                    avatar: avatar,
                    email: email,
                    "hidden-from-recorder": false,
                    moderator: "false",
                },
                features: {
                    livestreaming: "true",
                    recording: "true",
                    transcription: "true",
                    "sip-outbound-call": false,
                    "outbound-call": "true",
                },
            },
            iss: "chat",
            room: "*",
            sub: appId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
            nbf: Math.round(new Date().getTime() / 1000) - 10,
        },
        privateKey,
        { algorithm: "RS256", header: { kid: kid } }
    );
    return jwt;
};
