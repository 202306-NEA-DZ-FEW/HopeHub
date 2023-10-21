import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function Layout({ children }) {
    // Put Header or Footer around the children element
    // Example
    return (
        <>
            <Navbar />
            <div className='container mx-auto mt-8'>{children}</div>
            <Footer />
        </>
    );

    // return <>{children}</>;
}
