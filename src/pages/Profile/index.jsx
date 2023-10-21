import Layout from "@/layout/Layout";
import React from "react";
import { FaUser, FaUserEdit } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function UserProfile() {
    return (
        <Layout>
            <div className='flex justify-center mt-8 font-poppins font-black'>
                <div className='w-1/3 p-12 pl-40'>
                    <div className=' bg-black w-32 h-32 rounded-full justify-center flex items-center'>
                        <FaUser className='fill-white text-6xl'></FaUser>
                    </div>
                    <div className=' absolute  left-[13.5rem] top-48 w-8 h-8 bg-white rounded-full justify-center flex items-center border-2 border-black'>
                        <LiaUserEditSolid className=' text-xl'></LiaUserEditSolid>
                    </div>
                </div>
                <div class='flex items-center justify-center p-12 w-2/3'>
                    <div class='mx-auto w-full max-w-[550px] bg-white'>
                        <h2 className=' text-[50px] not-italic leading-[normal]'>
                            PROFILE INFO
                        </h2>
                        <form>
                            <div class='mb-5 flex'>
                                <label for='name' class=' mt-4 w-1/2 '>
                                    Full Name
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
                                    Education Level
                                </label>
                                <select
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  outline-none '
                                    name='education'
                                >
                                    <option value='value1'>Secondary</option>
                                    <option value='value2' selected>
                                        Bachelor
                                    </option>
                                    <option value='value3'>Master</option>
                                </select>
                            </div>
                            <div class='mb-5 flex'>
                                <label for='name' class=' mt-4 w-1/2 '>
                                    Hobbies
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
                                    Family Size
                                </label>
                                <input
                                    type=' number'
                                    name='Family Size'
                                    id='Family Size'
                                    class='rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                                <span className='mt-4 '> Member(s)</span>
                            </div>
                            <div class='mb-5 flex'>
                                <label for='gender' class=' mt-4 w-1/2 '>
                                    Gender
                                </label>
                                <select
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  outline-none '
                                    name='gender'
                                >
                                    <option value='Male'>Male</option>
                                    <option value='Femmale' selected>
                                        Femmale
                                    </option>
                                </select>
                            </div>
                            <div class='mb-5 flex'>
                                <label for='Birth Date' class=' mt-4 w-1/2 '>
                                    Birth Date
                                </label>
                                <input
                                    type='date'
                                    name='Birth Date'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>
                            <div class='mb-5 flex'>
                                <label for='email' class=' mt-4 w-1/2 '>
                                    Email
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
                                    Phone Number
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
                                    Upload ID
                                </label>
                                <input
                                    type='file'
                                    accept='image/*,.pdf'
                                    name='IDcard'
                                    class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none '
                                />
                            </div>

                            <div class='-mx-3 flex flex-wrap'>
                                <div class='w-full px-3 sm:w-1/2'>
                                    <div class='mb-5'>
                                        <label
                                            for='date'
                                            class='mb-3 block text-base font-medium text-[#07074D]'
                                        >
                                            Date
                                        </label>
                                        <input
                                            type='date'
                                            name='date'
                                            id='date'
                                            class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                        />
                                    </div>
                                </div>
                                <div class='w-full px-3 sm:w-1/2'>
                                    <div class='mb-5'>
                                        <label
                                            for='time'
                                            class='mb-3 block text-base font-medium text-[#07074D]'
                                        >
                                            Time
                                        </label>
                                        <input
                                            type='time'
                                            name='time'
                                            id='time'
                                            class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class='mb-5 pt-3'>
                                <label class='mb-5 block text-base font-semibold text-[#07074D] sm:text-xl'>
                                    Address Details
                                </label>
                                <div class='-mx-3 flex flex-wrap'>
                                    <div class='w-full px-3 sm:w-1/2'>
                                        <div class='mb-5'>
                                            <input
                                                type='text'
                                                name='area'
                                                id='area'
                                                placeholder='Enter area'
                                                class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                            />
                                        </div>
                                    </div>
                                    <div class='w-full px-3 sm:w-1/2'>
                                        <div class='mb-5'>
                                            <input
                                                type='text'
                                                name='city'
                                                id='city'
                                                placeholder='Enter city'
                                                class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                            />
                                        </div>
                                    </div>
                                    <div class='w-full px-3 sm:w-1/2'>
                                        <div class='mb-5'>
                                            <input
                                                type='text'
                                                name='state'
                                                id='state'
                                                placeholder='Enter state'
                                                class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                            />
                                        </div>
                                    </div>
                                    <div class='w-full px-3 sm:w-1/2'>
                                        <div class='mb-5'>
                                            <input
                                                type='text'
                                                name='post-code'
                                                id='post-code'
                                                placeholder='Post Code'
                                                class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button class='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'>
                                    Book Appointment
                                </button>
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
