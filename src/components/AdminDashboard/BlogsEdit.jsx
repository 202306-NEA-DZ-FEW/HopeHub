import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useRef } from "react";

import TextEditor from "./TextEditor";

export default function BlogsEdit() {
    const { t } = useTranslation("common");
    const [formData, setFormData] = useState({
        Title: "",
        Author: "",
        Post: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // You can access the form data from the formData state
        const { Title, Author, Post } = formData;

        // You can perform any actions with the form data, such as sending it to an API, saving it to a database, etc.
        console.log("Form data submitted:", { Title, Author, Post });

        // Clear the form fields after submission
        setFormData({
            Title: "",
            Author: "",
            Post: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleButtonClick = () => {
        // Manually trigger form submission when the button is clicked
        formRef.current.dispatchEvent(new Event("submit"));
    };
    const formRef = useRef(null);
    return (
        <form onSubmit={handleSubmit} ref={formRef} className='flex flex-col '>
            {" "}
            {/* Use onSubmit to handle form submission */}
            <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                <span className='text-NeutralBlack tracking-wider'>
                    {t("Title")}
                </span>
                <label htmlFor='Title'>{t("Title")}</label>
                <input
                    type='text'
                    id='Title'
                    className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                    value={formData.Title} // Bind the value to the form state
                    onChange={handleChange}
                />
            </div>
            <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                <span className='text-NeutralBlack'>{t("Author")}</span>
                <label htmlFor='Author'>{t("Author")}</label>
                <input
                    type='text'
                    id='Author'
                    className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                    value={formData.Author} // Bind the value to the form state
                    onChange={handleChange}
                />
            </div>
            <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                <span className='text-NeutralBlack'>{t("Post")}</span>
                <TextEditor
                    value={formData.Post}
                    onChange={(value) =>
                        setFormData({ ...formData, Post: value })
                    }
                />
            </div>
            <button
                onClick={handleButtonClick}
                className='w-32 h-10 self-end rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
            >
                {t("Submit")}
            </button>
        </form>
    );
}
