import { sendPasswordResetEmail } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { auth } from "@/util/firebase";

function Forgot({ isChecked, setChecked }) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const { t } = useTranslation("common");

    function handleForgot(e) {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then((res) => {
                console.log("check your email", res);
                router.push("/thanks");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    return (
        <>
            <div className='font-poppins flex flex-col items-start justify-center w-full '>
                <Head>
                    <title>Password Reset</title>
                </Head>
                <h2 className=' font-extrabold text-4xl text-NeutralBlack  my-5'>
                    {" "}
                    {t("forgot")}{" "}
                </h2>
                <form
                    onSubmit={handleForgot}
                    className='text-4xl p-6 w-full bg-NeutralWhite dark:bg-Dark_Primary rounded-md shadow-md flex flex-col gap-4'
                >
                    <button
                        type=''
                        className='flex flex-row justify-start items-center text-lg gap-2 font-bold  text-Accent '
                        onClick={() => {
                            setChecked("login");
                        }}
                    >
                        {" "}
                        <FiArrowLeft /> {t("Back")}{" "}
                    </button>
                    <input
                        type='email'
                        placeholder={t("footer_msg_3")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input input-bordered w-full bg-NeutralWhite text-NeutralBlack h-16'
                    />
                    <button
                        type='submit'
                        className='btn bg-Accent text-NeutralBlack dark:text-NeutralWhite  dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8]  hover:scale-105 duration-500 text-center ml-auto flex flex-row justify-start items-center  gap-2 font-bold hover:text-Accent hover:border-Accent'
                    >
                        {t("Send Email")}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Forgot;
