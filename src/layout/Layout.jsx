import * as React from "react";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }) {
    // const userLanguage = Cookies.get("userLanguage");

    // i18n.changeLanguage(userLanguage);

    // let textDirectionClass = "ltr";

    // if (userLanguage === "ar") {
    //     // console.log(userLanguage);
    //     textDirectionClass = "ltr";
    // }

    return (
        <div className='bg-NeutralWhite dark:bg-Dark_Accent'>
            <Navbar />
            <div className='pt-12'>{children}</div>
            <Footer />
        </div>
    );
}
