/* eslint-disable no-undef */
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Cookie from "js-cookie";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import React from "react";
import { Slide, toast } from "react-toastify";

import { useAppcontext } from "@/context/state";
import { auth, db } from "@/util/firebase";

function Signup({ isChecked, setChecked }) {
    const [email, setEmail] = useState("");
    const [confirmemail, setConfirmemail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [bdate, setBdate] = useState("");
    const router = useRouter();
    const pathname = usePathname().slice(1);
    const { authChange } = useAppcontext();
    const { t } = useTranslation("common");

    const handleSignup = async (e) => {
        e.preventDefault();

        if (email !== confirmemail || password !== confirmpassword) {
            toast.warning("Email or password does not match", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
                transition: Slide,
                className:
                    "dark:bg-slate-800 dark:text-NeutralWhite text-NeutralBlack bg-NeutralWhite",
            });
            return;
        }

        try {
            // create the user in firebase
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            //this data will be stored in firestore
            const userData = {
                uid: userCredential.user.uid, // Save the UID
                birthDate: bdate,
                isTherapist: false,
                licenseNumber: null,
                name: `${firstname} ${lastname}`,
                email: email,
            };
            // we update the user name
            await updateProfile(userCredential.user, {
                displayName: `${firstname} ${lastname}`,
            });
            // we save the user infos in firestore
            await addUserToFirestore(userCredential, userData);
            //we store the uid in cookie to keep him logged in
            Cookie.set("loggedInUser", userCredential.user.uid, { expires: 7 });
            router.push(`/thanks?from=${pathname}`);
            authChange();

            const actionCodeSettings = {
                url: `http://localhost:3000/en/?userid=${auth.currentUser.uid}`,
            };
            await sendEmailVerification(auth.currentUser, actionCodeSettings);
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Can't Sign up", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
            });
        } finally {
            // reste all the fields
            setEmail("");
            setLastname("");
            setConfirmemail("");
            setConfirmpassword("");
            setBdate("");
            setPassword("");
            setFirstname("");
        }
    };

    const addUserToFirestore = async (userCredential, userData) => {
        try {
            const docRef = doc(db, "users", userCredential.user.uid);
            console.log("im db", db);
            console.log("im doc ref", docRef);
            console.log("im user here", userCredential.user.uid);
            console.log("im userData", userData);
            await setDoc(docRef, userData);
            console.log("User data added to Firestore");
        } catch (error) {
            console.error("Firestore error:", error);
        }
    };

    return (
        <>
            <div className=' font-poppins flex flex-col items-start justify-center w-full '>
                <Head>
                    <title>Sign Up</title>
                </Head>
                <h2 className=' font-extrabold text-4xl text-NeutralBlack my-8'>
                    {t("Sign Up")}{" "}
                </h2>
                <form
                    onSubmit={handleSignup}
                    className='text-4xl  p-6 w-full bg-NeutralWhite dark:bg-Dark_Primary rounded-md shadow-md flex flex-col gap-4'
                >
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <input
                            id='Fname'
                            name={firstname}
                            type='text'
                            placeholder={t("fname")}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className='flex-1 input input-bordered w-full bg-NeutralWhite text-NeutralBlack  h-16'
                            required
                        />
                        <input
                            id='Lname'
                            name={lastname}
                            type='text'
                            placeholder={t("lname")}
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className='flex-1 input input-bordered w-full bg-NeutralWhite text-NeutralBlack  h-16 '
                            required
                        />
                    </div>
                    <input
                        id='email'
                        name={email}
                        type='email'
                        placeholder={t("Enter your e-mail")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input input-bordered w-full bg-NeutralWhite text-NeutralBlack  h-16'
                        required
                    />
                    <input
                        id='email2'
                        name={confirmemail}
                        type='email'
                        placeholder={t("Confirm Email")}
                        value={confirmemail}
                        onChange={(e) => setConfirmemail(e.target.value)}
                        className='input input-bordered w-full bg-NeutralWhite text-NeutralBlack  h-16 '
                        required
                    />
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <input
                            id='password'
                            name={password}
                            type='password'
                            placeholder={t("enter password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='flex-1 input input-bordered w-full bg-NeutralWhite text-NeutralBlack h-16'
                            required
                        />
                        <input
                            id='password2'
                            name={confirmpassword}
                            type='password'
                            placeholder={t("Confirm Password")}
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            className='flex-1 input input-bordered w-full bg-NeutralWhite text-NeutralBlack h-16 '
                            required
                        />
                    </div>
                    <div className='flex flex-row justify-between items-center text-lg gap-4'>
                        <label
                            htmlFor='bdate'
                            className='text-right w-1/2  text-NeutralBlack dark:text-NeutralWhite '
                        >
                            {t("bdate")}
                        </label>
                        <input
                            type='date'
                            name={bdate}
                            id='bdate'
                            value={bdate}
                            onChange={(e) => setBdate(e.target.value)}
                            className=' w-1/2 input h-16 bg-NeutralWhite text-NeutralBlack border'
                            required
                        />
                    </div>
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <button
                            type='submit'
                            className='btn font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite  dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500  flex-1'
                            onClick={() => {
                                setChecked("login");
                            }}
                        >
                            {t("Log In")}{" "}
                        </button>
                        <button
                            type=''
                            className={`btn font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite  dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500  flex-1 ${
                                isChecked === "signup"
                                    ? "bg-Accent text-white"
                                    : "text-Accent border-Accent"
                            } hover:text-Accent`}
                        >
                            {t("Sign Up")}{" "}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signup;
