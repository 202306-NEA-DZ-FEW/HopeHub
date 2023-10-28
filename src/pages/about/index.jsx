import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import FoundingCard from "@/components/About/FoundingTab";
import TeamCard from "@/components/About/TeamTab";

import Layout from "@/layout/Layout";
import { teamMembers } from "@/util/constants";

const About = () => {
    const { t } = useTranslation("common");
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
                    <title>{t("About")}</title>
                </Head>

                <div className=' lg:pt-4 justify-center'>
                    <header className='mb-12 font-poppins font-bold tracking-wider text-center text-NeutralBlack capitalize text-2xl lg:text-4xl leading-normal'>
                        <h1 className='text-4xl lg:text-[3.5rem] text-NeutralBlack font-extrabold t'>
                            HopeHub
                        </h1>
                    </header>
                    <div className='text-center font-poppins text-lg lg:text-xl text-NeutralBlack group'>
                        <span
                            className={`mr-1 ${
                                visibleSection === "text"
                                    ? "bg-Accent text-NeutralWhite duration-300 border-none"
                                    : ""
                            } rounded-md px-3 py-2`}
                        >
                            <a
                                href='#'
                                onClick={() => handleSectionToggle("text")}
                                className={
                                    visibleSection !== "text"
                                        ? "border-b-4 border-Accent"
                                        : ""
                                }
                            >
                                {t("Who are we")}
                            </a>
                        </span>

                        <span
                            className={`mr-1 ${
                                visibleSection === "team"
                                    ? "bg-Accent text-NeutralWhite duration-300 border-none"
                                    : ""
                            } rounded-md px-3 py-2`}
                        >
                            <a
                                href='#'
                                onClick={() => handleSectionToggle("team")}
                                className={
                                    visibleSection !== "team"
                                        ? "border-b-4 border-Accent"
                                        : ""
                                }
                            >
                                {t("Our team")}
                            </a>
                        </span>

                        <span
                            className={`${
                                visibleSection === "founding"
                                    ? "bg-Accent text-NeutralWhite duration-300 border-none"
                                    : ""
                            } rounded-md px-3 py-2`}
                        >
                            <a
                                href='#'
                                onClick={() => handleSectionToggle("founding")}
                                className={
                                    visibleSection !== "founding"
                                        ? "border-b-4 border-Accent"
                                        : ""
                                }
                            >
                                {t("Our Founding")}
                            </a>
                        </span>
                    </div>

                    {visibleSection === "text" && (
                        <div className='text-justify mx-12 lg:mx-56  bg-NeutralWhite font-poppins text-xl lg:text-2xl leading-normal py-8'>
                            <p className='text-NeutralBlack indent-8'>
                                {t(
                                    "At HopeHub, we believe there is a better way to do things. A more valuable way where customers are earned rather than bought. We are obsessively passionate about it, and our mission is to help people achieve it. We focus on search engine optimization. It is one of the least understood and least transparent aspects of great marketing, and we see that as an opportunity. We are excited to simplify SEO for everyone through our software, education, and community"
                                )}
                            </p>
                        </div>
                    )}
                    {visibleSection === "founding" && <FoundingCard />}
                    {visibleSection === "team" && (
                        <div className='flex flex-wrap justify-center pt-12 pb-16'>
                            {teamMembers.map((member) => (
                                <TeamCard
                                    key={member.name}
                                    image={member.image}
                                    name={member.name}
                                    linkedin={member.linkedin}
                                    github={member.github}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default About;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
