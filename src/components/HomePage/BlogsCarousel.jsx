import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import Slider from "react-slick";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogsCarousel = ({ blogs }) => {
    const { t } = useTranslation("common");

    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const yOffset = window.pageYOffset;
            const triggerOffset = 100; // Adjust this value as needed
            if (yOffset > triggerOffset) {
                controls.start("visible");
            } else {
                controls.start("hidden");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [controls]);

    // Take the last 6 blogs
    const lastSixBlogs = blogs.slice(0, 6);

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
        centerPadding: "0px",
        speed: 700,
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
                    {lastSixBlogs.map((blog) => (
                        <Link key={blog.id} href={`/blogs/${blog.id}`}>
                            <div
                                key={blog.id}
                                className='relative px-2 md:mx-4 lg:mx-2 2xl:mx-10'
                                style={{ aspectRatio: "16/9" }} // Set a fixed aspect ratio
                            >
                                <Image
                                    src={blog.imageURL}
                                    alt='therapists'
                                    layout='fill' // Fill the container with the image
                                    objectFit='cover' // Maintain aspect ratio and cover the container
                                    className='filter brightness-50'
                                />
                                <div className='absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 lg:px-4'>
                                    <h1 className='text-Primary dark:text-Dark_NeutralWhite text-base text-center md:text-2xl font-normal font-poppins'>
                                        {t(blog.title)}
                                    </h1>
                                    <h1 className='text-white text-xs text-center md:text-sm font-normal font-poppins'>
                                        {t(blog.subTitle)}
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
