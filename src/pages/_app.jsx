import { appWithTranslation } from "next-i18next";
import { AppWrapper } from "@/context/state";
import { ThemeProvider } from "next-themes";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <ThemeProvider enableSystem={true} attribute='class'>
                <Component {...pageProps} />
            </ThemeProvider>
        </AppWrapper>
    );
}

export default appWithTranslation(MyApp);
