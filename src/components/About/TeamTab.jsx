import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const TeamCard = ({ image, name, linkedin, github }) => {
    return (

        <div className='card w-60 h-96 mb-4 mr-5 bg-NeutralWhite dark:bg-Dark_Primary shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] hover:scale-105 delay-75'>

            <figure>
                <Image
                    src={image}
                    alt={name}
                    width={42}
                    height={80}
                    layout='responsive'
                />
            </figure>

            <div className=' text-NeutralBlack mx-auto '>
                <h2 className='card-title text-xl text-center font-semibold font-poppins flex flex-col py-5 '>

                    {name}
                </h2>
                <div className='flex justify-center pb-5 mx-auto gap-3 cursor-pointer '>
                    <Link href={`${linkedin}`} target='_blank'>
                        <BsLinkedin className='text-2xl hover:scale-105 delay-75' />
                    </Link>
                    <Link href={`${github}`} target='_blank'>
                        <BsGithub className='text-2xl hover:scale-125 delay-75' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
