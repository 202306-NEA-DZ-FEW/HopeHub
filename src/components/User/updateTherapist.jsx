// import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { Slide, toast } from "react-toastify";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { auth, db } from "@/util/firebase";

export default function TherapistProfile(user) {
    const { t } = useTranslation("common");
    const { setProfileUpdated, setUser } = useAppcontext();
    const [fullName, setFullName] = useState(user.name || "");
    const [birthDate, setBirthDate] = useState(user.birthDate || "");
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phoneNumber);
    const [bio, setBio] = useState(user.bio || "");
    const [cloudinaryImage, setCloudinaryImage] = useState("");
    const inputRef = useRef(null);

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    async function handleSubmit(e) {
        setProfileUpdated(true);
        e.preventDefault();
        if (!fullName || !email) {
            toast.warning("Full name and email are required", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
                transition: Slide,
                className:
                    "dark:bg-slate-800 dark:text-NeutralWhite text-NeutralBlack bg-NeutralWhite",
            });
        } else {
            await setUser({
                ...user,
                name: fullName,
                birthDate: birthDate,
                email: email,
                phoneNumber: phone,
                photoURL: cloudinaryImage,
                bio: bio,
            });
            await updateUserProfile();
            toast.success("profile updated", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
                transition: Slide,
                className:
                    "dark:bg-slate-800 dark:text-NeutralWhite text-NeutralBlack bg-NeutralWhite",
            });
        }
    }
    function handleNameChange() {
        updateProfile(auth.currentUser, {
            displayName: fullName,
        })
            .then(() => console.log("name changed "))
            .catch((err) => console.log("couldn't change name", err));
    }
    function handlePhotoChange() {
        updateProfile(auth.currentUser, {
            photoURL: cloudinaryImage,
        })
            .then(() => console.log("photo changed "))
            .catch((err) => console.log("couldn't change photo", err));
    }
    async function updateUserProfile() {
        try {
            if (fullName !== auth.currentUser.displayName) handleNameChange();
            if (cloudinaryImage !== auth.currentUser.photoURL)
                handlePhotoChange();
            await updateDoc(doc(db, "users", user.uid), {
                ...user,
                name: fullName,
                birthDate: birthDate,
                email: email,
                phoneNumber: phone,
                photoURL: cloudinaryImage,
                bio: bio,
            });
            console.log("saved for user", auth.currentUser);
        } catch (err) {
            console.error("couldn't update", err);
        }
    }
    function uploadImage(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "hopehub");

        axios
            .post(
                "https://api.cloudinary.com/v1_1/dxic1agza/image/upload",
                formData
            )
            .then((response) => {
                setCloudinaryImage(response.data.secure_url);
                setUser({ ...user, photoURL: response.data.secure_url });
            })
            .catch((error) => {
                console.log("cloudinary err", error);
            });
    }

    return (
        <Layout user={user}>
            <Head>
                <title>{t("Update therapist profile")}</title>
            </Head>
            <div className='flex justify-center font-semibold font-poppins flex-col md:flex-row  max-w-screen bg-NeutralWhite dark:bg-NeutralBlack'>
                <div className='pb-12 lg:py-16 lg:w-[60%] md:[60%] flex '>
                    <div className='bg-NeutralBlack dark:bg-NeutralWhite border-2 w-80 h-80 rounded-full mx-auto flex flex-col items-center justify-center relative overflow-visible'>
                        {user.photoURL ? (
                            <div className='w-full h-full rounded-full overflow-hidden'>
                                <Image
                                    src={user.photoURL}
                                    width={100}
                                    height={100}
                                    alt={user.name}
                                    className='w-full h-full aspect-square object-cover '
                                />
                            </div>
                        ) : (
                            <FaUser className='fill-NeutralWhite dark:fill-NeutralBlack w-16 h-16 md:w-24 md:h-24 mb-5  ' />
                        )}

                        <input
                            ref={inputRef}
                            className='hidden'
                            type='file'
                            name='userImg'
                            id='userImg'
                            onChange={uploadImage}
                        />

                        <label
                            className='absolute -mb-[19rem] cursor-pointer '
                            onClick={handleIconClick}
                        >
                            <LiaUserEditSolid className='text-NeutralBlack dark:text-NeutralWhite  w-12 h-12 md:w-14 md:h-14 bg-NeutralWhite dark:bg-NeutralBlack rounded-full border-2 dark:border-NeutralWhite border-NeutralBlack p-2' />
                        </label>
                    </div>
                </div>
                <div className='flex items-center justify-center text-NeutralBlack dark:text-NeutralWhite md:w-2/3 lg:w-full '>
                    <div className='mx-auto w-full lg:max-w-[80%]  mb-20'>
                        <h2 className='lg:pt-5 pb-10 text-5xl font-semibold'>
                            {t("Therapist Profile")}
                        </h2>
                        <form
                            // onSubmit={handleSubmit}
                            className=''
                        >
                            <div className='mb-5 text-xl flex'>
                                <label
                                    htmlFor='name'
                                    className=' mt-4 w-3/4 text-NeutralBlack dark:text-NeutralWhite  '
                                >
                                    {t("full name")}
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className='w-full text-NeutralBlack  font-normal text-lg px-4 rounded-md border border-slate-300 bg-NeutralWhite py-3 outline-none '
                                />
                            </div>
                            <div className='mb-5 text-xl flex'>
                                <label
                                    htmlFor='Bio'
                                    className=' mt-4 w-2/4 text-NeutralBlack dark:text-NeutralWhite '
                                >
                                    {t("Bio")}
                                </label>
                                <textarea
                                    type='text'
                                    id='bio'
                                    name='bio'
                                    value={bio}
                                    className='p-4 text-NeutralBlack  w-[68%] h-[40%] text-xl font-poppins font-normal border border-slate-300 bg-NeutralWhite outline-none lg:h-full sm:h-full sm:leading-tight rounded-md '
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder=''
                                ></textarea>
                            </div>

                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='Birth Date'
                                    className=' mt-4 text-xl w-3/4 text-NeutralBlack dark:text-NeutralWhite'
                                >
                                    {t("birth date")}
                                </label>
                                <input
                                    type='date'
                                    name='Birth Date'
                                    className='w-full rounded-md border text-NeutralBlack  font-normal lg:text-xl px-4 border-slate-300 bg-NeutralWhite py-3 outline-none '
                                    value={birthDate}
                                    onChange={(e) =>
                                        setBirthDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='email'
                                    className=' mt-4 text-xl w-3/4 text-NeutralBlack dark:text-NeutralWhite '
                                >
                                    {t("email")}
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='w-full rounded-md border text-NeutralBlack  font-normal lg:text-xl px-4 border-slate-300 bg-NeutralWhite py-3 outline-none '
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='phone'
                                    className=' mt-4 text-xl w-3/4 text-NeutralBlack dark:text-NeutralWhite  '
                                >
                                    {t("phone number")}
                                </label>
                                <input
                                    type='number'
                                    name='phone'
                                    id='phone'
                                    className='w-full rounded-md text-NeutralBlack  border lg:text-xl font-normal px-4 border-slate-300 bg-NeutralWhite py-3 outline-none '
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </form>
                        <div className=' py-4  flex justify-end '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                                onClick={handleSubmit}
                            >
                                {t("Update")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ["common"])),
//             // Will be passed to the page component as props
//         },
//     };
// }
