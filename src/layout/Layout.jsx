import * as React from "react";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Cookies from "js-cookie";
import i18n from "i18n";

export default function Layout({ children, user }) {
    const [textDirectionClass, setTextDirectionClass] = React.useState("ltr");

    React.useEffect(() => {
        const userLanguage = Cookies.get("userLanguage");
        i18n.changeLanguage(userLanguage);

        if (userLanguage === "ar") {
            setTextDirectionClass("rtl");
        } else {
            setTextDirectionClass("ltr");
        }
    }, []);

    return (
        <div
            className={` bg-NeutralWhite dark:bg-Dark_Accent ${textDirectionClass}`}
        >
            <Navbar user={user} />
            <div className='pt-12'>{children}</div>
            <Footer />
        </div>
    );
}
