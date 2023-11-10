import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Confirmation() {
    const { t } = useTranslation("common");
    return (
        <div className='bg-NeutralWhite dark:bg-Dark_Accent min-w-screen min-h-screen'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite dark:bg-Dark_Accent '>
                <div className='mb-3 pt-12 font-ogg font-bold text-NeutralBlack dark:text-NeutralWhite capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("your request has been submitted!")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack dark:text-NeutralWhite text-base lg:text-lg leading-relaxed'>
                    {t(
                        " You will receive an email guiding you to book a date and time soon."
                    )}
                </div>
                <div className='flex flex-col bg-NeutralWhite dark:bg-Dark_Accent lg:w-1/2 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    <div className='flex flex-col justify-center items-center'>
                        <h3 className='py-5 px-4 lg:py-5 lg:px-11 leading-normal text-NeutralBlack dark:text-NeutralWhite lg:text-2xl text-2xl font-regular font-poppins capitalize '>
                            {t("request submitted")}
                        </h3>

                        <div className=''>
                            <h3 className='py-5 px-4 lg:py-5 lg:px-11 leading-normal text-NeutralBlack lg:text-2xl text-2xl font-regular font-poppins capitalize '>
                                {t(
                                    "you will receive a confirmation email soon."
                                )}
                            </h3>
                        </div>
                    </div>

                    <div className=' self-center py-10 group '>
                        <Link
                            href='../Home '
                            className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                        >
                            {t("Back to home")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
