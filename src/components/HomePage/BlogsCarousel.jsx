import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { TfiAngleLeft, TfiAngleRight } from "react-icons";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { db } from "../../util/firebase";

const BlogsCarousel = () => {
    const { t } = useTranslation("common");

    const [blogs, setBlogs] = useState([]); // State to store blog data

    // Function to fetch blog data from Firestore
    const fetchBlogsFromFirestore = async () => {
        const blogsCollection = collection(db, "blogs");
        const q = query(blogsCollection, orderBy("date", "desc"), limit(6)); // Sort by date in descending order and limit to the last 6 entries
        const data = await getDocs(q);
        const blogData = [];
        data.forEach((doc) => {
            const blog = doc.data();
            blogData.push(blog);
        });
        setBlogs(blogData);
    };

    useEffect(() => {
        fetchBlogsFromFirestore();
    }, []); // Fetch data when the component mounts

    const CustomPrevArrow = ({ onClick }) => (
        <div className='custom-arrow-l' onClick={onClick}>
            <TfiAngleLeft size={30} color='black' />
        </div>
    );

    const CustomNextArrow = ({ onClick }) => (
        <div className='custom-arrow-r' onClick={onClick}>
            <TfiAngleRight size={30} color='black' />
        </div>
    );

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
        ],
    };

    return (
        <div className='bg-Primary dark:bg-Dark_Primary pb-16 w-full'>
            <h1 className='mx-6 mt-4 mb-6 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 font-poppins uppercase font-medium inline-block dark:text-NeutralWhite text-NeutralBlack'>
                {t("RECENT BLOGS")}
            </h1>
            <div className='px-20'>
                <Slider {...settings}>
                    {blogs.map((blog) => (
                        <Link key={blog.id} href={`/blogs/${blog.id}`}>
                            <div
                                key={blog.id}
                                className='relative px-2 md:mx-4 lg:mx-2 2xl:mx-10'
                            >
                                <Image
                                    src={blog.imageURL}
                                    alt='therapists'
                                    width={500}
                                    height={60}
                                    layout='fixed'
                                    className='filter brightness-50'
                                />
                                <div className='absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 lg:px-4'>
                                    <h1 className='text-Primary dark:text-Dark_NeutralWhite text-base text-center md:text-2xl font-normal font-poppins'>
                                        {blog.content.title}
                                    </h1>
                                    <h1 className='text-white text-xs text-center md:text-sm font-normal font-poppins'>
                                        {blog.subTitle}
                                    </h1>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BlogsCarousel;
