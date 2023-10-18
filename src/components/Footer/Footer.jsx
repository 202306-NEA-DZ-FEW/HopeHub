import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

function Footer() {
    const { t } = useTranslation("common");
    return (
        <footer className='footer px-10 py-5 bg-[#BFDFDC] text-base-content flex flex-col md:flex-row lg:flex-row justify-between items-center'>
            <form>
                <header className=' font-bold text-xl mb-[-15px]'>
                    {t("footer_msg_1")}
                </header>
                <fieldset className='form-control w-80 mt-2'>
                    <label className='label'>
                        <span className='label-text text-[#718096]'>
                            {t("footer_msg_2")}
                        </span>
                    </label>
                    <div className='relative flex flex-row'>
                        <input
                            type='text'
                            placeholder={t("footer_msg_3")}
                            className='input input-bordered border-[#718096] border-solid pr-16 outline-none focus:outline-none'
                        />
                        <span className=' w-20 ml-[-1rem]'>
                            <svg
                                width='100%'
                                height='auto'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 100 100'
                                fill='none'
                            >
                                <path
                                    d='M1 1H54C56.7614 1 59 3.23858 59 6V54C59 56.7614 56.7614 59 54 59H1V1Z'
                                    fill='#99B4DF'
                                    stroke='#718096'
                                    stroke-width='2'
                                />
                                <path
                                    d='M29.6327 30.3673L25.0421 32.5401C24.5997 32.7861 24.053 32.7438 23.6538 32.4325L17.4862 27.7498C16.6922 27.1308 16.9078 25.8769 17.8628 25.5585L40.3377 18.0669C41.3237 17.7382 42.2618 18.6763 41.9331 19.6623L34.4415 42.1372C34.1231 43.0922 32.8691 43.3078 32.2502 42.5138L27.5675 36.3462C27.2562 35.947 27.2139 35.4003 27.4599 34.9579L29.6327 30.3673Z'
                                    fill='#1A1A1A'
                                />
                            </svg>
                        </span>
                    </div>
                </fieldset>
            </form>
            <div className=' items-center flex flex-col justify-center h-full'>
                <nav className='footer-title flex gap-8'>
                    <Link className=' ' href='../Home'>
                        {t("Home")}
                    </Link>
                    <Link className=' ' href='../Blogs'>
                        {t("Blogs")}
                    </Link>
                    <Link className=' ' href='../About'>
                        {t("About")}
                    </Link>
                    <Link className=' ' href='../Contact'>
                        {t("Contact")}
                    </Link>
                </nav>
                <div className='grid grid-flow-col gap-4'>
                    <a href=''>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='35'
                            height='35'
                            viewBox='0 0 35 35'
                            fill='none'
                        >
                            <path
                                d='M29.2578 4.62682C30.9347 4.28241 32.5884 3.39473 32.5884 3.39473C33.3256 3.04856 33.6012 3.31906 33.2037 4.01651C33.2037 4.01651 32.2112 6.07413 30.6949 7.02984C32.1797 6.84341 33.52 6.29924 33.52 6.29924C34.2926 6.0365 34.5007 6.66055 33.9952 7.29167C33.9952 7.29167 32.6842 9.11819 31.25 10.2083C31.2624 10.538 31.2682 10.4798 31.2682 10.8164C31.2682 22.4922 25.3761 32.8125 10.3789 32.8125C4.74279 32.8125 1.72544 30.5762 1.72544 30.5762C0.269777 29.8354 0.435023 28.9706 2.05229 28.7287C2.05229 28.7287 7.48179 28.2115 9.99381 26.1372C-4.37503 18.9583 1.48563 5.05932 1.48563 5.05932C1.54196 4.25827 2.09591 4.05424 2.68917 4.61642C2.68917 4.61642 9.15627 11.3561 16.7492 11.6789C16.6231 11.1127 16.5601 10.525 16.5601 9.91857C16.5601 5.64926 19.8479 2.1875 23.8993 2.1875C26.0129 2.1875 27.922 3.12555 29.2578 4.62682Z'
                                fill='#1A1A1A'
                            />
                        </svg>
                    </a>
                    <a href=''>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='35'
                            height='35'
                            viewBox='0 0 35 35'
                            fill='none'
                        >
                            <path
                                d='M1.45837 17.5389C1.45837 8.65781 8.64047 1.45825 17.5 1.45825C26.3596 1.45825 33.5417 8.65781 33.5417 17.5389C33.5417 25.8821 27.2033 32.7413 19.0902 33.5416C19.1336 33.5339 19.1769 33.5258 19.2202 33.517V22.155H23.3908L24.0148 17.3012H19.2202V14.2023C19.2202 12.7969 19.6093 11.8395 21.6199 11.8395L24.1837 11.8382V7.49707C23.7402 7.43772 22.2185 7.30577 20.4476 7.30577C16.7511 7.30577 14.22 9.56756 14.22 13.7218V17.3012H10.0388V22.155H14.22V33.2832C6.93355 31.7655 1.45837 25.2932 1.45837 17.5389Z'
                                fill='#1A1A1A'
                            />
                        </svg>
                    </a>
                    <a href=''>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='33'
                            height='33'
                            viewBox='0 0 33 33'
                            fill='none'
                        >
                            <path
                                d='M16.7259 13.3233V18.6751C16.7259 19.2279 17.1737 19.6759 17.7266 19.6752C19.597 19.6727 23.6064 19.6678 25.5202 19.6678C24.1419 23.787 21.9994 26.0297 16.7259 26.0297C11.3888 26.0297 7.22328 21.763 7.22328 16.4993C7.22328 11.2368 11.3888 6.97012 16.7259 6.97012C19.5473 6.97012 21.3699 7.9484 23.0415 9.3115C24.3792 7.99213 24.2675 7.80347 27.6716 4.6325C24.7816 2.03874 20.9409 0.458252 16.7259 0.458252C7.74238 0.458252 0.458374 7.6398 0.458374 16.4993C0.458374 25.3588 7.74238 32.5416 16.7259 32.5416C30.1541 32.5416 33.4363 21.0109 32.3486 13.3233H16.7259Z'
                                fill='#1A1A1A'
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
