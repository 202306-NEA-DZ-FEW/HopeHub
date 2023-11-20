import { parse } from "cookie";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useRef } from "react";

import BlogCard from "@/components/BlogsCard/BlogsCard";
import BookingButton from "@/components/BookingButton/BookingButton";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

import placeholderImage from "../../../public/assets/Image placehodler.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

function BlogsPage({ blogs, user }) {
    const { t } = useTranslation("common");
    const blogRef = useRef([]);
    const controls = useAnimation();

    const AnimatedSection = ({ children }) => {
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.5, // Adjust as needed
        });

        const animation = useSpring({
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(20px)",
        });
        const fadeOutAnimation = useSpring({
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(-20px)",
        });

        return (
            <animated.div
                ref={ref}
                style={inView ? animation : fadeOutAnimation}
            >
                {children}
            </animated.div>
        );
    };

    return (
        <Layout user={user}>
            <Head>
                <title>Blogs</title>
            </Head>
            <h1 className='mx-6 mt-4 text-base md:mb-4 lg:mb-0 md:text-3xl md:mx-9 md:mt-16 font-poppins uppercase font-medium inline-block text-NeutralBlack dark:text-NeutralWhite'>
                {t("Our Blog Posts")}
            </h1>
            <div className='flex flex-col xl:flex-row mx-5 mb-6'>
                <div className='flex flex-col'>
                    {blogs.map((blog, index) => (
                        <AnimatedSection key={blog.id}>
                            <div key={index} className='p-4'>
                                <div className='border border-solid mb-5 border-Primary dark:border-Dark_Primary'></div>
                                <BlogCard
                                    image={blog.imageURL || placeholderImage}
                                    title={blog.title}
                                    subtitle={blog.subTitle}
                                    author={blog.author}
                                    blogId={blog.id}
                                    body={blog.body}
                                />
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                <div className='flex flex-col w-10/12 mx-auto'>
                    <div className='card w-auto h-min my-3 mx-5 bg-Primary dark:bg-Dark_Primary text-NeutralBlack dark:text-NeutralWhite shadow-xl'>
                        <div className='card-body'>
                            <h2 className='card-title text-lg lg:text-5xl font-poppins font-semibold'>
                                HopeHub
                            </h2>
                            <p className='py-6 font-poppins text-sm lg:text-xl'>
                                {t(
                                    "If you're looking for support, see how HopeHub can help."
                                )}
                            </p>
                            <div className='flex justify-center'>
                                <BookingButton
                                    destination={
                                        user !== undefined
                                            ? `/booking?userid=${user.uid}`
                                            : "/Auth"
                                    }
                                    buttonText='Book An Appointment'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='card w-auto h-min my-3 mx-5 bg-gray-300 text-NeutralBlack dark:bg-gray-700 dark:text-NeutralWhite shadow-xl'>
                        <div className='card-body'>
                            <h2 className='card-title text-lg lg:text-5xl font-poppins font-semibold'>
                                {t("Our Newsletter Is Waiting For You")}
                            </h2>
                            <p className='py-6 font-poppins text-sm lg:text-xl'>
                                {t(
                                    "Get Inspired Weekly: Start Your Journey to Improved Mental Health and Personal Growth by Subscribing to Our Newsletter Today, and Connect with HopeHub's Community of Support and Healing."
                                )}
                            </p>
                            <div className='flex justify-center'>
                                <BookingButton
                                    destination='/newsletter'
                                    buttonText='Subscribe'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BlogsPage;

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
                    // ...(await serverSideTranslations(locale, ["common"])),
                    user,
                    blogs: sortedBlogs,
                },
            };
        } else {
            // User is not logged in
            return {
                props: {
                    // ...(await serverSideTranslations(locale, ["common"])),
                    blogs: sortedBlogs,
                },
            };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { props: { error: "Error fetching data" } };
    }
}
