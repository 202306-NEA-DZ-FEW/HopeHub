import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const BlogCard = ({ image, title, subtitle, author, blogId, summary }) => {
    const { t } = useTranslation("common");

    return (
        <div className='flex flex-col lg:flex-row'>
            <Link href={`/blogs/${blogId}`}>
                <div className='image-container'>
                    <Image
                        src={image}
                        alt={title}
                        width={300}
                        height={200}
                        className='image'
                    />
                </div>
            </Link>
            <div className='flex flex-col my-2 lg:px-6 text-poppins'>
                <Link href={`/blogs/${blogId}`}>
                    <h2 className='text-sm lg:text-xl font-semibold'>
                        {title}
                    </h2>
                </Link>
                <p className='text-gray-500 font-normal text-xs lg:text-sm'>
                    {t("Written by")} {author}
                </p>
                <p className='text-gray-600 text-xs lg:text-base font-semibold mt-2'>
                    {subtitle}
                </p>
                <p className='text-gray-600 text-xs lg:text-base'>{summary}</p>
            </div>
        </div>
    );
};

export default BlogCard;
