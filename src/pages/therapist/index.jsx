import { parse } from "cookie";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Cookie from "js-cookie";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { Slide, toast } from "react-toastify";

import Input from "@/components/Input/Input";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { auth, db } from "@/util/firebase";

import therapistPic from "../../../public/assets/therapist-pic.jpg";

function Therapist({ user }) {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");
    const [licensenumber, setLicensenumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const router = useRouter();
    const pathname = usePathname().slice(1);
    const { authChange } = useAppcontext();

    const addUserToFirestore = async (userCredential, userData) => {
        try {
            const docRef = doc(db, "users", userCredential.user.uid);
            await setDoc(docRef, userData);
        } catch (error) {
            console.error("Firestore error:", error);
        }
    };
    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmpassword) {
            toast.warning("password does not match", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
                transition: Slide,
                className:
                    "dark:bg-slate-800 dark:text-NeutralWhite text-NeutralBlack bg-NeutralWhite",
            });
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const userData = {
                    uid: userCredential.user.uid,
                    isTherapist: true,
                    licenseNumber: licensenumber,
                    name: username,
                    email: email,
                    city: city,
                };
                await updateProfile(userCredential.user, {
                    displayName: username,
                });
                await addUserToFirestore(userCredential, userData);
                Cookie.set("loggedInUser", userCredential.user.uid, {
                    expires: 7,
                });
                router.push(`/thanks?from=${pathname}`);
                authChange();
            } catch (error) {
                console.error("Signup error:", error);
                toast.error("Can't Sign up", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 2500,
                });
            } finally {
                setEmail("");
                setUsername("");
                setConfirmpassword("");
                setPassword("");
                setLicensenumber("");
                setCity("");
            }
        }
    }
    const infos = [
        {
            label: "User Name",
            id: "therapistName",
            name: "therapistName",
            type: "text",
            state: username,
            setstate: setUsername,
        },
        {
            label: "Email",
            id: "therapistEmail",
            name: "therapistEmail",
            type: "email",
            state: email,
            setstate: setEmail,
        },
        {
            label: "City",
            id: "therapistCity",
            name: "therapistCity",
            type: "text",
            state: city,
            setstate: setCity,
        },
        {
            label: "License Number",
            id: "therapistLicense",
            name: "therapistLicense",
            type: "text",
            state: licensenumber,
            setstate: setLicensenumber,
        },
        {
            label: "password",
            id: "therapistPassword",
            name: "therapistPassword",
            type: "password",
            state: password,
            setstate: setPassword,
        },
        {
            label: "Confirm Password",
            id: "therapistPassword2",
            name: "therapistPassword2",
            type: "password",
            state: confirmpassword,
            setstate: setConfirmpassword,
        },
    ];
    return (
        <Layout user={user}>
            <Head>
                <title>{t("Therapist Profile")}</title>
            </Head>
            <main className='flex flex-col  w-full h-fit py-4 mb-20 mt-6 '>
                <h1 className='text-NeutralBlack dark:text-NeutralWhite text-center px-4 text-4xl md:text-6xl font-poppins font-semibold md:font-bold w-full'>
                    {/* Create{" "}
                        <span className='text-Accent font-aclonica font-medium'>
                            Therapist
                        </span>{" "}
                        account */}
                    {t("Create a")}{" "}
                    <span className='text-Accent font-aclonica font-medium'>
                        {t("Therapist")}
                    </span>{" "}
                    {t("account")}
                </h1>
                <div className='w-[70%] mx-auto  shadow-[4px_8px_8px_rgba(0,0,0,42%)] flex flex-row justify-center gap-5 items-center mt-5  border-NeutralBlack bg-NeutralWhite dark:bg-Dark_Accent rounded-md py-4'>
                    <form
                        onSubmit={handleSubmit}
                        className=' flex flex-col gap-3 w-full md:w-3/4 lg:w-1/2 pl-6 '
                    >
                        {infos.map((info) => (
                            <Input
                                label={info.label}
                                id={info.id}
                                name={info.name}
                                type={info.type}
                                key={info.id}
                                state={info.state}
                                setstate={info.setstate}
                            />
                        ))}
                        <div className='flex justify-end py-4 pr-2'>
                            <button
                                type='submit'
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                            >
                                Create
                            </button>
                        </div>
                    </form>
                    <Image
                        src={therapistPic}
                        alt='Hope Hub'
                        width={420}
                        className='hidden lg:block rounded-lg pr-6 pb-9 brightness-90'
                    />
                </div>
            </main>
        </Layout>
    );
}

export default Therapist;

export async function getServerSideProps({ locale, req }) {
    // Check if there is a logged-in user
    // const cookies = parse(req.headers.cookie || "");
    // const userId = cookies.loggedInUser;

    // if (!userId || userId == "undefined") {
    //     return { redirect: { destination: "/Auth", permanent: false } };
    // }

    try {
        // User is not logged in
        return {
            props: {
                ...(await serverSideTranslations(locale, ["common"])),
            },
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { props: { error: "Error fetching user data" } };
    }
}
