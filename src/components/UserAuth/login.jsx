import { signInWithEmailAndPassword } from "firebase/auth";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

import { useAppcontext } from "@/context/state";
import { auth } from "@/util/firebase";

// After successful login

function Login({ isChecked, setChecked }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { t } = useTranslation("common");
    const { authChange } = useAppcontext();

    const [user, setUser] = useState(null); // Initialize user state as null

    function handleLogin(e) {
        e.preventDefault();
        const specialToken = process.env.NEXT_PUBLIC_SPECIAL_TOKEN;
        console.log("tokeeeen", specialToken);
        if (email === "admin@hopehub.com") {
            if (password === "hopehub2023") {
                console.log("aaaaaaaa", specialToken);
                router.push(`/admin?specialToken=${specialToken}`);
            } else {
                alert("Wrong password");
            }
            return;
        }
        authChange();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const loggedInUser = userCredential.user;

                // Set cookie for 7 days
                Cookie.set("loggedInUser", loggedInUser.uid, { expires: 7 });

                // Update the user state
                setUser(loggedInUser);

                router.push("/");
            })
            .catch(() => {
                toast.error("Can't log in", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 2500,
                    transition: Slide,
                    className:
                        "dark:bg-slate-800 dark:text-NeutralWhite text-NeutralBlack bg-NeutralWhite",
                });
            });
    }

    return (
        <>
            <div className='font-poppins flex flex-col items-start justify-center w-full '>
                <h2 className=' font-extrabold text-4xl text-NeutralBlack my-8'>
                    {t("Log In")}
                </h2>
                <form
                    onSubmit={handleLogin}
                    className='text-4xl p-6 w-full bg-NeutralWhite dark:bg-Dark_Primary rounded-md shadow-md flex flex-col gap-4'
                >
                    <input
                        type='email'
                        placeholder={t("footer_msg_3")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input input-bordered w-full bg-NeutralWhite text-NeutralBlack mb-2 mt-1   '
                    />
                    <input
                        type='password'
                        placeholder={t("enter password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input input-bordered w-full bg-NeutralWhite text-NeutralBlack mb-2 '
                    />
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <button
                            type='submit'
                            className={`btn font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500  flex-1 ${
                                isChecked === "login" ? "" : ""
                            }`}
                        >
                            {t("Log In")}{" "}
                        </button>
                        <button
                            type=''
                            className='btn font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500  flex-1'
                            onClick={() => {
                                setChecked("signup");
                            }}
                        >
                            {t("Sign Up")}{" "}
                        </button>
                    </div>
                    <span
                        className='text-Accent font-semibold text-lg text-right cursor-pointer m mt-1 mb-2 focus:border-b-2 border-Accent'
                        onClick={() => {
                            setChecked("forgot");
                        }}
                    >
                        {t("forgot")}
                    </span>
                </form>
            </div>
        </>
    );
}

export default Login;
