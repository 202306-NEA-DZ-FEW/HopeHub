import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const ContactForm = () => {
    const { t } = useTranslation("common");

    const [ContactType, setContactType] = useState("");

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Details, setDetails] = useState("");

    const router = useRouter();
    const pathname = usePathname().slice(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Name:", Name);
        console.log("Contact Type:", ContactType);
        router.push(`/thanks?from=${pathname}`);
    };

    return (
        <div className='container flex ml-0'>
            <form
                className='w-full max-w-2xl p-4 flex-1'
                onSubmit={handleSubmit}
            >
                <div className='login'>
                    <div>
                        <label
                            className='block text-NeutralBlack dark:text-NeutralWhite text-base font-semibold mb-2 font-poppins'
                            htmlFor='fullName'
                        >
                            {t("Full Name")}
                        </label>
                        <input
                            type='text'
                            id='fullName'
                            className='w-full px-3 py-2 border text-NeutralBlack font-medium rounded focus:outline-none focus:ring-2 focus:ring-Accent shadow-md bg-NeutralWhite'
                            placeholder={t("Enter your Full Name here...")}
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='email mt-4'>
                        <label
                            className='block text-NeutralBlack dark:text-NeutralWhite text-base font-semibold mb-2 font-poppins'
                            htmlFor='email'
                        >
                            {t("Email")}
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 text-NeutralBlack font-medium focus:ring-Accent shadow-md bg-NeutralWhite'
                            placeholder={t("Enter your email address here...")}
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-4'>
                        <label
                            className='block text-NeutralBlack dark:text-NeutralWhite text-base font-semibold mb-2 font-poppins'
                            htmlFor='details'
                        >
                            {t("Request Type")}
                        </label>
                        <select className='select rounded w-full bg-NeutralWhite text-base font-semibold'>
                            <option
                                disabled
                                selected
                                className='text-NeutralBlack font-medium'
                            >
                                {t("Select Request Type")}
                            </option>
                            <option
                                id='service'
                                value='service'
                                className='text-NeutralBlack font-medium'
                                checked={ContactType === "service"}
                            >
                                {t("I have a question about the service.")}
                            </option>
                            <option
                                id='support'
                                value='support'
                                className='text-NeutralBlack font-medium'
                                checked={ContactType === "support"}
                            >
                                {t(
                                    "I'm a registered client and I need support."
                                )}
                            </option>
                            <option
                                id='counselor'
                                value='counselor'
                                className='text-NeutralBlack font-medium'
                                checked={ContactType === "counselor"}
                            >
                                {t("I'm a counselor interested in joining.")}
                            </option>
                            <option
                                id='counselorSup'
                                value='counselorSup'
                                className='text-NeutralBlack font-medium'
                                checked={ContactType === "counselorSup"}
                            >
                                {" "}
                                {t(
                                    "I'm a registered counselor and I need support."
                                )}
                            </option>
                            <option
                                id='businessRelated'
                                value='businessRelated'
                                className='text-NeutralBlack font-medium'
                                checked={ContactType === "businessRelated"}
                            >
                                {t("I have a business-related inquiry.")}
                            </option>
                            <option
                                id='hopehub'
                                value='hopehub'
                                className='text-NeutralBlack font-medium'
                                checked={ContactType === "hopehub"}
                            >
                                {t(
                                    "I'm interested in Hope Hub for my organization."
                                )}
                            </option>
                            <option
                                id='billingRelated'
                                value='billingRelated'
                                className='text-NeutralBlack font-medium'
                                checked={ContactType === "billingRelated"}
                            >
                                {t("I have a billing-related question.")}
                            </option>
                        </select>
                    </div>
                    <div className='details mt-4'>
                        <label
                            className='block text-NeutralBlack dark:text-NeutralWhite text-base font-semibold mb-2 font-poppins'
                            htmlFor='details'
                        >
                            {t("Details")}
                        </label>
                        <textarea
                            id='details'
                            className='w-full px-3 py-2 text-NeutralBlack font-medium border rounded focus:outline-none focus:ring-2 focus:ring-Accent shadow-md bg-NeutralWhite resize-none'
                            value={Details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder={t("Enter your details here...")}
                        ></textarea>
                    </div>
                </div>
                <div className='text-center flex justify-end mt-5'>
                    <button
                        type='submit'
                        className='w-36 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Accent dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                    >
                        {t("Submit")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
