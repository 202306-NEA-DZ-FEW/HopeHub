import { appWithTranslation } from "next-i18next";
import { AppWrapper } from "@/context/state";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <AppWrapper>
                <Component {...pageProps} />
            </AppWrapper>
        </>
    );
}

export default appWithTranslation(MyApp);
