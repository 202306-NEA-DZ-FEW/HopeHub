import React from "react";

const BlogCard = ({ image, title, subtitle, author }) => {
    return (
        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
            <img src={image} alt={title} className='w-full h-40 object-cover' />
            <div className='p-6'>
                <h2 className='text-xl font-semibold mb-2'>{title}</h2>
                <p className='text-gray-600 text-sm mb-4'>{subtitle}</p>
                <p className='text-gray-500 text-sm'>Written by {author}</p>
            </div>
        </div>
    );
};

export default BlogCard;
