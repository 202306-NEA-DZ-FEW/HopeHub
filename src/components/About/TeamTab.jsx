import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const TeamCard = ({ image, name, linkedin, github }) => {
    return (
        <div className='card w-64 h-96 mb-4 mx-4 bg-NeutralWhite dark:bg-Dark_Primary shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)]'>
            <figure>
                <Image
                    src={image}
                    alt={name}
                    width={42}
                    height={80}
                    layout='responsive'
                    className='border-b-4  border-Accent'
                />
            </figure>
            <div className='card-body text-NeutralBlack dark:text-NeutralWhite mx-auto'>
                <h2 className='card-title text-xl text-center font-semibold font-poppins '>
                    {name}
                </h2>
                <div className='flex mx-auto gap-3'>
                    <Link href={`${linkedin}`} target='_blank'>
                        <BsLinkedin className='text-2xl' />
                    </Link>
                    <Link href={`${github}`} target='_blank'>
                        <BsGithub className='text-2xl' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
