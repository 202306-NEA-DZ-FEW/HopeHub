import Layout from "@/layout/Layout";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Thanks() {
    const query = useSearchParams();
    const from = query.get("from");
    const bg1 = "/assets/thank-bg-1.svg";
    const bg2 = "/assets/thank-bg-2.svg";
    const { t } = useTranslation("common");
    return (
        <Layout>
            <main
                className='h-fit -mt-16 py-48 px-20 flex flex-col items-center bg-no-repeat bg-cover text-white font-poppins'
                style={{
                    backgroundImage:
                        from === "Auth" ? `url(${bg1})` : `url(${bg2})`,
                }}
            >
                <h1 className='text-7xl font-poppins font-extrabold w-full text-left'>
                    {t("Thank you")}
                </h1>
                {from === "Auth" ? (
                    <p className=' font-medium text-2xl w-full py-5'>
                        {t("Thank text 1")}
                    </p>
                ) : (
                    <p className=' font-medium text-2xl w-full py-5'>
                        {t("Thank text 2")}
                    </p>
                )}
                <button className='btn ml-auto font-poppins border-none font-medium text-2xl bg-Accent text-NeutralBlack'>
                    {t("Back to Home")}
                </button>
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
