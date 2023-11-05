import React from "react";
import Link from "next/link"; // Import Link from Next.js

const BlogCard = ({ image, title, subtitle, author, blogId }) => {
    return (
        <div className='flex flex-row'>
            {" "}
            {/* Use 'items-start' to control vertical alignment */}
            <div className='w-4/12'>
                <Link href={`/blogs/${blogId}`}>
                    <img src={image} alt={title} className='w-full h-auto' />
                </Link>
            </div>
            <div className='flex flex-col px-6 text-poppins'>
                <Link href={`/blogs/${blogId}`}>
                    <h2 className='text-xl font-semibold'>{title}</h2>
                </Link>
                <p className='text-gray-500 font-normal text-sm'>
                    Written by {author}
                </p>
                <p className='text-gray-600  font-semibold mt-6'>{subtitle}</p>
            </div>
        </div>
    );
};

export default BlogCard;
