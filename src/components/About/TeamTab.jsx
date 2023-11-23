import { useAppcontext } from "@/context/state";
import Image from "next/image";
import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const TeamMemberCards = ({ teamMembers }) => {
    const { darkMode } = useAppcontext();

    // Define light gradients
    const lightGradient1 = {
        background: "linear-gradient(to top, #BFDFDC, #99B4DF)",
    };

    const lightGradient2 = {
        background: "linear-gradient(to bottom, #BFDFDC, #99B4DF)",
    };

    // Define dark gradients
    const darkGradient1 = {
        background: "linear-gradient(to top, #1F3A5A, #687793)",
    };

    const darkGradient2 = {
        background: "linear-gradient(to bottom, #1F3A5A, #687793)",
    };

    // Use the appropriate gradients based on dark mode
    const gradient1 = darkMode ? darkGradient1 : lightGradient1;
    const gradient2 = darkMode ? darkGradient2 : lightGradient2;

    // Iterate through team members and apply alternating gradients
    const memberCards = teamMembers.map((member, index) => {
        const gradientStyle = index % 2 === 0 ? gradient1 : gradient2;

        return (
            <div
                key={index}
                className='w-52 h-auto my-4 rounded-lg p-2 flex flex-col items-center justify-center mx-2 hover:scale-110'
                style={gradientStyle}
            >
                <Image
                    src={member.image}
                    alt={member.name}
                    className='w-36 h-36 rounded-lg object-cover my-4'
                    width={500}
                    height={100}
                />
                <h2 className='text-sm font-poppins mt-4 text-NeutralBlack dark:text-NeutralWhite'>
                    {member.name}
                </h2>
                <div className='mt-2 flex flex-row py-3'>
                    <a
                        href={member.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:text-blue-700 mr-4'
                    >
                        <BsLinkedin className='text-2xl hover:scale-105 delay-75' />
                    </a>
                    <a
                        href={member.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    >
                        <BsGithub className='text-2xl hover:scale-125 delay-75' />
                    </a>
                </div>
            </div>
        );
    });

    return <div className='flex flex-wrap justify-center'>{memberCards}</div>;
};

export default TeamMemberCards;
