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
import { useRef } from "react";
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
    const inputRef = useRef(null);

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const oldName = fullName;
    const oldPhone = phone;

    function uploadImage(e) {
        e.preventDefault();
        setUploadFile(e.target.files[0]);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "hopehub");
        // formData.append("type", "private");

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
        <span className='w-fit p-1 mb-5 mr-2 border rounded-3xl border-gray-500  group relative'>
            {txt}{" "}
            <button
                className='rounded-full w-4 opacity-0 group-hover:opacity-100 h-4 align-middle text-center absolute -right-1 -top-2  text-[10px] text-white bg-red-500'
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
        <Layout className=''>
            <div className='flex justify-center font-semibold font-poppins flex-col md:flex-row mt-20 max-w-screen'>
                <div className=' lg:w-[30%] md:[40%] flex '>
                    <div className='bg-NeutralBlack w-80 h-80 rounded-full mx-auto flex flex-col items-center justify-center relative overflow-visible'>
                        {user.photoURL ? (
                            <div className="w-full h-full rounded-full overflow-hidden"><Image
                                src={user.photoURL}
                                width={100}
                                height={100}
                                alt={user.name}
                                className="w-full h-full aspect-square object-cover "
                            /></div>
                        ) : (
                            <FaUser className='fill-NeutralWhite w-32 h-32 mb-5  ' />
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
                            className='absolute -bottom-8 cursor-pointer '
                            onClick={handleIconClick}
                        >
                            <LiaUserEditSolid className='text-NeutralBlack w-16 h-16 bg-NeutralWhite rounded-full border border-NeutralBlack p-2' />
                        </label>
                    </div>
                </div>
                <div className='flex items-center justify-center text-NeutralBlack md:w-2/3 lg:w-[50%] '>
                    <div className='mx-auto w-full max-w-[80%     px-4 mb-20'>
                        <h2 className='  py-5 px-6 text-4xl font-semibold'>
                            {t("profile info")}
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className='px-6 text-NeutralBlack'
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
                                    htmlFor='name'
                                    className=' mt-4 w-3/4 text-NeutralBlack '
                                >
                                    {t("education level")}
                                </label>
                                <select
                                    className='w-full rounded-md lg:text-xl border  border-slate-300 bg-white font-normal text-NeutralBlack py-3 px-4 outline-none '
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
                            <div className='mb-5 flex flex-col text-NeutralBlack'>
                                <div className="w-full flex"><label
                                    htmlFor='name'
                                    className=' mt-4 mb-3 w-3/4 text-xl'
                                >
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
                                    className='w-full rounded-md mb-5 lg:text-xl border font-normal px-4 border-slate-300 bg-white py-3 outline-none '
                                    onKeyDown={addHobby}
                                /></div>
                                <div className="flex flex-row flex-wrap">
                                    {hobbies?.map((hobby, id) => (
                                        <HobbyBtn key={id} txt={hobby} />
                                    ))}
                                </div>
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='Family Size'
                                    className=' mt-4 text-xl w-3/4 '
                                >
                                    {t("family size")}
                                </label>
                                <div className=' w-full '>
                                    <input
                                        type='number'
                                        name='Family Size'
                                        id='Family Size'
                                        min={0}
                                        max={30}
                                        value={familySize}
                                        onChange={(e) =>
                                            setFamilySize(e.target.value)
                                        }
                                        className='rounded-md border font-normal lg:text-xl border-slate-300 bg-white py-3 outline-none text-center '
                                    />
                                    <span className='mt-4 text-xl'>
                                        {" "}
                                        {t("members")}
                                    </span>
                                </div>
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='gender'
                                    className=' mt-4 text-xl w-3/4 '
                                >
                                    {t("gender")}
                                </label>
                                <select
                                    className='w-full rounded-md border font-normal lg:text-xl px-4 border-slate-300 bg-white py-3 outline-none '
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
                                    onChange={emailChanged}
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
                                    type='phone'
                                    name='phone'
                                    id='phone'
                                    className='w-full rounded-md border lg:text-xl font-normal px-4 border-slate-300 bg-white py-3 outline-none '
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='IDcard'
                                    className=' mt-4 text-xl w-3/4  '
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
                            <label className='mb-5 pt-5 block text-4xl font-semibold '>
                                {t("security")}
                            </label>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='password'
                                    className=' mt-4 text-xl w-3/4  '
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
                                        className='w-full rounded-md border lg:text-xl font-normal px-4 border-slate-300 bg-white py-3 outline-none '
                                    />
                                    <i className=' relative left-[90%] bottom-8 '>
                                        <FaLock></FaLock>
                                    </i>
                                </div>
                            </div>
                            <div className='mb-5 flex'>
                                <label
                                    htmlFor='Confirm Password'
                                    className=' mt-4 text-xl w-3/4  '
                                >
                                    {t("confirm password")}
                                </label>
                                <div className='w-full'>
                                    <input
                                        type='password'
                                        name='Confirm Password'
                                        className='w-full rounded-md border  font-normal px-4 border-slate-300 bg-white py-3 outline-none  '
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                    <i className=' relative left-[90%] bottom-8  '>
                                        <FaLock></FaLock>
                                    </i>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <button className='w-full bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500 rounded-md h-12'>
                                    {t("save changes")}
                                </button>
                                <button
                                    className='w-full bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500 rounded-md h-12'
                                    onClick={handleDelete}
                                >
                                    {t("delete account")}
                                </button>
                                <button className='w-full bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500 rounded-md h-12'>
                                    {t("cancel")}
                                </button>
                            </div>
                            <h2 className=' mb-5 pt-8 block text-4xl font-semibold '>
                                {t("payment section")}
                            </h2>
                            <div className='flex'>
                                <div className='mb-6 group w-1/3'>
                                    <label
                                        htmlFor='SHOW CARDS'
                                        className=' text-NeutralBlack text-xl pt-5 '
                                    >
                                        {t("cards added")}
                                    </label>
                                    <button
                                        name='SHOW CARDS'
                                        className='w-[94%] rounded-md h-12 mt-5 bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500 '
                                    >
                                        {t("show cards")}
                                    </button>
                                </div>
                                <div className='mb-5 group 1/3'>
                                    <label
                                        htmlFor='BUY TICKETS'
                                        className=' mt-4 text-xl w-3/4 pt-5 '
                                    >
                                        {t("tickets remaining")}
                                    </label>
                                    <button
                                        name='BUY TICKETS'
                                        className='w-[80%] rounded-md h-12 mt-5 bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
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
