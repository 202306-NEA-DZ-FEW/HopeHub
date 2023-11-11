import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { Slide, toast } from "react-toastify";

import Input from "@/components/Input/Input";

import Layout from "@/layout/Layout";
import { auth, db } from "@/util/firebase";

import therapistPic from "../../../public/assets/therapist-pic.jpg";

function Therapist() {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");
    const [licensenumber, setLicensenumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const router = useRouter();
    const pathname = usePathname().slice(1);
    function handleSubmit(e) {
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
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // console.log(userCredential.user)
                    // to verify the provided email is correct, it will be implemented after deployement
                    /*  sendEmailVerification(userCredential.user).then(() => {
                    console.log("verification email sent");
                }); */
                    updateProfile(userCredential.user, {
                        //after creating user, update his prfole and give him name
                        displayName: username,
                    })
                        .then((cred) => {
                            // const user = userCredential.user;
                            console.log("cred", cred);
                            console.log("user", userCredential);
                            setDoc(doc(db, "users", userCredential.user.uid), {
                                city: city,
                                licenseNumber: licensenumber,
                                isTherapist: true,
                            })
                                .then((data) => {
                                    router.push(`/thanks?from=${pathname}`); // redirect to thanks pages after registration
                                })
                                .catch((err) => {
                                    console.log("firestore error", err);
                                });
                        })
                        .catch((err) => {
                            console.log("updating error", err);
                        });
                    console.log(userCredential);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("can't sign up", errorMessage, " ", errorCode);
                    // ..
                });
            // reset the fields
            setEmail("");
            setUsername("");
            setConfirmpassword("");
            setPassword("");
            setLicensenumber("");
            setCity("");
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
        <Layout>
            <main className='flex flex-col  w-full h-fit py-4 '>
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
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
