import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import FoundingCard from "@/components/About/FoundingTab";
import TeamCard from "@/components/About/TeamTab";

import Layout from "@/layout/Layout";
import { teamMembers } from "@/util/constants";

import { parse } from "cookie";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/util/firebase";
import { useTrail, animated, useSpring } from "react-spring";

const About = ({ user }) => {
    const { t } = useTranslation("common");
    const [visibleSection, setVisibleSection] = useState("team");

    const handleSectionToggle = (section) => {
        if (visibleSection === section) {
            setVisibleSection(null);
        } else {
            setVisibleSection(section);
        }
    };

    const trail = useTrail(2, {
        opacity: 1,
        transform: "translateY(0px)",
        from: { opacity: 0, transform: "translateY(20px)" },
    });

    // Define fade-in animation properties
    const fadeInProps = useSpring({
        opacity: visibleSection === "text" ? 1 : 0,
        from: { opacity: 0 },
        config: { duration: 500 },
    });

    const getHoverEffect = () => ({
        scale: 1.05,
        config: { tension: 400, friction: 40 },
    });

    const [hoverProps, setHover] = useSpring(() => ({
        scale: 1,
        config: { tension: 400, friction: 40 },
    }));

    const handleHover = () => {
        setHover(getHoverEffect());
    };

    const handleHoverLeave = () => {
        setHover({ scale: 1 });
    };

    return (
        <Layout user={user}>
            <div className='bg-NeutralWhite dark:bg-Dark_Accent pt-20 min-h-screen flex flex-col '>
                <Head>
                    <title>{t("About")}</title>
                </Head>

                <div className=' lg:pt-4 justify-center'>
                    <header className='mb-6 font-lilita tracking-widest text-center text-NeutralBlack capitalize text-2xl lg:text-4xl leading-normal'>
                        <animated.h1
                            style={trail[0]}
                            className='text-4xl lg:text-[3.5rem] text-NeutralBlack dark:text-NeutralWhite'
                        >
                            HOPE HUB
                        </animated.h1>
                        {/* <animated.h3 style={trail[1]} className='capitalize text-xl text-NeutralBlack font-poppins mt-4 text-center tracking-widest font-extralight'>
                Where every click sparks a positive change
            </animated.h3> */}
                    </header>

                    <div className='flex flex-row justify-center font-poppins text-center selection:text-lg lg:text-xl text-NeutralBlack dark:text-NeutralWhite group'>
                        <span
                            className={`mr-1 ${
                                visibleSection === "text"
                                    ? "bg-Accent dark:bg-Dark_Primary text-NeutralWhite duration-300 border-none"
                                    : ""
                            } rounded-md px-3 py-1`}
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
                                {t("Our Purpose")}
                            </a>
                        </span>

                        <span
                            className={`mr-1 ${
                                visibleSection === "team"
                                    ? "bg-Accent dark:bg-Dark_Primary text-NeutralWhite  duration-300 border-none"
                                    : ""
                            } rounded-md px-3 py-1`}
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
                                    ? "bg-Accent dark:bg-Dark_Primary text-NeutralWhite  duration-300 border-none"
                                    : ""
                            } rounded-md px-3 py-1`}
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
                        <animated.div
                            style={fadeInProps}
                            className='text-justify mx-12 lg:mx-56 bg-NeutralWhite dark:bg-Dark_Accent font-poppins text-xl lg:text-[1.35rem] tracking-wide leading-8 py-8'
                        >
                            <p className='text-NeutralBlack dark:text-NeutralWhite indent-8'>
                                {t(
                                    "At HopeHub, we believe there is a better way to do things. A more valuable way where customers are earned rather than bought. We are obsessively passionate about it, and our mission is to help people achieve it. We focus on search engine optimization. It is one of the least understood and least transparent aspects of great marketing, and we see that as an opportunity. We are excited to simplify SEO for everyone through our software, education, and community"
                                )}
                            </p>
                        </animated.div>
                    )}
                    {visibleSection === "founding" && <FoundingCard />}
                    {visibleSection === "team" && (
                        <div className='flex flex-wrap justify-center w-full py-14'>
                            {<TeamCard teamMembers={teamMembers} />}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default About;

export async function getServerSideProps({ locale, req }) {
    // Check if there is a logged-in user
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.loggedInUser;

    try {
        if (userId) {
            // Fetch user data from Firestore based on user ID
            const userDoc = await getDoc(doc(db, "users", userId));

            if (!userDoc.exists()) {
                // Handle the case when the user with the specified ID is not found
                return { notFound: true };
            }

            // Extract user data from the document
            const user = userDoc.data();

            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                    user,
                },
            };
        } else {
            // User is not logged in
            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { props: { error: "Error fetching user data" } };
    }
}
