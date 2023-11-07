// import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";

export default function UserProfile() {
    const { t } = useTranslation("common");
    const { user, setProfileUpdated, updateUserProfile, setUser } =
        useAppcontext();
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [bio, setBio] = useState("");
    const [uploadFile, setUploadFile] = useState("");
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
            alert("Full name and email are required");
        } else {
            await setUser({
                ...user,
                name: fullName,
                birthDate: birthDate,
                email: email,
                phoneNumber: phone,
                photoURL: cloudinaryImage,
            });
            await updateUserProfile();
        }
    }
    function uploadImage(e) {
        e.preventDefault();
        setUploadFile(e.target.files[0]);
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "hopehub");
        // formData.append("type", "private");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
        axios
            .post(
                "https://api.cloudinary.com/v1_1/dxic1agza/image/upload",
                formData
            )
            .then((response) => {
                console.log("cloudinary res", response);
                setCloudinaryImage(response.data.secure_url);
                setUser({ ...user, photoURL: response.data.secure_url });
                console.log("user after uploading image", user);
            })
            .catch((error) => {
                console.log("cloudinary err", error);
            });
    }

    return (
        <Layout className=''>
            <div className='flex justify-center font-semibold font-poppins flex-col md:flex-row mt-10 lg:mt-20 max-w-screen'>
                <div className='pb-12 lg:py-16 lg:w-[60%] md:[60%] flex '>
                    <div className='bg-NeutralBlack w-44 h-44 md:w-56 lg:h-56 md:h-56 rounded-full mx-auto flex flex-col items-center justify-center'>
                        {user.photoURL ? (
                            <Image
                                src={user.photoURL}
                                width={100}
                                height={100}
                                alt={user.name}
                            />
                        ) : (
                            <FaUser className='fill-NeutralWhite w-20 h-20 md:w-28 md:h-28 mb-5  ' />
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
                            className='absolute mt-44 lg:mt-56 cursor-pointer '
                            onClick={handleIconClick}
                        >
                            <LiaUserEditSolid className='text-NeutralBlack  w-12 h-12 md:w-14 md:h-14 bg-NeutralWhite rounded-full border border-NeutralBlack p-2' />
                        </label>
                    </div>
                </div>
                <div className='flex items-center justify-center text-NeutralBlack md:w-2/3 lg:w-full '>
                    <div className='mx-auto w-full lg:max-w-[80%] px-4 mb-20'>
                        <h2 className='lg:pt-5 pb-10 text-5xl font-semibold'>
                            {t("Therapist Profile")}
                        </h2>
                        <form
                            // onSubmit={handleSubmit}
                            className='px-6text-NeutralBlack'
                        >
                            <div className='mb-5 text-xl flex'>
                                <label
                                    htmlFor='name'
                                    className=' mt-4 w-3/4   '
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
                                    className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                                />
                            </div>
                            <div className='mb-5 text-xl flex'>
                                <label
                                    htmlFor='Bio'
                                    className=' mt-4 w-2/4 text-NeutralBlack '
                                >
                                    {t("Bio")}
                                </label>
                                <textarea
                                    type='text'
                                    id='bio'
                                    name='bio'
                                    value={bio}
                                    className='p-4 text-NeutralBlack w-[68%] h-[40%] text-xl font-poppins font-normal border border-slate-300 bg-white outline-none lg:h-full sm:h-full sm:leading-tight rounded-md '
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder=''
                                ></textarea>
                            </div>

                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='Birth Date'
                                    className=' mt-4 text-xl w-3/4 '
                                >
                                    {t("birth date")}
                                </label>
                                <input
                                    type='date'
                                    name='Birth Date'
                                    className='w-full rounded-md border  font-normal lg:text-xl px-4 border-slate-300 bg-white py-3 outline-none '
                                    value={birthDate}
                                    onChange={(e) =>
                                        setBirthDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='email'
                                    className=' mt-4 text-xl w-3/4  '
                                >
                                    {t("email")}
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='w-full rounded-md border font-normal lg:text-xl px-4 border-slate-300 bg-white py-3 outline-none '
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='phone'
                                    className=' mt-4 text-xl w-3/4  '
                                >
                                    {t("phone number")}
                                </label>
                                <input
                                    type='number'
                                    name='phone'
                                    id='phone'
                                    className='w-full rounded-md border lg:text-xl font-normal px-4 border-slate-300 bg-white py-3 outline-none '
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </form>
                        <div className=' py-4 lg:py-10 flex justify-end '>
                            <button
                                className='w-32 h-12 rounded-md text-lg font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
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

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}