import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link
                        rel='preload'
                        href='/fonts/inter-var-latin.woff2'
                        as='font'
                        type='font/woff2'
                        crossOrigin='anonymous'
                    />

                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossorigin
                    />
                    <link
                        href='https://fonts.googleapis.com/css2family=Poppins:ital,wght@0,500;0,600;0,700;0,800;1,300&display=swap'
                        rel='stylesheet'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Aclonica&display=swap'
                        rel='stylesheet'
                    />
                    <link rel='icon' href='/assets/logo-icon.svg' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
