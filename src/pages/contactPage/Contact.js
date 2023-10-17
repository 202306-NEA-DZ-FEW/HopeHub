import Image from "next/image.js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import ContactForm from "../contactPage/ContactForm.jsx";

function Contact() {
    const { t } = useTranslation("common");

    return (
        <div className='bg-white flex '>
            <div className='flex-1 p-1 w-full m-20'>
                <div>
                    <h1 className='text-black font-bold font-poppins'>
                        {t("SEND US YOUR REQUEST!")}
                    </h1>
                    <p className='text-black font-medium font-poppins'>
                        {t(
                            "Do you have a question, concern, idea, feedback, or problem? If you need assistance, please fill out the form below, and we'd be happy to help!"
                        )}
                    </p>
                </div>
                <ContactForm className='flex-1 w-2/3' />
            </div>
            {/* Small card at the right bottom for "Find Us At" */}
            <div className='w-2/3 p-4 flex flex-col items-end absolute bottom-10 right-20'>
                <div className='bg-gray-300 p-4 rounded shadow-md w-60'>
                    <h2 className='text-black font-bold font-poppins'>
                        {t("Find Us At")}
                    </h2>
                    <p className='text-black font-medium font-poppins'>
                        {t("Nergiz Plaza")} <br />
                        {t("Nergiz Plaza")} <br />
                        {t("Bakhtiyari Street 40m")} <br />
                        {t("Bakhtiyari Street 40m")} <br />
                        {t("44001")}
                    </p>
                </div>
            </div>
            {/* Image on the right-middle */}
            <div className='absolute top-1/3 right-20 transform translate-y-(-60%)'>
                <Image
                    className='mx-20'
                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACCCAMAAADovAORAAAAMFBMVEXx8/XCy9K/yND09vfq7fDN1NrI0Nfl6ezi5urS2N7t8PLd4ubW3OHZ3+O7xc3FzdXt7dHGAAADJklEQVR4nO2a2ZKsIAxAkdWd///b69I94gZBCO2tynnoh65pPcZAAgyr/ivYrwXiIF1MSBcT0sWEdDEhXUxIFxPSxYR0MSFdTEgXE9LFhHQxIV1MSBcT0sWEdINwXumZio888qeFdSc9PRgmFhgzg7ZVjHJRXc5VJ2fNP4Ro617DhUvqcmVa1/VjzNoaLFxOd5I9u36VZQPLiVK6vKrvXFdkA/Etpasu0uAYYRW+TBldPoRkl2HXBXO4jO591h4IZUQJXR1MhC3Cxh/gArq6hcrOvq03wPi6Chzaj3D9S10VE9vV1+if6epY2ZlW3SUEsu4j2ynA/Y0vsq58pstYN6brWqXmLhX89xw+g53iaxJ15+ZvafhAxX35Rf3YdsLYFF3e/D14B/SFVF4P0p7vA9Xl/XZv78zoPF+a7TRBnCscVHc3xEUPsH04Kex8T+MEqMvN/kLhdLCPJwXX9xhfoK7dv1gRHG5j0jDbfA/5C9PdxtmHOqDrpnqa774gA3WHw1VMQDe+U7hD7nyBun2cLs+RuF9f91ZAXXW4xuDV5V2mVFh9o3Urfhhq3lXg6eEScV4lVHcfr9YbXJstcVecMgotE3sFf3DzzGGu71/ugXsG5wXfdqOr7XHSy8F3noe3OPqzGRdY/MWtJMGoSN2Jpp5MZH/RKLmPlT0VFqSN1p13PHmo+ib3YdeI9oFumNyzwua71P3culkLxJ4hu256S+5hbgNX3XEc+Th/pPpipcKK5qziVvemnRaNrDVdE7PQPRPYck5FWmYH53BjWuiamJONAxgFwkVchgOyjX0FR7adj10uv5X9g5zgHbruHUI20eMOOxUCwpEpgVYgoMKdvzvYg9QrRAHeDsNpG2MR4OPPX6fCh4t9qitGE75UEUQHSYXEzcaMCBMecZmXvkmI+5ONdyXuF/9aMuIMtRD+DXPElvwh4vKkYOFFw2xDyJsZLfcOUzYuB9xrbS9L8ottLyaIV3QKt5wq3BtHmUvtrDK4fUHP6GeqcNWy78Qr24u327K5p+yV1rrp5H8gy5Z/Avy1AkEQBEEQBEEQBEEQBEEQBEEQG/8AalYz+FMsLyQAAAAASUVORK5CYII='
                    alt='hopehub Image'
                />
            </div>
        </div>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
export default Contact;
