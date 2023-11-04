// Import necessary modules and components
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/layout/Layout";
import JobCard from "@/components/JobCard/JobCard";
import jobsData from "./jobdata";
// Define the Requirement component
export default function Careers() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <div className=' font-poppins p-8 lg:p-12 bg-BgWhite'>
                <div className=' py-5 flex justify-center flex-col text-[#424A4F]'>
                    <h2 className='text-5xl leading-[59.8px]'>
                        {t("CAREERS AT")} Hope Hub
                    </h2>
                    <p className='shrink-0  text-base leading-[26px] pt-2'>
                        {t("careers desc 1")}
                    </p>
                </div>
                <div className='py-5 flex justify-center flex-col text-[#424A4F]'>
                    <h2 className='text-5xl leading-[59.8px]'>
                        {t("OUR HIRING PHILOSOPHY")}
                    </h2>
                    <p className='shrink-0  text-base leading-[26px] pt-2'>
                        {t("carrers desc 2")}
                    </p>
                </div>
                <div className='py-5 flex justify-center flex-col text-[#424A4F]'>
                    <h2 className='text-5xl leading-[59.8px]'>
                        {t("CURRENT OPEN POSITIONS")}
                    </h2>
                    <p className='shrink-0  text-base leading-[26px] pt-2'>
                        {t("careers desc 3")}
                    </p>
                </div>

                <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12 pt-8'>
                    {jobsData.map((item) => {
                        return (
                            <JobCard
                                title={item.content.title}
                                location={item.content.location}
                                type={item.content.type}
                                tags={item.content.tags}
                                category={item.content.category}
                                key={item.id}
                            ></JobCard>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

// Define a function to get static props for i18n
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
