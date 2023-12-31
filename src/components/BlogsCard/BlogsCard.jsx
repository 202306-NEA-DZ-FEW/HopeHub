import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const BlogCard = ({ image, title, subtitle, author, blogId, body }) => {
    // Function used for translations
    const { t } = useTranslation("common");

    // Rendering the blogcard
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
                    <h2 className='text-sm lg:text-xl font-semibold text-NeutralBlack dark:text-NeutralWhite'>
                        {t(title)}
                    </h2>
                </Link>
                <p className='text-gray-500 dark:text-gray-400 font-light text-xs lg:text-sm'>
                    {t("Written by")} {t(author)}
                </p>
                <p
                    dangerouslySetInnerHTML={{
                        __html:
                            body && typeof body === "string"
                                ? t(body).split("</p")[0]
                                : "",
                    }}
                    className='text-NeutralBlack dark:text-NeutralWhite font-light text-xs lg:text-base py-2'
                ></p>
            </div>
        </div>
    );
};

export default BlogCard;
