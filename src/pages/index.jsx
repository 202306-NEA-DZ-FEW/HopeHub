"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Layout from "@/layout/Layout";

export default function HomePage() {
    const { t } = useTranslation("common");

    // Authentication
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signin");
        },
    });

    return (
        <Layout>
            <div className='p-8'>
                <div className='text-white'>{session?.data?.user?.email}</div>
                <button className='text-white' onClick={() => signOut()}>
                    Logout
                </button>
            </div>

            <p>{t("test")}</p>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <Link href='/' locale='en'>
                    English
                </Link>
                <Link href='/' locale='ar'>
                    العربية
                </Link>
                <Link href='/' locale='fr'>
                    French
                </Link>
            </div>
            <h1>hope Hub</h1>
        </Layout>
    );
}

HomePage.requireAuth = true;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
