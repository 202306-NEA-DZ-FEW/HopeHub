import Head from "next/head";
import React, { useState } from "react";

import FoundingCard from "@/components/About/FoundingCard";
import TeamCard from "@/components/TeamCard/TeamCard";

import Layout from "@/layout/Layout";

const About = () => {
    const [visibleSection, setVisibleSection] = useState(null);

    const handleSectionToggle = (section) => {
        if (visibleSection === section) {
            setVisibleSection(null);
        } else {
            setVisibleSection(section);
        }
    };

    return (
        <Layout>
            <div className='bg-NeutralWhite pt-8 min-h-screen flex flex-col'>
                <Head>
                    <title>About Us - HopeHub</title>
                </Head>

                <div className='mr-12 ml-12 flex-grow pt-8 justify-center max-w-screen-xl'>
                    <header className='text-center py-5'>
                        <h1 className='text-3xl text-black font-extrabold'>
                            HopeHub
                        </h1>
                        <p className='text-lg text-gray-500 tracking-[1.2vh]'>
                            Some cool one liner!
                        </p>
                    </header>
                    <div className='text-center'>
                        <span
                            className={`mr-2 border-b-Accent border-b-1 shadow-md ${
                                visibleSection === "text" ? "active" : ""
                            }`}
                        >
                            <a
                                href='#'
                                onClick={() => handleSectionToggle("text")}
                            >
                                Who are we
                            </a>
                        </span>
                        <span
                            className={`mr-2 mt-8 border-b-Accent border-b-1 shadow-md ${
                                visibleSection === "team" ? "active" : ""
                            }`}
                        >
                            <a
                                href='#'
                                onClick={() => handleSectionToggle("team")}
                            >
                                The team
                            </a>
                        </span>
                        <span
                            className={`mr-2 border-b-Accent border-b-1 shadow-md ${
                                visibleSection === "founding" ? "active" : ""
                            }`}
                        >
                            <a
                                href='#'
                                onClick={() => handleSectionToggle("founding")}
                            >
                                Our Founding
                            </a>
                        </span>
                    </div>

                    {visibleSection === "text" && (
                        <div className='text-justify sm:text-lg md:text-xl mx-56 bg-NeutralWhite font-poppins py-8'>
                            <p className='text-gray-700'>
                                At HopeHub, we believe there is a better way to
                                do things. A more valuable way where customers
                                are earned rather than bought. We are
                                obsessively passionate about it, and our mission
                                is to help people achieve it. We focus on search
                                engine optimization. It is one of the least
                                understood and least transparent aspects of
                                great marketing, and we see that as an
                                opportunity. We are excited to simplify SEO for
                                everyone through our software, education, and
                                community.
                            </p>
                        </div>
                    )}
                    {visibleSection === "founding" && <FoundingCard />}
                    {visibleSection === "team" && (
                        <div className='flex flex-wrap justify-center p-2'>
                            <TeamCard
                                image=''
                                name='Zohir Kioukiou'
                                position='Developer'
                            />

                            <TeamCard
                                image='data:image/jpeg;base64,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'
                                name='Amel Batouche'
                                position='Developer'
                            />
                            <TeamCard
                                image=''
                                name='Abdelghani Bahri'
                                position='Developer'
                            />
                            <TeamCard
                                image=''
                                name='Fella Kettani'
                                position='Developer'
                            />
                            <TeamCard
                                image=''
                                name='Brahim'
                                position='Developer'
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default About;