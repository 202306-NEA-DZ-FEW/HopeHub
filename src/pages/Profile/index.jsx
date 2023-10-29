// import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import {
    deleteUser,
    updateEmail,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { FaLock, FaPlus, FaUser } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { auth, db } from "@/util/firebase";

export default function UserProfile() {
    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    const router = useRouter();
    const { t } = useTranslation("common");
    const { user, profileUpdated, setProfileUpdated, setUser } =
        useAppcontext();
    console.log("user profile", user);
    const [hobbyInput, setHobbyInput] = useState("");
    const [fullName, setFullName] = useState(user.name);
    const [education, setEducation] = useState(user.educationLevel || "");
    const [hobbies, setHobbies] = useState(user.hobbies || []);
    const [familySize, setFamilySize] = useState(user.familySize || 0);
    const [gender, setGender] = useState(user.gender || "");
    const [birthDate, setBirthDate] = useState(user.birthDate);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phoneNumber || "");
    // const [id, setId]= useState(user.id || '')
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldEmail, setOldEmail] = useState(email);

    const [uploadFile, setUploadFile] = useState("");
    const [cloudinaryImage, setCloudinaryImage] = useState("");

    const oldName = fullName;
    const oldPhone = phone;

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

    function handleEmailUpdate() {
        console.log("currentuser", auth.currentUser);
        updateEmail(auth.currentUser, email)
            .then((res) => console.log("email updated", res))
            .catch((err) => console.log("couldn't set email", err));
    }
    function handlePsswordChange() {
        updatePassword(user, password)
            .then(() => {
                // Update successful.
                console.log("password changed");
            })
            .catch((error) => {
                // An error ocurred
                console.log("could not change password", error);
            });
    }
    function handelNameChange() {
        updateProfile(auth.currentUser, {
            displayName: user.name,
        })
            .then(() => console.log("name changed "))
            .catch((err) => console.log("couldn't change name", err));
    }
    function handlePhoneChange() {
        updateProfile(auth.currentUser, {
            phoneNumber: user.phoneNumber,
        })
            .then(() => console.log("phone changed "))
            .catch((err) => console.log("couldn't change phone", err));
    }
    function handlePhotoChange() {
        updateProfile(auth.currentUser, {
            photoURL: user.photoURL,
        })
            .then(() => console.log("photo changed "))
            .catch((err) => console.log("couldn't change photo", err));
    }

    async function handleSubmit(e) {
        setProfileUpdated(true);
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("password does not match");
        } else {
            await setUser({
                ...user,
                name: fullName,
                educationLevel: education,
                hobbies: hobbies,
                familySize: familySize,
                gender: gender,
                birthDate: birthDate,
                email: email,
                phoneNumber: phone,
                password: password,
                photoURL: cloudinaryImage,
            });
            await updateUserProfile();

            console.log("new user", user);
        }
    }

    function emailChanged(e) {
        setEmail(e.target.value);
        console.log(oldEmail, "new", email);
        console.log("the email", email, email !== oldEmail);
    }

    function passwordChanged(e) {
        setPassword(e.target.value);
        console.log("the password", password !== "");
    }

    function addHobby(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            setHobbies([...hobbies, e.target.value]);
            setHobbyInput("");
        }
    }
    function deleteHobby(txt) {
        let newArr = hobbies.filter((hobby) => hobby !== txt);
        setHobbies(newArr);
    }
    const HobbyBtn = ({ txt }) => (
        <span className='w-fit p-1 border rounded-3xl border-gray-500 mx-px group relative'>
            {txt}{" "}
            <button
                className='rounded-full w-6 opacity-0 group-hover:opacity-100 h-6 border absolute right-0 -top-3 border-red-500 text-xs text-red-500'
                onClick={() => deleteHobby(txt)}
            >
                X
            </button>
        </span>
    );

    async function updateUserProfile() {
        console.log(
            "updating user profile function",
            oldEmail !== user.email ? "email changed" : "email not changed"
        );

        try {
            if (oldEmail !== user.email) handleEmailUpdate();
            if (password !== "") handlePsswordChange();
            if (user.name !== oldName) handelNameChange();
            if (user.phoneNumber !== oldPhone) handlePhoneChange();
            if (uploadFile) handlePhotoChange();
            await updateDoc(doc(db, "users", user.uid), {
                ...user,
            });
            console.log("save for uid", user.uid);
        } catch (err) {
            console.error(err);
            console.log("can't update", err);
        }
    }
    async function handleDelete() {
        const confirmDelete = window.confirm("Are you sure?");
        if (confirmDelete) {
            deleteUser(auth.currentUser)
                .then(() => {
                    console.log("user deleted");
                })
                .catch((error) => {
                    console.log("couldn't delete user", error);
                });
        } else {
            router.push("/thanks");
            alert("sorry to see you leave!");
        }
    }
    return (
        <Layout>
            <div className='flex justify-center mt-8 font-poppins font-black flex-col md:flex-row lg:flex-row xl:flex-row'>
                <div className='w-1/3 p-12 pl-40'>
                    <div className=' bg-black w-32 h-32 rounded-full justify-center flex items-center'>
                        {user.photoURL ? (
                            <Image
                                src={user.photoURL}
                                width={100}
                                height={100}
                                alt={user.name}
                            />
                        ) : (
                            <FaUser className='fill-white text-6xl'></FaUser>
                        )}
                        <input
                            type='file'
                            name='userImg'
                            id='userImg'
                            onChange={uploadImage}
                        />
                    </div>
                    <div className=' absolute left-52 top-64 w-8 h-8 bg-white rounded-full justify-center flex items-center border-2 border-black'>
                        <LiaUserEditSolid className=' text-xl'></LiaUserEditSolid>
                    </div>
                </div>
                <div className='flex items-center justify-center md:p-12 lg:p-12 md:w-2/3 lg:w-2/3 px-10'>
                    <div className='mx-auto w-full max-w-[550px] bg-white'>
                        <h2 className=' text-[50px] not-italic leading-[normal]'>
                            {t("profile info")}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-5 flex'>
                                <label htmlFor='name' className=' mt-4 w-1/2 '>
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
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label htmlFor='name' className=' mt-4 w-1/2 '>
                                    {t("education level")}
                                </label>
                                <select
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  outline-none '
                                    name='education'
                                    value={education}
                                    onChange={(e) =>
                                        setEducation(e.target.value)
                                    }
                                >
                                    <option value=''>
                                        {t("select level")}
                                    </option>
                                    <option value='secondary'>
                                        {t("secondary")}
                                    </option>
                                    <option value='bachelor'>
                                        {t("bachelor")}
                                    </option>
                                    <option value='master'>
                                        {t("master")}
                                    </option>
                                </select>
                            </div>
                            <div className='mb-5 flex flex-wrap'>
                                <label htmlFor='name' className=' mt-4 w-1/2 '>
                                    {t("hobbies")}
                                </label>
                                <input
                                    type='text'
                                    name='Hobbies'
                                    id='Hobbies'
                                    onChange={(e) =>
                                        setHobbyInput(e.target.value)
                                    }
                                    value={hobbyInput}
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                    onKeyDown={addHobby}
                                />
                                <div>
                                    {hobbies?.map((hobby, id) => (
                                        <HobbyBtn key={id} txt={hobby} />
                                    ))}
                                </div>
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='Family Size'
                                    className=' mt-4 w-1/2 '
                                >
                                    {t("family size")}
                                </label>
                                <div className=' w-full inline-flex gap-4'>
                                    <input
                                        type='number'
                                        name='Family Size'
                                        id='Family Size'
                                        min={0}
                                        max={100}
                                        value={familySize}
                                        onChange={(e) =>
                                            setFamilySize(e.target.value)
                                        }
                                        className='rounded-md border border-[#e0e0e0] bg-white py-3 outline-none text-center '
                                    />
                                    <span className='mt-4 '>
                                        {" "}
                                        {t("members")}
                                    </span>
                                </div>
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='gender'
                                    className=' mt-4 w-1/2 '
                                >
                                    {t("gender")}
                                </label>
                                <select
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  outline-none '
                                    name='gender'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value='Male'>{t("male")}</option>
                                    <option value='Femmale'>
                                        {t("female")}
                                    </option>
                                </select>
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='Birth Date'
                                    className=' mt-4 w-1/2 '
                                >
                                    {t("birth date")}
                                </label>
                                <input
                                    type='date'
                                    name='Birth Date'
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                    value={birthDate}
                                    onChange={(e) =>
                                        setBirthDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label htmlFor='email' className=' mt-4 w-1/2 '>
                                    {t("email")}
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                    value={email}
                                    onChange={emailChanged}
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label htmlFor='phone' className=' mt-4 w-1/2 '>
                                    {t("phone number")}
                                </label>
                                <input
                                    type='phone'
                                    name='phone'
                                    id='phone'
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='IDcard'
                                    className=' mt-4 w-1/2 '
                                >
                                    {t("upload id")}
                                </label>
                                <div className='overflow-hidden relative w-full '>
                                    <button
                                        disabled
                                        className='w-full rounded-md border border-[rgb(224,224,224)]  px-6 inline-flex items-center'
                                    >
                                        <input
                                            type='file'
                                            accept='image/*,.pdf'
                                            name='IDcard'
                                            className='w-full rounded-md py-3 outline-none  cursor-pointer  opacity-0 '
                                        />
                                        <FaPlus></FaPlus>
                                    </button>
                                </div>
                            </div>
                            <label className='mb-5 block text-4xl font-semibold '>
                                {t("security")}
                            </label>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='password'
                                    className=' mt-4 w-1/2 '
                                >
                                    {t("password")}
                                </label>
                                <div className='w-full'>
                                    <input
                                        type='password'
                                        name='password'
                                        id='password'
                                        value={password}
                                        onChange={passwordChanged}
                                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                    />
                                    <i className=' relative left-[19rem] bottom-8 '>
                                        <FaLock></FaLock>
                                    </i>
                                </div>
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='Confirm Password'
                                    className=' mt-4 w-1/2 '
                                >
                                    {t("confirm password")}
                                </label>
                                <div className='w-full'>
                                    <input
                                        type='password'
                                        name='Confirm Password'
                                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none  '
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                    <i className=' relative left-[19rem] bottom-8 '>
                                        <FaLock></FaLock>
                                    </i>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <button className='w-full bg-Accent hover:bg-Primary rounded-md h-12'>
                                    {t("save changes")}
                                </button>
                                <button
                                    className='w-full bg-Accent hover:bg-Primary rounded-md h-12'
                                    onClick={handleDelete}
                                >
                                    {t("delete account")}
                                </button>
                                <button className='w-full bg-Accent hover:bg-Primary rounded-md h-12'>
                                    {t("cancel")}
                                </button>
                            </div>
                            <h2 className=' my-5 block text-4xl font-semibold '>
                                {t("payment section")}
                            </h2>
                            <div className='flex gap-4'>
                                <div className='mb-5 '>
                                    <label
                                        htmlFor='SHOW CARDS'
                                        className=' mt-4 w-1/2 '
                                    >
                                        {t("cards added")}
                                    </label>
                                    <button
                                        name='SHOW CARDS'
                                        className='w-full bg-Accent hover:bg-Primary rounded-md h-12 my-3'
                                    >
                                        {t("show cards")}
                                    </button>
                                </div>
                                <div className='mb-5 '>
                                    <label
                                        htmlFor='BUY TICKETS'
                                        className=' mt-4 w-1/2 '
                                    >
                                        {t("tickets remaining")}
                                    </label>
                                    <button
                                        name='BUY TICKETS'
                                        className='w-full bg-Accent hover:bg-Primary rounded-md h-12 my-3'
                                    >
                                        {t("buy tickets")}
                                    </button>
                                </div>
                            </div>
                        </form>
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
