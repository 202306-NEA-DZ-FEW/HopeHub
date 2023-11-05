import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/util/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "next-i18next";

function Login({ isChecked, setChecked }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { t } = useTranslation("common");

    function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential.user.emailVerified) {
                    console.log("user", userCredential);
                    router.push("/thanks");
                } else {
                    console.log("verify email");
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("can't log in", errorMessage, " ", errorCode);
            });
    }

    return (
        <>
            <div className='font-poppins flex flex-col items-start justify-center w-full '>
                <h2 className=' font-extrabold text-4xl text-black my-5'>
                    {t("Log In")}
                </h2>
                <form
                    onSubmit={handleLogin}
                    className='text-4xl p-3 w-full bg-NeutralWhite rounded-md shadow-md flex flex-col gap-4'
                >
                    <input
                        type='email'
                        placeholder={t("footer_msg_3")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input input-bordered w-full  h-16'
                    />
                    <input
                        type='password'
                        placeholder={t("enter password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input input-bordered w-full h-16 '
                    />
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <button
                            type='submit'
                            className={`btn font-bold hover:text-Accent flex-1 ${
                                isChecked === "login"
                                    ? "bg-Accent text-white"
                                    : "text-Accent border-Accent"
                            }`}
                        >
                            {t("Log In")}{" "}
                        </button>
                        <button
                            type=''
                            className='btn font-bold  text-Accent border-Accent flex-1'
                            onClick={() => {
                                setChecked("signup");
                            }}
                        >
                            {t("Sign Up")}{" "}
                        </button>
                    </div>
                    <span
                        className='text-Accent font-semibold text-lg text-right cursor-pointer'
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
