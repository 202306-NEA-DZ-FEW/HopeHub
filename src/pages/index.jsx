import { parse } from "cookie";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useInView } from "react-intersection-observer";
import { animated, useSpring } from "react-spring";

import Banner from "@/components/HomePage/Banner";
import BlogsCarousel from "@/components/HomePage/BlogsCarousel";
import ConnectionSection from "@/components/HomePage/ConnectionSection";
import PurchasingSection from "@/components/HomePage/PurchasingSection";
import TherapistsInfoSection from "@/components/HomePage/TherapistsInfoSection";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

const AnimatedSection = ({ children }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5, // Adjust as needed
    });

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(20px)",
        width: "100%",
    });

    return (
        <animated.div ref={ref} style={animation}>
            {children}
        </animated.div>
    );
};

const HomePage = ({ blogs, user }) => {
    const { t } = useTranslation("common");

    return (
        <Layout user={user}>
            <Head>
                <title>{t("Hope Hub")}</title>
            </Head>
            <div className='flex flex-col items-center justify-start dark:bg-Dark_Primary'>
                <Banner user={user} />
                <AnimatedSection>
                    <TherapistsInfoSection />
                </AnimatedSection>
                <AnimatedSection>
                    <ConnectionSection />
                </AnimatedSection>
                <BlogsCarousel blogs={blogs} />
                <AnimatedSection>
                    <PurchasingSection user={user} />
                </AnimatedSection>
            </div>
        </Layout>
    );
};

export default HomePage;

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
