import React, { useEffect, useState } from "react";
import { db } from "../../util/firebase";
import { getDocs, collection } from "firebase/firestore";
import Layout from "@/layout/Layout";
import BlogCard from "@/components/BlogsCard/BlogsCard";

function BlogPage({ blogs }) {
    console.log(blogs);

    return (
        <Layout>
            <div>
                <h1>Blog Page</h1>
                <div className='flex flex-wrap'>
                    {blogs.map((blog, index) => (
                        <div
                            key={index}
                            className='w-full md:w-1/2 lg:w-1/3 p-4'
                        >
                            <BlogCard
                                image={blog.imageURL}
                                title={blog.title}
                                subtitle={blog.subTitle}
                                author={blog.author}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default BlogPage;

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
