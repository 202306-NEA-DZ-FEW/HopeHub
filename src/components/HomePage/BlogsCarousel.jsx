import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { useTranslation } from "next-i18next";
import blogsData from "../../data/blogsData";
import axios from "axios";
import { translateText } from "../../pages/api/translate"; // Import the translation utility

import Link from "next/link";

const BlogsCarousel = () => {
    //Function used for translations
    const { t } = useTranslation("common");

    //Custom arrows to replace the ones used in Slick Carousel
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

    const [translatedBlogs, setTranslatedBlogs] = useState([]);

    useEffect(() => {
        // Translate a single blog entry
        const translateBlogContent = async (blog) => {
            const translatedTitle = await translateText(blog.content.title);
            const translatedSubTitle = await translateText(
                blog.content.subTitle
            );

            if (translatedTitle && translatedSubTitle) {
                const translatedBlog = {
                    ...blog,
                    content: {
                        title: translatedTitle,
                        subTitle: translatedSubTitle,
                        // You can translate other fields if needed
                        // body: await translateText(blog.content.body),
                    },
                };
                return translatedBlog;
            } else {
                return null; // Handle translation failure
            }
        };

        // Translate the blogs and filter out null results
        const translateBlogs = async () => {
            const translatedBlogs = await Promise.all(
                blogsData.map(translateBlogContent)
            );
            setTranslatedBlogs(translatedBlogs.filter(Boolean));
        };

        translateBlogs();
    }, []);

    //Carousel settings
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

    //Displaying the carousel
    return (
        <div className='bg-Primary pb-9 w-full'>
            <h1 className='mx-6 mt-4 mb-6 text-base md:mb-4 md:text-3xl md:mx-9 md:mt-10 font-poppins uppercase font-medium inline-block text-NeutralBlack'>
                {t("RECENT BLOGS")}
            </h1>
            <div className='px-20'>
                <Slider {...settings}>
                    {/* Mapping over the articles in blogsData and creating a display card for each in the carousel*/}
                    {translatedBlogs.map((blog) => (
                        <Link key={blog.id} href={`/blogs/${blogsData.id}`}>
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
                                    <h1 className='text-Primary text-base text-center md:text-2xl font-normal font-poppins'>
                                        {blog.content.title}
                                    </h1>
                                    <h1 className='text-NeutralWhite text-xs text-center md:text-sm font-light font-poppins'>
                                        {blog.content.subTitle}
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
