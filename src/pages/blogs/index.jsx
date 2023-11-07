import React, { useEffect, useState } from "react";
import { db } from "../../util/firebase";
import { getDocs, collection } from "firebase/firestore";
import Layout from "@/layout/Layout";
import BlogCard from "@/components/BlogsCard/BlogsCard";
import BookingButton from "@/components/BookingButton/BookingButton";
import { useTranslation } from "next-i18next";

function BlogsPage({ blogs }) {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <h1 className='mx-6 mt-4 lg:mb-6 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 font-poppins uppercase font-medium inline-block'>
                {t("Our Blog Posts")}
            </h1>
            <div className='flex flex-col xl:flex-row mx-5 mb-6'>
                <div className='flex flex-col'>
                    {blogs.map((blog, index) => (
                        <div key={index} className='p-4'>
                            <div className='border border-solid mb-5 border-Primary'></div>

                            <BlogCard
                                image={blog.imageURL}
                                title={blog.title}
                                subtitle={blog.subTitle}
                                summary={blog.summary}
                                author={blog.author}
                                blogId={blog.id}
                            />
                        </div>
                    ))}
                </div>
                <div className='flex flex-col w-10/12 mx-auto'>
                    <div className='card w-auto h-min my-3 mx-5 bg-Primary shadow-xl'>
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
                                    destination='/booking'
                                    buttonText='Book An Appointment'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='card w-auto h-min my-3 mx-5 bg-gray-300 shadow-xl'>
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
                                    buttonText='Subscribe to Our Newsletter'
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

export async function getServerSideProps() {
    try {
        const blogsCollection = collection(db, "blogs");
        const data = await getDocs(blogsCollection);
        const blogs = [];
        data.forEach((doc) => {
            const blog = doc.data();
            blogs.push(blog);
        });
        return { props: { blogs } };
    } catch (error) {
        console.log("error fetching blogs:", error);
    }
}
