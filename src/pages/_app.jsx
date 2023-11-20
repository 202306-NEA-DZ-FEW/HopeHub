import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "@/styles/globals.css";

import { AppWrapper } from "@/context/state";

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <ToastContainer />
            <ThemeProvider enableSystem={true} attribute='class'>
                <Component {...pageProps} />
            </ThemeProvider>
        </AppWrapper>
    );
}

export default appWithTranslation(MyApp);
