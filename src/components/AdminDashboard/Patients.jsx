import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function Patients({
    name,
    age,
    birthday,
    gender,
    phoneNumber,
    imgURL,
}) {
    const { t } = useTranslation("common");
    // const [user] = useAppcontext()

    // if (user.isTherapist) {
    //     const { name, age, birthday, gender, phoneNumber } = user;

    return (
        <div className='card flex w-64 h-110 mb-4 mx-auto font-poppins text-NeutralBlack bg-NeutralWhite shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)]'>
            <div className='mx-auto rounded-full my-8 px-4  '>
                <Image
                    alt={name}
                    width={80}
                    height={80}
                    src={imgURL}
                    className='rounded-full w-24 h-24'
                />{" "}
            </div>
            <div className='flex-grow space-y-3 px-4'>
                <h3>
                    {t("Full Name:")} {name}
                </h3>
                <h3>
                    {t("Age:")} {age}
                </h3>
                <h3>
                    {t("Birthday:")} {birthday}
                </h3>
                <h3>
                    {t("Gender:")} {gender}
                </h3>
                <h3>
                    {t("Phone Number:")} {phoneNumber}
                </h3>
            </div>

            <div className='flex flex-col items-center space-y-2 py-4'>
                <button className='w-56 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'>
                    {t("Delete")}
                </button>
                <button className='w-56 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'>
                    {t("Send Email")}
                </button>
            </div>
        </div>
    );
}
