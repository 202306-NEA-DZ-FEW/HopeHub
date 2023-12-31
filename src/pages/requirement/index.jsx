// Import necessary modules and components
import { parse } from "cookie";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RequirementPage from "public/assets/RequirementPage.jpg";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";
import React from "react";

// Define the Requirement component
export default function Requirement({ user }) {
    const { t } = useTranslation("common");

    return (
        <Layout user={user}>
            <Head>
                <title>{t("Requirements")}</title>
            </Head>
            <div className='mt-16 bg-NeutralWhite dark:bg-Dark_Accent min-w-screen min-h-screen flex flex-row-reverse lg:mb-12'>
                {/* Image component for RequirementFrame */}
                <Image
                    className='hidden lg:block px-20 pb-[32rem] rounded-lg '
                    src={RequirementPage}
                    width={550}
                    height={400}
                    alt=''
                ></Image>
                <div className='w-full h-full lg:w-[70%] px-8 lg:px-20 bg-NeutralWhite dark:bg-Dark_Accent pt-4 pb-12 flex flex-col group'>
                    <h1 className='mb-5 font-poppins font-bold tracking-wider text-NeutralBlack dark:text-NeutralWhite capitalize text-2xl lg:text-4xl leading-normal'>
                        {t("Why work with HopeHub?")}
                    </h1>
                    <div className='Capitalize text-NeutralBlack dark:text-NeutralWhite text-lg lg:text-2xl font-semibold font- mb-2'>
                        {t("Reliable Income")}
                    </div>
                    <p className='text-NeutralBlack dark:text-NeutralWhite text-lg font-poppins text-justify mb-6'>
                        {t(
                            "Over 10,000 people sign up on HopeHub every day looking for a counselor to help with life challenges. HopeHub can be your main source of income (full time) or a supplement to your current work."
                        )}
                    </p>
                    <div className='Capitalize text-NeutralBlack dark:text-NeutralWhite text-lg lg:text-2xl font-semibold font-poppins mb-2'>
                        {t("Focus on Counseling")}
                    </div>
                    <p className='text-NeutralBlack dark:text-NeutralWhite text-lg font-poppins text-justify mb-6'>
                        {t(
                            "No need to worry about costs from acquiring clients, billing, support, or operations. Let us handle the fees and paperwork so you can focus on what you do best!"
                        )}
                    </p>
                    <h1 className='mb-5 pt-4 font-poppins font-bold tracking-wider text-NeutralBlack dark:text-NeutralWhite capitalize text-2xl lg:text-4xl'>
                        {t("Requirements")}
                    </h1>
                    <ul className='text-NeutralBlack dark:text-NeutralWhite text-lg font-poppins mb-6'>
                        <li className='mb-2'>
                            {"\u25CF "}
                            {t(
                                "Licensed by a State Board to provide counseling"
                            )}
                        </li>
                        <li className='mb-2'>
                            {"\u25CF "}
                            {t(
                                "Experience in counseling for adults, couples, and/or teens"
                            )}
                        </li>
                        <li className='mb-2'>
                            {" "}
                            {"\u25CF "}
                            {t("Excellent writing skills")}
                        </li>
                        <li className='mb-2'>
                            {" "}
                            {"\u25CF "}
                            {t("Reliable Internet connection")}
                        </li>
                        <li className='mb-2'>
                            {" "}
                            {"\u25CF "}
                            {t("Currently residing in the US")}
                        </li>
                    </ul>{" "}
                    {user !== undefined ? (
                        // User is identified
                        user.isTherapist ? (
                            <h2 className='text-lg font-poppins text-NeutralBlack dark:text-NeutralWhite'>
                                {t("Thank you for being a part of our team")}.
                            </h2>
                        ) : (
                            // Non-therapist identified user
                            <Link
                                href='/therapist'
                                className='mt-3 flex items-center justify-center self-end w-28 h-10 rounded-md text-base font-poppins font-regular dark:text-NeutralWhite dark:bg-Dark_Primary dark:group-hover:bg-[#3E4E68] bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                            >
                                {t("Next")}
                            </Link>
                        )
                    ) : (
                        // User is not identified
                        <Link
                            href='/therapist'
                            className='mt-3 flex items-center justify-center self-end w-28 h-10 rounded-md text-base font-poppins font-regular dark:text-NeutralWhite dark:bg-Dark_Primary dark:group-hover:bg-[#3E4E68] bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                        >
                            {t("Next")}
                        </Link>
                    )}
                </div>
            </div>
        </Layout>
    );
}

// Server side function to fetch user data, and translations
export async function getServerSideProps({ locale, req }) {
    // Check if there is a logged-in user
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.loggedInUser;

    try {
        if (userId) {
            // Fetch user data from Firestore based on user ID
            const userDoc = await getDoc(doc(db, "users", userId));

            if (!userDoc.exists()) {
                // Handle the case when the user with the specified ID is not found
                return { notFound: true };
            }

            // Extract user data from the document
            const user = userDoc.data();

            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                    user,
                },
            };
        } else {
            // User is not logged in
            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { props: { error: "Error fetching user data" } };
    }
}
