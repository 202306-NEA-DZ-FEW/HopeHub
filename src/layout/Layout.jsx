import Cookies from "js-cookie";
import * as React from "react";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

import i18n from "../../i18n";

export default function Layout({ children }) {
    const userLanguage = Cookies.get("userLanguage");

    i18n.changeLanguage(userLanguage);

    let textDirectionClass = "ltr";

    if (userLanguage === "ar") {
        console.log(userLanguage);
        textDirectionClass = "rtl";
    }

    return (
        <div dir={textDirectionClass}>
            <Navbar />
            <div className='container mx-auto mt-8'>{children}</div>
            <Footer />
        </div>
    );
}
