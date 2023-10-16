import { appWithTranslation } from "next-i18next";
import Footer from "@/components/Footer";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Footer></Footer>
        </>
    );
}

export default appWithTranslation(MyApp);
