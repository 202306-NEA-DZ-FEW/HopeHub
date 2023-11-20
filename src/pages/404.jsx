import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import * as React from "react";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";

export default function NotFoundPage() {
    const { t } = useTranslation("common");
    const { user } = useAppcontext();

    return (
        <Layout user={user}>
            <Head>
                <title>{t("Page Not Found")} </title>
            </Head>

            <div className='flex items-center justify-center h-screen bg-NeutralWhite dark:bg-Dark_Accent'>
                <div className='text-center '>
                    <h1 className='text-6xl font-poppins font-bold text-Accent'>
                        404 - Not Found
                    </h1>
                    <p className='text-xl mt-2 font-poppins font-medium'>
                        Sorry, the page you are looking for does not exist.
                    </p>
                    <button className='button-container mx-2 mb-1 p-2  md:mr-8 bg-Accent text-NeutralBlack dark:text-NeutralWhite  dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500 hover-bg-Primary rounded-md mt-4'>
                        <Link
                            href='/'
                            className='text-lg tracking-wider text-NeutralWhite font-semibold font-poppins'
                            style={{ textTransform: "capitalize" }}
                        >
                            Go back to Homepage
                        </Link>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
// export async function getServerSideProps({ locale, req }) {
//     // Check if there is a logged-in user
//     const cookies = parse(req.headers.cookie || "");
//     const userId = cookies.loggedInUser;

//     try {
//         if (userId) {
//             // Fetch user data from Firestore based on user ID
//             const userDoc = await getDoc(doc(db, "users", userId));

//             if (!userDoc.exists()) {
//                 // Handle the case when the user with the specified ID is not found
//                 return { notFound: true };
//             }

//             // Extract user data from the document
//             const user = userDoc.data();

//             return {
//                 props: {
//                     ...(await serverSideTranslations(locale, ["common"])),
//                     user,
//                 },
//             };
//         } else {
//             // User is not logged in
//             return {
//                 props: {
//                     ...(await serverSideTranslations(locale, ["common"])),
//                 },
//             };
//         }
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return { props: { error: "Error fetching user data" } };
//     }
// }
