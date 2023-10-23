import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";
import i18n from "../../i18n";
import Cookies from "js-cookie";
import Footer from "@/components/Footer/Footer";

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
            {children}
            <Footer />
        </div>
    );
}
