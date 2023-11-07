// pages/[blogId].jsx
import React from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout"; // Import your layout component here
import { db } from "../../util/firebase";
import { doc, getDoc } from "firebase/firestore";
import BlogsCarousel from "@/components/HomePage/BlogsCarousel";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { PiPaperPlaneTiltFill } from "react-icons/pi";

function BlogPage({ blog }) {
    const { t } = useTranslation("common");
    const router = useRouter();

    // Check if the page is being statically generated
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const renderBlogContent = (body) => {
        return { __html: body.replace(/\n/g, "<br />") };
    };

    const date = new Date(blog.date);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const serverFormattedDate = format(new Date(blog.date), "MMMM dd, yyyy");

    return (
        <Layout>
            <div className='relative flex items-center justify-center'>
                <img
                    src={blog.imageURL}
                    alt={blog.title}
                    className='w-full -mt-16 md:-mt-80 object-cover  mx-auto text-NeutralBlack relative'
                    style={{
                        maskImage:
                            "linear-gradient(to top, transparent, black 50%)",
                    }}
                />
                <div className='absolute bottom-0 md:bottom-5 flex flex-col text-NeutralBlack items-center '>
                    <h1 className='my-1 mx-auto text-lg md:text-4xl font-poppins text-NeutralBlack font-semibold'>
                        {blog.title}
                    </h1>
                    <h1
                        className={`hidden my-2 mx-4 italic text-xs text-center font-poppins text-NeutralBlack md:block`}
                    >
                        {blog.summary}
                    </h1>
                    <div className='my-1 font-poppins text-NeutralBlack items-center mx-auto flex flex-col text-xs md:text-base'>
                        <h1>
                            {t("Written by")} {blog.author}
                        </h1>
                        <h1 className='font-extralight'>
                            {serverFormattedDate}.
                        </h1>
                    </div>
                </div>
            </div>

            <div
                className='my-6 mx-8 text-xs md:text-base font-poppins text-NeutralBlack'
                dangerouslySetInnerHTML={renderBlogContent(blog.body)}
            />

            <BlogsCarousel />
            <div className='flex justify-center mx-auto items-center text-center flex-col my-14'>
                <h1 className='my-2 mx-8 text-base md:text-4xl font-poppins  text-NeutralBlack font-semibold'>
                    {t("Subscribe to Our Newsletter")}
                </h1>
                <h1 className='my-2 mx-8 text-xs md:text-base font-poppins text-NeutralBlack'>
                    {t(
                        "A weekly, ad-free Newsletter that helps you stay in the know."
                    )}
                </h1>
                <div className='form-control'>
                    <label className='label'></label>
                    <label className='input-group'>
                        <input
                            type='text'
                            placeholder={t("Enter your e-mail")}
                            className='input input-bordered'
                        />
                        <span className='bg-Primary'>
                            <PiPaperPlaneTiltFill className='fill-Accent' />
                        </span>
                    </label>
                </div>
            </div>
        </Layout>
    );
}

// This function tells Next.js how to pre-render the page.
export async function getServerSideProps(context) {
    const { blogId } = context.query;

    try {
        const blogDoc = doc(db, "blogs", blogId);
        const blogSnapshot = await getDoc(blogDoc);
        const blog = blogSnapshot.data();

        if (!blog) {
            return {
                notFound: true, // Return a 404 page if the blog is not found
            };
        }

        return {
            props: {
                blog,
            },
        };
    } catch (error) {
        console.error("Error fetching blog:", error);
        return {
            notFound: true, // Return a 404 page if an error occurs
        };
    }
}

export default BlogPage;
