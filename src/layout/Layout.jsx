import React from "react";

import "./globals.css";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

import Layout from "./Layout";
import SessionProvider from "../pages/sessionProvider";

export default function RootLayout({ children }) {
    return (
        <html lang='en' className='h-full bg-white'>
            <body className='h-full'>
                <SessionProvider>
                    <Layout>
                        <>
                            <Navbar />
                            {children}
                            <Footer />
                        </>
                    </Layout>
                </SessionProvider>
            </body>
        </html>
    );
}
