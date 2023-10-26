import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { auth } from "@/util/firebase";

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

    const { t } = useTranslation("common");

    function handleSignup(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log(userCredential.user)
                // to verify the provided email is correct, it will be implemented after deployement
                /*  sendEmailVerification(userCredential.user).then(() => {
                    console.log("verification email sent");
                }); */
                updateProfile(userCredential.user, {
                    //after creating user, update his prfole and give him name
                    displayName: firstname + " " + lastname,
                })
                    .then((cred) => {
                        // const user = userCredential.user;
                        console.log(cred);
                        router.push(`/thanks?from=${pathname}`); // redirect to thanks pages after registration
                    })
                    .catch((err) => {
                        console.log("updating error", err);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("can't sign up", errorMessage, " ", errorCode);
                // ..
            });
        // reset the fields
        setEmail("");
        setLastname("");
        setConfirmemail("");
        setConfirmpassword("");
        setBdate("");
        setPassword("");
        setFirstname("");
    }
    return (
        <>
            <div className='font-poppins flex flex-col items-start justify-center w-full '>
                <h2 className=' font-extrabold text-4xl text-black my-5'>
                    {t("Sign Up")}{" "}
                </h2>
                <form
                    onSubmit={handleSignup}
                    className='text-4xl p-3 w-full bg-NeutralWhite rounded-md shadow-md flex flex-col gap-4'
                >
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <input
                            id='Fname'
                            name={firstname}
                            type='text'
                            placeholder={t("fname")}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className='flex-1 input input-bordered w-full  h-16'
                        />
                        <input
                            id='Lname'
                            name={lastname}
                            type='text'
                            placeholder={t("lname")}
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className='flex-1 input input-bordered w-full h-16 '
                        />
                    </div>
                    <input
                        id='email'
                        name={email}
                        type='email'
                        placeholder={t("footer_msg_3")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input input-bordered w-full  h-16'
                    />
                    <input
                        id='email2'
                        name={confirmemail}
                        type='email'
                        placeholder={t("Confirm Email")}
                        value={confirmemail}
                        onChange={(e) => setConfirmemail(e.target.value)}
                        className='input input-bordered w-full h-16 '
                    />
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <input
                            id='password'
                            name={password}
                            type='password'
                            placeholder={t("enter password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='flex-1 input input-bordered w-full  h-16'
                        />
                        <input
                            id='password2'
                            name={confirmpassword}
                            type='password'
                            placeholder={t("Confirm Password")}
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            className='flex-1 input input-bordered w-full h-16 '
                        />
                    </div>
                    <div className='flex flex-row justify-between items-center text-lg gap-4'>
                        <label htmlFor='bdate' className='text-right w-1/2'>
                            {t("bdate")}
                        </label>
                        <input
                            type='date'
                            name={bdate}
                            id='bdate'
                            value={bdate}
                            onChange={(e) => setBdate(e.target.value)}
                            className=' w-1/2 input h-16 border'
                        />
                    </div>
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <button
                            type=''
                            className='btn font-bold  text-Accent border-Accent flex-1'
                            onClick={() => {
                                setChecked("login");
                            }}
                        >
                            {t("Log In")}{" "}
                        </button>
                        <button
                            type='submit'
                            className={`btn font-bold flex-1 ${
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
