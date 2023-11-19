// Import necessary modules and components
import { parse } from "cookie";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import JobCard from "@/components/JobCard/JobCard";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

import jobsData from "../../data/jobdata";

// Define the Requirement component
export default function Careers({ user }) {
    const { t } = useTranslation("common");

    return (
        <Layout user={user}>
            <Head>
                <title>{t("Careers")}</title>
            </Head>
            <div className=' font-poppins px-8 lg:px-9 lg:pb-20 bg-NeutralWHite dark:bg-Dark_Accent'>
                <div className=' py-2 flex justify-center flex-col text-NeutralBlack dark:text-NeutralWhite '>
                    <h2 className='text-4xl leading-relaxed'>
                        {t("CAREERS AT")} Hope Hub
                    </h2>
                    <p className='shrink-0  text-base leading-relaxed pt-2'>
                        {t("careers desc 1")}
                    </p>
                </div>
                <div className='py-5 flex justify-center flex-col text-NeutralBlack dark:text-NeutralWhite '>
                    <h2 className='text-4xl leading-relaxed'>
                        {t("OUR HIRING PHILOSOPHY")}
                    </h2>
                    <p className='shrink-0  text-base leading-relaxed pt-2'>
                        {t("carrers desc 2")}
                    </p>
                </div>
                <div className='py-5 flex justify-center flex-col text-NeutralBlack dark:text-NeutralWhite '>
                    <h2 className='text-4xl leading-relaxed '>
                        {t("CURRENT OPEN POSITIONS")}
                    </h2>
                    <p className='shrink-0  text-base leading-relaxed pt-2'>
                        {t("careers desc 3")}
                    </p>
                </div>

                <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12 pt-8'>
                    {jobsData.map((item) => {
                        return (
                            <JobCard
                                title={item.content.title}
                                location={item.content.location}
                                type={item.content.type}
                                tags={item.content.tags}
                                category={item.content.category}
                                key={item.id}
                            ></JobCard>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

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
