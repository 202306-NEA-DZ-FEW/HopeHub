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
        console.log("Contact Type:", Name);
        console.log("Contact Type:", ContactType);
        console.log("Contact Type:", Details);
        handleSubscribe(e);
        router.push(`/thanks?from=${pathname}`);
    };
    const handleSelectChange = (event) => {
        // Get the selected value from the event
        const selectedValue = event.target.value;

        // Update the state with the selected value
        setContactType(selectedValue);
    };

    async function handleSubscribe(e) {
        e.preventDefault();
        // console.log('email',email)

        fetch("https://sendmail-api-docs.vercel.app/api/send", {
            method: "POST",
            body: JSON.stringify({
                to: "hope.hub.dz@gmail.com",
                subject: ContactType,
                message: `
            <html>
              <body style='padding=1rem 2rem;'>
                <h1 style='font-size=18px; margin=auto;'>Need a help !!!</h1>
                <p style='font-size=16px;'>From :${Name} <br> email: ${Email} <br> 
                I have issue on ${ContactType}  <br>
                 ${Details}
                </p>
              </body>  
            </html>
          `,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert("Your messag was sent successfuly");
                } else {
                    alert(`Error: ${data.message}`);
                }
            });
        setEmail("");
    }

    return (
        <div className='container flex ml-0'>
            <form
                className='w-full max-w-2xl p-4 flex-1'
                onSubmit={handleSubmit}
            >
                <div className='login'>
                    <div>
                        <label
                            className='block text-NeutralBlack text-sm font-semibold mb-2 font-poppins'
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
                            className='block text-NeutralBlack text-sm font-semibold mb-2 font-poppins'
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
                    <div className='mt-4'>
                        <label
                            className='block text-NeutralBlack text-sm font-semibold mb-2 font-poppins'
                            htmlFor='details'
                        >
                            {t("Request Type")}
                        </label>
                        <select
                            className='select rounded w-full'
                            value={ContactType}
                            onChange={handleSelectChange}
                        >
                            <option disabled selected>
                                {t("Select Request Type")}
                            </option>
                            <option id='service' value='service'>
                                {t("I have a question about the service.")}
                            </option>
                            <option id='support' value='support'>
                                {t(
                                    "I'm a registered client and I need support."
                                )}
                            </option>
                            <option id='counselor' value='counselor'>
                                {t("I'm a counselor interested in joining.")}
                            </option>
                            <option id='counselorSup' value='counselorSup'>
                                {" "}
                                {t(
                                    "I'm a registered counselor and I need support."
                                )}
                            </option>
                            <option
                                id='businessRelated'
                                value='businessRelated'
                            >
                                {t("I have a business-related inquiry.")}
                            </option>
                            <option id='hopehub' value='hopehub'>
                                {t(
                                    "I'm interested in Hope Hub for my organization."
                                )}
                            </option>
                            <option id='billingRelated' value='billingRelated'>
                                {t("I have a billing-related question.")}
                            </option>
                        </select>
                    </div>
                    <div className='details mt-4'>
                        <label
                            className='block text-NeutralBlack text-sm font-semibold mb-2 font-poppins'
                            htmlFor='details'
                        >
                            {t("Details")}
                        </label>
                        <textarea
                            id='details'
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-Accent shadow-md bg-white resize-none'
                            value={Details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder={t("Enter your details here...")}
                        ></textarea>
                    </div>
                </div>
                <div className='text-center flex justify-end mt-3'>
                    <button
                        type='submit'
                        className='bg-Accent hover:bg-Primary text-NeutralBlack font-poppins font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-Accent'
                    >
                        {t("Submit")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
