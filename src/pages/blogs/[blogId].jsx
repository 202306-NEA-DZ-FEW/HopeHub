// pages/[blogId].jsx
import { parse } from "cookie";
import { format } from "date-fns";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

import styles from "../../styles/BlogContent.module.css";

import BlogsCarousel from "@/components/HomePage/BlogsCarousel";
import NewsletterSignUp from "@/components/NewsletterSignUp/NewsletterSignUp";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout"; // Import your layout component here

import { db } from "../../util/firebase";
import placeholderImage from "../../../public/assets/Image placehodler.png";
function BlogPage({ blog, blogs, user }) {
    // Function used for translations
    const { t } = useTranslation("common");

    // Using context to get darkmode
    const { darkMode } = useAppcontext();

    //Next router to navigate to different pages
    const router = useRouter();

    //State variables to track of the URL was copied
    const [copied, setCopied] = useState(false);

    // Check if the page is being statically generated
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    // Replacing breakline tags
    const renderBlogContent = (body) => {
        return { __html: body.replace(/\n/g, "<br />") };
    };

    // to display the date in a specific format
    const date = new Date(blog.date);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const serverFormattedDate = format(new Date(blog.date), "dd/MM/yyyy");

    const newText = blog.body.replace(/"/g, '\\"');

    // Render first paragraph as a preview
    const firstParagraph = t(blog.body).split("</p")[0]; // Get the first paragraph
    const renderFirstParagraph = firstParagraph ? (
        <h1
            className='my-2 mx-4 md:mx-20 italic md:text-base text-center font-poppins text-NeutralBlack dark:text-NeutralWhite md:block'
            dangerouslySetInnerHTML={{
                __html: firstParagraph,
            }}
        ></h1>
    ) : null;

    // Function to handle sharing on Twitter
    const shareOnTwitter = () => {
        const text = encodeURIComponent(blog.title);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
    };

    // Function to handle sharing on Facebook
    const shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    };

    // Function to copy URL to clipboard
    const copyURLToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard
            .writeText(url)
            .then(() => {
                // URL copied successfully
                setCopied(true);
                setTimeout(() => {
                    // Reset the copied state after some time (optional)
                    setCopied(false);
                }, 5000); // Reset after 3 seconds (adjust as needed)
            })
            .catch((err) => {
                console.error("Unable to copy URL: ", err);
            });
    };

    //Rendering the individual blogpage
    return (
        <Layout user={user}>
            <div className='relative flex items-center justify-center'>
                <div
                    className='-mt-16 md:-mt-36 '
                    style={{ height: "700px", overflow: "hidden" }}
                >
                    <img
                        src={blog.imageURL || placeholderImage}
                        alt={blog.title}
                        className='w-full object-cover  mx-auto text-NeutralBlack dark:text-NeutralWhite relative'
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, transparent, white 50%)",
                        }}
                    />
                </div>
                <div
                    className={`absolute w-full h-full bottom-96 sm:-top-32 lg:top-5 left-0 ${
                        darkMode ? "gradient-dark" : "gradient-light"
                    }`}
                ></div>
                <div className='absolute bottom-28 md:bottom-0 flex flex-col text-NeutralBlack dark:text-NeutralWhite items-center '>
                    <h1 className='my-1 mx-auto text-lg md:text-4xl font-poppins text-NeutralBlack dark:text-NeutralWhite font-semibold'>
                        {t(blog.title)}
                    </h1>
                    {renderFirstParagraph}
                    <div className='my-1 font-poppins text-NeutralBlack dark:text-NeutralWhite items-center mx-auto flex flex-col text-xs md:text-base'>
                        <h1>
                            {t("Written by")} {t(blog.author)}
                        </h1>
                        <h1 className='font-extralight'>
                            {serverFormattedDate}
                        </h1>
                    </div>
                </div>
            </div>
            <div
                className={`${styles["blog-content"]} -mt-28 md:-mt-0 my-12 md:my-6 mx-8 text-base font-poppins text-NeutralBlack dark:text-NeutralWhite`}
                dangerouslySetInnerHTML={{
                    __html: t(blog.body)
                        .replace(/<p[^>]*>/, "")
                        .split("</p>")
                        .slice(1)
                        .join("</p>"),
                }}
            />

            <BlogsCarousel blogs={blogs} />
            <div className='flex justify-center mx-auto items-center text-center flex-col my-14'>
                <h1 className='my-2 mx-8 text-base md:text-4xl font-poppins  text-NeutralBlack dark:text-NeutralWhite font-semibold'>
                    {t("Subscribe to Our Newsletter")}
                </h1>
                <h1 className='my-2 mx-8 text-xs md:text-base font-poppins text-NeutralBlack dark:text-NeutralWhite'>
                    {t(
                        "A weekly, ad-free Newsletter that helps you stay in the know."
                    )}
                </h1>
                <NewsletterSignUp />
                {/* Social media share buttons */}
                <h1 className='font-poppins font-light text-NeutralBlack dark:text-NeutralWhite'>
                    {t("Share this article via")}
                </h1>
                <div className='flex justify-center my-4'>
                    <button
                        onClick={shareOnTwitter}
                        className='w-10 h-10 mx-1 rounded-full flex items-center justify-center bg-Primary dark:bg-slate-600 dark:text-Primary hover:bg-Accent hover:dark:bg-Dark_Primary transition duration-300'
                    >
                        <FaXTwitter />
                    </button>
                    <button
                        onClick={shareOnFacebook}
                        className='w-10 h-10 mx-1 rounded-full flex items-center justify-center bg-Primary dark:bg-slate-600 dark:text-Primary hover:bg-Accent hover:dark:bg-Dark_Primary transition duration-300'
                    >
                        <FaFacebook />
                    </button>
                    <button
                        onClick={copyURLToClipboard}
                        className={`w-10 h-10 mx-1 rounded-full flex items-center justify-center bg-Primary dark:bg-slate-600 dark:text-Primary hover:bg-Accent hover:dark:bg-Dark_Primary hover:dark:bg-Dark_Primarytransition duration-300 ${
                            copied && "bg-violet-400 hover:bg-violet-400"
                        }`}
                    >
                        {copied ? <LuCopyCheck /> : <LuCopy />}
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default BlogPage;

// This function tells Next.js how to pre-render the page.
export async function getServerSideProps({ locale, req, params }) {
    // Check if there is a logged-in user
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.loggedInUser;
    const { blogId } = params;

    try {
        // Fetch blogs data
        const blogsSnapshot = await getDocs(collection(db, "blogs"));
        const blogs = blogsSnapshot.docs.map((doc) => doc.data());
        const sortedBlogs = blogs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Fetch the specific blog using the provided blogId
        const blogDocRef = doc(db, "blogs", blogId);
        const blogSnapshot = await getDoc(blogDocRef);

        // Check if the requested blog exists
        if (!blogSnapshot.exists()) {
            return {
                notFound: true, // Return a 404 page if the blog is not found
            };
        }

        const blog = blogSnapshot.data();

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
                    blog,
                    blogs: sortedBlogs,
                },
            };
        } else {
            // User is not logged in
            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                    blog,
                    blogs: sortedBlogs,
                },
            };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { props: { error: "Error fetching data" } };
    }
}
