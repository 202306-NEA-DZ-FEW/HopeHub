import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Banner from "@/components/HomePage/Banner";
import ConnectionSection from "@/components/HomePage/ConnectionSection";
import PurchasingSection from "@/components/HomePage/PurchasingSection";
import TherapistsInfoSection from "@/components/HomePage/TherapistsInfoSection";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/util/firebase";
import BlogsCarousel from "@/components/HomePage/BlogsCarousel";

export default function HomePage({ blogs }) {
    const { t } = useTranslation("common");
    const { user } = useAppcontext();
    console.log("logged user data", user);

    return (
        <Layout blogs={blogs}>
            <div className='flex flex-col items-center justify-start dark:bg-Dark_Primary'>
                <Banner />
                <TherapistsInfoSection />
                <ConnectionSection />
                <BlogsCarousel blogs={blogs} />
                <PurchasingSection />
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ locale, query }) {
    const blogSnapshot = await getDocs(collection(db, "blogs"));
    const blogs = [];
    blogSnapshot.forEach((doc) => {
        blogs.push(doc.data());
    });

    const sortedBlogs = blogs.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            blogs: sortedBlogs,
        },
    };
}
