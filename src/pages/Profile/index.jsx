import Layout from "@/layout/Layout";
import React from "react";
import { useTranslation } from "next-i18next";
import { FaUser, FaPlus } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function UserProfile() {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <div className='flex justify-center mt-8 font-poppins font-black flex-col md:flex-row lg:flex-row xl:flex-row'>
                <div className='w-1/3 p-12 pl-40'>
                    <div className=' bg-black w-32 h-32 rounded-full justify-center flex items-center'>
                        <FaUser className='fill-white text-6xl'></FaUser>
                    </div>
                    <div className=' absolute left-52 top-64 w-8 h-8 bg-white rounded-full justify-center flex items-center border-2 border-black'>
                        <LiaUserEditSolid className=' text-xl'></LiaUserEditSolid>
                    </div>
                </div>
                <div class='flex items-center justify-center md:p-12 lg:p-12 md:w-2/3 lg:w-2/3 px-10'>
                    <div class='mx-auto w-full max-w-[550px] bg-white'>
                        <h2 className=' text-[50px] not-italic leading-[normal]'>
                            {t("profile info")}
                        </h2>
                        <form>
                            <div class='mb-5 flex'>
                                <label for='name' class=' mt-4 w-1/2 '>
                                    {t("full name")}
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div class='mb-5 flex'>
                                <label for='name' class=' mt-4 w-1/2 '>
                                    {t("education level")}
                                </label>
                                <select
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  outline-none '
                                    name='education'
                                >
                                    <option value='value1'>
                                        {t("secondary")}
                                    </option>
                                    <option value='value2' selected>
                                        {t("bachelor")}
                                    </option>
                                    <option value='value3'>
                                        {t("master")}
                                    </option>
                                </select>
                            </div>
                            <div class='mb-5 flex'>
                                <label for='name' class=' mt-4 w-1/2 '>
                                    {t("hobbies")}
                                </label>
                                <input
                                    type='text'
                                    name='Hobbies'
                                    id='Hobbies'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div class='mb-5 flex'>
                                <label for='Family Size' class=' mt-4 w-1/2 '>
                                    {t("family size")}
                                </label>
                                <div className=' w-full inline-flex gap-4'>
                                    <input
                                        type='number'
                                        name='Family Size'
                                        id='Family Size'
                                        min={1}
                                        max={100}
                                        class='rounded-md border border-[#e0e0e0] bg-white py-3 outline-none text-center '
                                    />
                                    <span className='mt-4 '>
                                        {" "}
                                        {t("members")}
                                    </span>
                                </div>
                            </div>
                            <div class='mb-5 flex'>
                                <label for='gender' class=' mt-4 w-1/2 '>
                                    {t("gender")}
                                </label>
                                <select
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  outline-none '
                                    name='gender'
                                >
                                    <option value='Male'>{t("male")}</option>
                                    <option value='Femmale' selected>
                                        {t("female")}
                                    </option>
                                </select>
                            </div>
                            <div class='mb-5 flex'>
                                <label for='Birth Date' class=' mt-4 w-1/2 '>
                                    {t("birth date")}
                                </label>
                                <input
                                    type='date'
                                    name='Birth Date'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div class='mb-5 flex'>
                                <label for='email' class=' mt-4 w-1/2 '>
                                    {t("email")}
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div class='mb-5 flex'>
                                <label for='phone' class=' mt-4 w-1/2 '>
                                    {t("phone number")}
                                </label>
                                <input
                                    type='phone'
                                    name='phone'
                                    id='phone'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div class='mb-5 flex'>
                                <label for='IDcard' class=' mt-4 w-1/2 '>
                                    {t("upload id")}
                                </label>
                                <div className='overflow-hidden relative w-full '>
                                    <button
                                        disabled
                                        class='w-full rounded-md border border-[rgb(224,224,224)]  px-6 inline-flex items-center'
                                    >
                                        <input
                                            type='file'
                                            accept='image/*,.pdf'
                                            name='IDcard'
                                            class='w-full rounded-md py-3 outline-none  cursor-pointer  opacity-0 '
                                        />
                                        <FaPlus></FaPlus>
                                    </button>
                                </div>
                            </div>
                            <label class='mb-5 block text-4xl font-semibold '>
                                {t("security")}
                            </label>
                            <div class='mb-5 flex'>
                                <label for='password' class=' mt-4 w-1/2 '>
                                    {t("password")}
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div class='mb-5 flex'>
                                <label
                                    for='Confirm Password'
                                    class=' mt-4 w-1/2 '
                                >
                                    {t("confirm password")}
                                </label>
                                <input
                                    type='password'
                                    name='Confirm Password'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div className='flex gap-4'>
                                <button class='w-full bg-Accent hover:bg-Primary rounded-md h-12'>
                                    {t("save changes")}
                                </button>
                                <button class='w-full bg-Accent hover:bg-Primary rounded-md h-12'>
                                    {t("delete account")}
                                </button>
                                <button class='w-full bg-Accent hover:bg-Primary rounded-md h-12'>
                                    {t("cancel")}
                                </button>
                            </div>
                            <h2 className=' my-5 block text-4xl font-semibold '>
                                {t("payment section")}
                            </h2>
                            <div className='flex gap-4'>
                                <div class='mb-5 '>
                                    <label
                                        for='SHOW CARDS'
                                        class=' mt-4 w-1/2 '
                                    >
                                        {t("cards added")}
                                    </label>
                                    <button
                                        name='SHOW CARDS'
                                        class='w-full bg-Accent hover:bg-Primary rounded-md h-12 my-3'
                                    >
                                        {t("show cards")}
                                    </button>
                                </div>
                                <div class='mb-5 '>
                                    <label
                                        for='BUY TICKETS'
                                        class=' mt-4 w-1/2 '
                                    >
                                        {t("tickets remaining")}
                                    </label>
                                    <button
                                        name='BUY TICKETS'
                                        class='w-full bg-Accent hover:bg-Primary rounded-md h-12 my-3'
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

// export async function getServerSideProps(context) {
//     const { userId } = context.query
//     const url = `/${userId}`

//     try {
//       const userInfo = await fetcher(url)
//       return {
//         props: { userInfo },
//       }
//     } catch (error) {
//       console.log(error)
//       return null
//     }
//   }
