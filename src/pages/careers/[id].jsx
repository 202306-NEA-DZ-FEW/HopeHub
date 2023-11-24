import React from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/util/firebase";
import Layout from "@/layout/Layout";
import { useAppcontext } from "@/context/state";
import styles from "../../styles/BlogContent.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const JobPage = ({ user, job }) => {
    const { t } = useTranslation("common");

    const router = useRouter();
    const { darkMode } = useAppcontext();

    // Function to render job content with breakline tags
    const renderJobContent = (description) => {
        return { __html: t(description.replace(/\n/g, "<br />")) };
    };

    return (
        <Layout user={user}>
            <div className='my-20 flex items-center justify-center text-NeutralBlack dark:text-NeutralWhite'>
                <div className='flex flex-col text-NeutralBlack dark:text-NeutralWhite items-center'>
                    <h1 className='my-1 mx-auto text-lg md:text-4xl font-poppins font-semibold'>
                        {" "}
                        {t(job.title)}
                    </h1>
                    <h1 className='my-1 mx-auto text-base md:text-lg font-poppins'>
                        {t(job.department)}
                    </h1>
                    <h1 className='my-1 mx-auto text-base md:text-lg font-poppins'>
                        {t(job.location)}
                    </h1>
                </div>
            </div>
            <div
                className={`${styles["blog-content"]} my-12 mx-9 mr-12 text-base font-poppins text-NeutralBlack dark:text-NeutralWhite`}
                dangerouslySetInnerHTML={renderJobContent(job.description)}
            />
            <div className='application-instructions font-poppins mx-8  mr-12 mb-12 text-NeutralBlack dark:text-NeutralWhite'>
                <h2 className='font-bold text-2xl '>{t("How to Apply")}:</h2>
                <p className='my-4'>
                    {t(
                        "To apply for this position, please send your resume and cover letter to"
                    )}{" "}
                    <a
                        className='text-teal-600 dark:text-teal-400'
                        href='mailto:contact@hopehub.com'
                    >
                        contact@hopehub.com
                    </a>
                    .
                    {t(
                        "Please include the job title in the subject line of your email."
                    )}
                </p>
            </div>
        </Layout>
    );
};

export default JobPage;

// Fetch data for the individual job page
export async function getServerSideProps(context) {
    const { locale, req } = context;

    const jobId = context.params.id;

    try {
        // Fetch job details based on jobId from Firebase or any other source
        // Replace this logic with your actual data fetching mechanism
        const jobSnapshot = await getDoc(doc(db, "jobs", jobId));
        const job = jobSnapshot.data();

        if (!job) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                ...(await serverSideTranslations(locale, ["common"])),
                job,
            },
        };
    } catch (error) {
        console.error("Error fetching job data:", error);
        return {
            notFound: true,
        };
    }
}
