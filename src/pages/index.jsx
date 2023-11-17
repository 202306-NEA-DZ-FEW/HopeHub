import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Banner from "@/components/HomePage/Banner";
import ConnectionSection from "@/components/HomePage/ConnectionSection";
import PurchasingSection from "@/components/HomePage/PurchasingSection";
import TherapistsInfoSection from "@/components/HomePage/TherapistsInfoSection";

import Layout from "@/layout/Layout";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "@/util/firebase";
import BlogsCarousel from "@/components/HomePage/BlogsCarousel";
import { parse } from "cookie";

export default function HomePage({ blogs, user }) {
    console.log("logged user data", user);

    return (
        <Layout user={user}>
            <div className='flex flex-col items-center justify-start dark:bg-Dark_Primary'>
                <Banner user={user} />
                <TherapistsInfoSection />
                <ConnectionSection />
                <BlogsCarousel blogs={blogs} />
                <PurchasingSection />
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ locale, req }) {
    // Check if there is a logged-in user
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.loggedInUser;
    try {
        // Fetch blogs data
        const blogSnapshot = await getDocs(collection(db, "blogs"));
        const blogs = [];

        blogSnapshot.forEach((doc) => {
            blogs.push(doc.data());
        });

        const sortedBlogs = blogs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

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
                    blogs: sortedBlogs,
                },
            };
        } else {
            // User is not logged in
            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                    blogs: sortedBlogs,
                },
            };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { props: { error: "Error fetching data" } };
    }
}
