import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect } from "react";

import Forgot from "@/components/UserAuth/forgot";
import Login from "@/components/UserAuth/login";
import Signup from "@/components/UserAuth/signup";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { auth, db } from "@/util/firebase";

import fb from "../../../public/assets/Facebook-icon.svg";
import google from "../../../public/assets/Google-icon.svg";
import hopeText from "../../../public/assets/HopeText.svg";

function Auth() {
    const { authChange, user } = useAppcontext();
    const router = useRouter();
    const pathname = usePathname().slice(1);
    const [checked, setChecked] = useState("login");
    const tab =
        checked === "login" ? (
            <Login isChecked={checked} setChecked={setChecked} />
        ) : checked === "signup" ? (
            <Signup isChecked={checked} setChecked={setChecked} />
        ) : (
            <Forgot isChecked={checked} setChecked={setChecked} />
        );
    const provider = new GoogleAuthProvider();
    const FbProvider = new FacebookAuthProvider();
    const { t } = useTranslation("common");

    function handleGoogleAuth() {
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        auth.useDeviceLanguage(); // user' browser default language
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("user", user);
                setDoc(doc(db, "users", user.uid), {
                    isTherapist: false,
                    licenseNumber: null,
                })
                    .then((data) => {
                        console.log("data", data);
                        router.push(`/thanks?from=${pathname}`); // redirect to thanks pages after registration
                    })
                    .then(() => authChange())
                    .catch((err) => {
                        console.log("firestore error", err);
                    });
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                console.log(credential);
                // ...
            });
    }
    function handleFbAuth() {
        auth.useDeviceLanguage();
        signInWithPopup(auth, FbProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log("fb user", user);
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential =
                    FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }
    return (
        <Layout>
            <main
                className='pt-28 pb-8 relative dark:brightness-90 w-full h-fit bg-no-repeat px-2 bg-cover flex flex-col justify-center gap-4 md:flex-row md:justify-center -mt-24'
                style={{ backgroundImage: "url('/assets/login-bg.svg')" }}
            >
                <section className=' flex flex-col items-start gap-0 p-1 mx-auto md:mr-28'>
                    <h1 className='w-full text-left font-poppins font-bold text-NeutralBlack  text-5xl lg:text-6xl relative top-12 md:top-20'>
                        {t("welcome")}
                    </h1>
                    <Image
                        src={hopeText}
                        alt='Hope Hub '
                        width={500}
                        height={500}
                        className='lg:w-[450px] md:w-[350px] mt-2 lg:mt-6 '
                    />
                </section>
                <section className=' md:w-1/3 w-full flex-col items-center gap-4 flex px-4 mx-auto'>
                    {tab}
                    <span
                        className="relative w-full flex flex-row text-center justify-center text-Accent font-bold text-xl
          before:content-[''] before:bg-Accent before:w-2/5 before:h-[2px] before:absolute before:left-0 before:top-1/2
          after:content-[''] after:bg-Accent after:w-2/5 after:h-[2px] after:absolute after:right-0 after:top-1/2"
                    >
                        {t("or")}
                    </span>
                    <div className='flex flex-row justify-center gap-8 items-center w-full'>
                        <button onClick={handleFbAuth}>
                            <Image src={fb} width={35} height={30}></Image>
                        </button>
                        <button onClick={handleGoogleAuth}>
                            <Image src={google} width={35} height={30}></Image>
                        </button>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Auth;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
