import { useState } from "react";
import { useTranslation } from "next-i18next";

const ContactForm = () => {
    const { t } = useTranslation("common");

    const [ContactType, setContactType] = useState("");
    const handleRadioChange = (e) => {
        setContactType(e.target.value);
    };

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Details, setDetails] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Name:", Name);
        console.log("Contact Type:", ContactType);
    };

    return (
        <div className='container flex ml-0'>
            <form
                className='w-full max-w-lg p-4 flex-1'
                onSubmit={handleSubmit}
            >
                {/* the questions radio list */}
                <div className='mt-4'>
                    <label
                        className='block text-black text-sm font-bold mb-4 font-poppins'
                        htmlFor='contactType'
                    >
                        {t("Type of Contact")}
                    </label>
                    <div>
                        <div className='mb-2'>
                            <label className='block items-center font-poppins'>
                                <input
                                    type='radio'
                                    id='service'
                                    name='contactType'
                                    className='mr-2 form-radio bg-NeutralWhite checked:bg-red-500'
                                    value='service'
                                    checked={ContactType === "service"}
                                    onChange={handleRadioChange}
                                />
                                {t("I have a question about the service.")}
                            </label>
                        </div>
                        <div className='mb-2'>
                            <label className='block items-center text-black font-poppins'>
                                <input
                                    type='radio'
                                    id='support'
                                    name='contactType'
                                    className='mr-2 form-radio text-black'
                                    value='support'
                                    checked={ContactType === "support"}
                                    onChange={handleRadioChange}
                                />
                                {t(
                                    "I'm a registered client and I need support."
                                )}
                            </label>
                        </div>
                        <div className='mb-2'>
                            <label className='block items-center text-black font-poppins'>
                                <input
                                    type='radio'
                                    id='counselor'
                                    name='contactType'
                                    className='mr-2 form-radio text-black'
                                    value='counselor'
                                    checked={ContactType === "counselor"}
                                    onChange={handleRadioChange}
                                />
                                {t("I'm a counselor interested in joining.")}
                            </label>
                        </div>
                        <div className='mb-2'>
                            <label className='block items-center text-black font-poppins'>
                                <input
                                    type='radio'
                                    id='counselorSup'
                                    name='contactType'
                                    className='mr-2 form-radio text-black'
                                    value='counselorSup'
                                    checked={ContactType === "counselorSup"}
                                    onChange={handleRadioChange}
                                />
                                {t(
                                    "I'm a registered counselor and I need support."
                                )}
                            </label>
                        </div>
                        <div className='mb-2'>
                            <label className='block items-center text-black font-poppins'>
                                <input
                                    type='radio'
                                    id='businessRelated'
                                    name='contactType'
                                    className='mr-2 form-radio text-black'
                                    value='businessRelated'
                                    checked={ContactType === "businessRelated"}
                                    onChange={handleRadioChange}
                                />
                                {t("I have a business-related inquiry.")}
                            </label>
                        </div>
                        <div className='mb-2'>
                            <label className='block items-center text-black font-poppins'>
                                <input
                                    type='radio'
                                    id='healingOnline'
                                    name='contactType'
                                    className='mr-2 form-radio text-black'
                                    value='healingOnline'
                                    checked={ContactType === "healingOnline"}
                                    onChange={handleRadioChange}
                                />
                                {t(
                                    "I'm interested in Healing Online for my organization."
                                )}
                            </label>
                        </div>
                        <div className='mb-2'>
                            <label className='block items-center text-black font-poppins'>
                                <input
                                    type='radio'
                                    id='billingRelated'
                                    name='contactType'
                                    className='mr-2 form-radio text-black'
                                    value='billingRelated'
                                    checked={ContactType === "billingRelated"}
                                    onChange={handleRadioChange}
                                />
                                {t("I have a billing-related question.")}
                            </label>
                        </div>
                    </div>
                </div>
                <div className='login mt-10'>
                    <div>
                        <label
                            className='block text-black text-sm font-bold mb-2 font-poppins'
                            htmlFor='fullName'
                        >
                            {t("Full Name")}
                        </label>
                        <input
                            type='text'
                            id='fullName'
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-Accent shadow-md bg-white'
                            placeholder={t("Enter your Full Name here...")}
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='email mt-4'>
                        <label
                            className='block text-black text-sm font-bold mb-2 font-poppins'
                            htmlFor='email'
                        >
                            {t("Email")}
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-Accent shadow-md bg-white'
                            placeholder={t("Enter your email address here...")}
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='details mt-4'>
                        <label
                            className='block text-black text-sm font-bold mb-2 font-poppins'
                            htmlFor='details'
                        >
                            {t("Details")}
                        </label>
                        <textarea
                            id='details'
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-Accent shadow-md bg-white'
                            value={Details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder={t("Enter your details here...")}
                        ></textarea>
                    </div>
                </div>
                <div className='text-center flex items-center mt-3'>
                    <button
                        type='submit'
                        className='bg-Accent hover:bg-Primary text-black font-poppins font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-Accent'
                    >
                        {t("Submit")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
