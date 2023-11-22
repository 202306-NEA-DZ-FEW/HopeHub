// Import necessary modules and components
import { parse } from "cookie";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useRef } from "react";
import CareersPage from "../../../public/assets/CareersPage.jpg";
import CareersOffice from "../../../public/assets/CareersOffice.jpg";
import { PiPlant, PiAirplaneTiltLight, PiDesktopTower } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { RiMentalHealthLine } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";

import JobCard from "@/components/JobCard/JobCard";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

import Link from "next/link";
import Image from "next/image";

// Define the Requirement component
export default function Careers({ user, jobs }) {
    const { t } = useTranslation("common");

    const openPositionsRef = useRef(null);

    const scrollToOpenPositions = () => {
        openPositionsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Layout user={user}>
            <Head>
                <title>{t("Careers")}</title>
            </Head>
            <div className='font-poppins mt-16 md:mt-24 lg:pb-20 text-NeutralBlack dark:text-NeutralWhite bg-NeutralWHite dark:bg-Dark_Accent'>
                <div className='flex flex-col md:flex-row my-16 mx-9'>
                    <div className='md:w-1/2 '>
                        <h2 className='text-4xl font-bold leading-relaxed mb-4'>
                            {t("Careers at")} Hope Hub
                        </h2>
                        <p className='text-base leading-relaxed mb-6'>
                            {t(
                                "Hope Hub is a mental health platform dedicated to matching patients with therapists. Our vision is to make mental health support accessible to everyone because we believe that support and understanding are crucial for a better tomorrow."
                            )}
                        </p>
                        <p className='text-base leading-relaxed mb-6'>
                            {t(
                                "We are a team of makers who celebrate our differences and share a passion for our community. We are hiring across our global hubs and remotely in Algeria and the MENA Region."
                            )}
                        </p>
                        <p className='text-base leading-relaxed mb-6'>
                            {" "}
                            {t("Come join us!")}
                        </p>

                        <button
                            onClick={scrollToOpenPositions}
                            className='bg-Primary dark:bg-Dark_Primary py-2 px-2 rounded hover:bg-Accent dark:hover:bg-slate-600'
                        >
                            {t("See Open Positions")}
                        </button>
                    </div>
                    <div className='hidden md:block w-1/2 px-1'>
                        <Image
                            src={CareersPage}
                            alt='Hope Hub Image'
                            className='rounded-lg shadow-lg'
                        />
                    </div>
                </div>
                <div className=' bg-Primary dark:bg-Dark_Primary px-9 py-24 flex justify-center flex-col text-NeutralBlack dark:text-NeutralWhite'>
                    <h2 className='text-4xl leading-relaxed font-bold'>
                        {t("Our Culture & Values")}
                    </h2>
                    <p className='text-base leading-relaxed pt-2'>
                        {t(
                            "Our SEO software cuts through mountains of data to surface critical insights. We build and maintain systems that process massive amounts of data (we're talking 36 trillion records per day and multiple petabytes of storage.) We model transparent and empathetic marketing for the world. We educate our community, making every effort to help them improve their skill. And we do it all by fostering a culture that encourages accountability, empathy, and transparency."
                        )}
                    </p>
                </div>
                <div className='w-full'>
                    <Image
                        src={CareersOffice}
                        alt='Hope Hub Image'
                        className='  shadow-lg'
                    />
                </div>

                <div className='py-24 mx-9 flex justify-center flex-col text-NeutralBlack dark:text-NeutralWhite'>
                    <h2 className='text-4xl leading-relaxed font-bold'>
                        {t("Our Hiring Philosophy")}
                    </h2>

                    <p className='text-base leading-relaxed pt-2'>
                        {t(
                            "To build the very best SEO tools, we need a workforce that reflects the diversity of our communities and customers. We want Online Therapy to be a place where everyone feels welcome and engaged, bar none. It's our mission and promise to interview a diverse and representative slate of candidates before making an offer for our open roles."
                        )}
                    </p>
                </div>
                <div className='py-16 px-9 flex flex-col text-NeutralBlack dark:text-NeutralWhite bg-Primary dark:bg-Dark_Primary w-full'>
                    <h2 className='text-4xl leading-relaxed font-bold'>
                        {t("Benefits")}
                    </h2>
                    <ul className='list mt-4 flex flex-col md:flex-row font-poppins'>
                        <div className='flex flex-col mx-0 md:mx-4'>
                            <li className='text-base leading-relaxed flex items-center my-2'>
                                <PiPlant className='mr-2' />
                                {t("Comprehensive health coverage")}
                            </li>
                            <li className='text-base leading-relaxed flex items-center my-2'>
                                <IoTimeOutline className='mr-2' />
                                {t("Flexible work hours")}
                            </li>
                        </div>
                        <div className='flex flex-col mx-0 md:mx-10'>
                            <li className='text-base leading-relaxed flex items-center my-2'>
                                <PiAirplaneTiltLight className='mr-2' />
                                {t("Paid time off and holidays")}
                            </li>
                            <li className='text-base leading-relaxed flex items-center my-2'>
                                <PiDesktopTower className='mr-2' />
                                {t("Remote work options")}
                            </li>
                        </div>
                        <div className='flex flex-col mx-0 md:mx-10'>
                            <li className='text-base leading-relaxed flex items-center my-2'>
                                <AiOutlineDollar className='mr-2' />
                                {t("Professional development opportunities")}
                            </li>
                            <li className='text-base leading-relaxed flex items-center my-2'>
                                <RiMentalHealthLine className='mr-2' />
                                {t("Employee wellness programs")}
                            </li>
                        </div>
                    </ul>
                </div>

                <div
                    ref={openPositionsRef}
                    className='py-5 mx-9 flex justify-center flex-col text-NeutralBlack dark:text-NeutralWhite'
                >
                    <h2 className='text-4xl leading-relaxed font-bold'>
                        {t("Current Open Positions")}
                    </h2>
                    <p className='text-base leading-relaxed pt-2'>
                        {t(
                            "Please send us an email with the application title as the subject with an attached CV in PDF format!"
                        )}
                    </p>
                </div>

                <div className='px-9 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12 pt-8'>
                    {jobs.map((item) => {
                        return (
                            <Link href={`/careers/${item.id}`} key={item.id}>
                                <JobCard
                                    title={item.title}
                                    location={item.location}
                                    category={item.departement}
                                    key={item.id}
                                    user={user}
                                ></JobCard>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ locale, req }) {
    // Fetch jobs data from Firestore collection "jobs"

    const jobsQuery = await getDocs(collection(db, "jobs"));
    const jobs = jobsQuery.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
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
                    jobs,
                },
            };
        } else {
            // User is not logged in
            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                    jobs,
                },
            };
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { props: { error: "Error fetching user data" } };
    }
}
