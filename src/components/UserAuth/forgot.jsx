import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { auth } from "@/util/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from "next-i18next";

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
                <h2 className=' font-extrabold text-4xl text-black my-5'>
                    {" "}
                    {t("forgot")}{" "}
                </h2>
                <form
                    onSubmit={handleForgot}
                    className='text-4xl p-3 w-full bg-NeutralWhite rounded-md shadow-md flex flex-col gap-4'
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
                        className='input input-bordered w-full  h-16'
                    />
                    <button
                        type='submit'
                        className='btn bg-Accent text-center ml-auto text-white flex flex-row justify-start items-center  gap-2 font-bold hover:text-Accent hover:border-Accent'
                    >
                        {t("Send Email")}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Forgot;
