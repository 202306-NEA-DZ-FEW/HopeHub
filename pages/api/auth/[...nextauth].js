import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { auth } from "@/util/firebase";

export const authOptions = {
    pages: {
        signIn: "/signin",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        credentials.email || "",
                        credentials.password || ""
                    );

                    if (userCredential.user) {
                        return userCredential.user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    // console.log(error);
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                }
            },
        }),
    ],
};

export default NextAuth(authOptions);
