import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Banner from "@/components/HomePage/Banner";
import BlogsCarousel from "@/components/HomePage/BlogsCarousel";
import ConnectionSection from "@/components/HomePage/ConnectionSection";
import PurchasingSection from "@/components/HomePage/PurchasingSection";
import TherapistsInfoSection from "@/components/HomePage/TherapistsInfoSection";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";

export default function HomePage() {
    const { t } = useTranslation("common");
    const { user } = useAppcontext();
    console.log("logged user data", user);

    return (
        <Layout>
            <div className='flex flex-col items-center justify-start dark:bg-Dark_Primary'>
                <Banner />
                <TherapistsInfoSection />
                <ConnectionSection />
                <BlogsCarousel />
                <PurchasingSection />
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
