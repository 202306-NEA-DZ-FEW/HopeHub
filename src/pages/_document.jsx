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
                        href='https://fonts.googleapis.com/css2?family=Aclonica&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
                        rel='stylesheet'
                    ></link>

                    <link rel='icon' href='/assets/logo-icon.svg' />
                </Head>
                <body className='bg-NeutralWhite dark:bg-Dark_Accent'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
