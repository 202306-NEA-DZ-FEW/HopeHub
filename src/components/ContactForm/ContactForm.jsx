import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import React from "react";
import { db } from "@/util/firebase";
import { doc, setDoc } from "firebase/firestore";

const ContactForm = ({ user }) => {
    const { t } = useTranslation("common");

    const [ContactType, setContactType] = useState("");
    const [Name, setName] = useState(user ? user.name : "");
    const [Email, setEmail] = useState(user ? user.email : "");
    const [Details, setDetails] = useState("");
    const [id, setId] = useState("");

    const router = useRouter();
    const pathname = usePathname()?.slice(1) || "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        function uniqueID() {
            return (
                Math.random().toString(36).substring(2) +
                Date.now().toString(36)
            );
        }

        try {
            const generatedId = uniqueID(); // Generate a unique ID
            setId(generatedId);

            const formData = {
                Name,
                Email,
                ContactType,
                Details,
                id: generatedId,
            };

            // Save form data to Firestore using setDoc
            await setDoc(doc(db, "contact", uniqueID()), formData);
            // Handle email sending here...
            await handleSubscribe(e);

            router.push(`/thanks?from=${pathname}`);
        } catch (error) {
            // Handle error state or alert user about submission failure
            console.error("Error saving form data: ", error);
        }
    };
    const handleSelectChange = (event) => {
        // Update the state with the selected value
        setContactType(event.target.value);
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();

        // Send email to the user
        fetch("https://sendmail-api-docs.vercel.app/api/send", {
            method: "POST",
            body: JSON.stringify({
                to: Email, // Use the provided email address
                subject: "We'll get in touch soon",
                message: `
                    <html>
                        <body style='padding=1rem 2rem;'>
                            <h1 style='font-size=18px; margin=auto;'>Thanks for reaching out!</h1>
                            <p style='font-size=16px;'>Dear ${Name}, <br><br>
                            We have received your inquiry regarding ${ContactType}. Our team will get back to you soon. <br><br>
                            Regards,<br>
                            Hope Hub
                            </p>
                        </body>  
                    </html>
                `,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert("Your message was sent successfully");
                } else {
                    alert(`Error: ${data.message}`);
                }
            });

        setEmail("");
        setName("");
        setDetails("");
        setContactType("");
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
                        <select
                            className='select rounded w-full bg-NeutralWhite text-base font-semibold'
                            value={ContactType}
                            onChange={handleSelectChange}
                        >
                            <option
                                disabled
                                value=''
                                className='text-NeutralBlack font-medium'
                            >
                                {t("Select Request Type")}
                            </option>
                            <option
                                value='I have a question about the service.'
                                id='service'
                                className='text-NeutralBlack font-medium'
                            >
                                {t("I have a question about the service.")}
                            </option>
                            <option
                                value="I'm a registered client and I need support."
                                id='service'
                                className='text-NeutralBlack font-medium'
                            >
                                {t(
                                    "I'm a registered client and I need support."
                                )}
                            </option>
                            <option
                                value="I'm a counselor interested in joining."
                                id='service'
                                className='text-NeutralBlack font-medium'
                            >
                                {t("I'm a counselor interested in joining.")}
                            </option>
                            <option
                                value="I'm a registered counselor and I need support."
                                id='service'
                                className='text-NeutralBlack font-medium'
                            >
                                {t(
                                    "I'm a registered counselor and I need support."
                                )}
                            </option>
                            <option
                                value='I have a business-related inquiry.'
                                id='service'
                                className='text-NeutralBlack font-medium'
                            >
                                {t("I have a business-related inquiry.")}
                            </option>
                            <option
                                value="I'm interested in Hope Hub for my organization."
                                id='service'
                                className='text-NeutralBlack font-medium'
                            >
                                {t(
                                    "I'm interested in Hope Hub for my organization."
                                )}
                            </option>
                            <option
                                value='I have a billing-related question.'
                                id='service'
                                className='text-NeutralBlack font-medium'
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
