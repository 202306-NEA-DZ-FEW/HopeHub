import { useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import Layout from "@/layout/Layout";
import Link from "next/link";

function Thanks() {
    const query = useSearchParams();
    const from = query.get("from");
    const bg1 = "/assets/thank-bg-1.svg";
    const bg2 = "/assets/thank-bg-2.svg";
    const { t } = useTranslation("common");
    return (
        <Layout>
            <main
                className='h-fit -mt-16 py-48 px-20 flex flex-col items-center bg-no-repeat bg-cover text-NeutralWhite dark:text-NeutralBlack font-poppins'
                style={{
                    backgroundImage:
                        from === "Auth" ? `url(${bg1})` : `url(${bg2})`,
                }}
            >
                <h1 className='text-7xl font-poppins font-extrabold text-NeutralWhite dark:text-NeutralBlack w-full text-left'>
                    {t("Thank you")}
                </h1>
                {from === "Auth" ? (
                    <p className=' font-medium text-2xl text-NeutralWhite dark:text-NeutralBlack w-full py-5'>
                        {t("Thank text 1")}
                    </p>
                ) : (
                    <p className=' font-medium text-2xl text-NeutralWhite dark:text-NeutralBlack w-full py-5'>
                        {t("Thank text 2")}
                    </p>
                )}
                <Link className='btn ml-auto font-poppins border-none font-medium text-2xl bg-Accent text-NeutralBlack dark:text-NeutralWhite  dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'>
                    {t("Back to Home")}
                </Link>
            </main>
        </Layout>
    );
}

export default Thanks;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
