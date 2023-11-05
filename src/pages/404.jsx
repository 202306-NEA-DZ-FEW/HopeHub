import Link from "next/link";
import * as React from "react";

import Layout from "@/layout/Layout";

export default function NotFoundPage() {
    return (
        <Layout>
            <div className='flex items-center justify-center h-screen bg-NeutralWhite'>
                <div className='text-center '>
                    <h1 className='text-6xl font-bold text-Accent'>
                        404 - Not Found
                    </h1>
                    <p className='text-xl mt-2'>
                        Sorry, the page you are looking for does not exist.
                    </p>
                    <button className='button-container mx-2 mb-1 p-2 md:mr-8 bg-Accent hover-bg-Primary rounded-md mt-4'>
                        <Link
                            href='/'
                            className='text-lg tracking-wider text-NeutralWhite font-semibold font-poppins'
                            style={{ textTransform: "capitalize" }}
                        >
                            Go back to Homepage
                        </Link>
                    </button>
                    {/* <Link href="/" className="text-blue-500 mt-8 hover:underline cursor-pointer">
      
                    Go back to Homepage
                </Link> */}
                </div>
            </div>
        </Layout>
    );
}
