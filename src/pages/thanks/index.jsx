import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { parse } from "cookie";
import Layout from "@/layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/util/firebase";

function Thanks({ user }) {
    const query = useSearchParams();
    const from = query.get("from");
    const { t } = useTranslation("common");

    let background, text;

    switch (from) {
        case "Auth":
            background = "/assets/thank-bg-1.svg";
            text = t(
                "Thank you for taking the first step towards well-being! We're honored to be part of your mental health journey, and our team is here to support you every step of the way."
            );
            break;
        case "contact":
            background = "/assets/thank-bg-2.svg";
            text = t(
                "Thank you for reaching out to us! We appreciate your message and will get back to you as soon as possible. Your interest means a lot to us, and we look forward to assisting you on your journey to well-being."
            );
            break;
        case "booking":
            background = "/assets/thank-bg-2.svg";
            text = t(
                "Thank you for scheduling an appointment with us! We look forward to supporting you on your path to mental wellness."
            );
            break;

        default:
            background = "/assets/thank-bg-2.svg";
            text = t(
                "Thank you for choosing our online therapy services! We're here to support you on your journey."
            );
    }

    return (
        <Layout user={user}>
            <main
                className='h-full pb-40 -mt-16 py-56  px-20 flex flex-col items-center bg-no-repeat bg-cover text-NeutralWhite dark:text-NeutralBlack font-poppins'
                style={{
                    backgroundImage: `url(${background})`,
                }}
            >
                <h1 className='text-7xl font-poppins font-extrabold text-NeutralWhite dark:text-NeutralBlack w-full text-left'>
                    {t("Thank you")}
                </h1>
                <p className='pb-40 font-medium text-2xl text-NeutralWhite dark:text-NeutralBlack w-full py-5'>
                    {text}
                </p>
                <Link
                    href='/'
                    className='btn mb-56 ml-auto font-poppins border-none font-medium text-2xl bg-Accent text-NeutralBlack dark:text-NeutralWhite  dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    {t("Back to Home")}
                </Link>
            </main>
        </Layout>
    );
}

export default Thanks;
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
