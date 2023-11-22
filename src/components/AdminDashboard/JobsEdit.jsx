import axios from "axios";
import format from "date-fns/format";
import { doc, setDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import React from "react";

import "react-toastify/dist/ReactToastify.css";

import { db } from "@/util/firebase";

// TextEditor is dynamically loaded
export default function JobsEdit({ job }) {
    const TextEditor = useMemo(() => {
        return dynamic(() => import("@/components/AdminDashboard/TextEditor"), {
            loading: () => <p>loading...</p>,
            ssr: false,
        });
    }, []);

    const { t } = useTranslation("common");
    // State to manage form data and other UI elements
    const [editorContent, setEditorContent] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        department: "",
        description: "",
        location: "",
        datePosted: format(new Date(), "yyyy-MM-dd"),
        id: uniqueID(),
    });
    const fileInputRef = useRef(null);

    // useEffect to populate form data when 'job' prop changes
    useEffect(() => {
        if (job) {
            setFormData({
                title: job.title || "",
                department: job.department || "",
                location: job.location || "",
                datePosted: job.datePosted || format(new Date(), "yyyy-MM-dd"),
                id: job.id || uniqueID(),
            });
            setEditorContent(job.description || "");
        }
    }, [job]);

    // Function to generate a unique ID
    function uniqueID() {
        return (
            Math.random().toString(36).substring(2) + Date.now().toString(36)
        );
    }

    // Maximum character limits for input fields
    const MAX_TITLE_LENGTH = 40;
    const MAX_DEPARTMENT_LENGTH = 40;
    const MAX_LOCATION_LENGTH = 30;

    // Function to check if the form is valid before submission
    const isFormValid = () => {
        const isNonEmptyString = (value) => {
            return value && value.trim() !== "";
        };

        // Check if all required fields are filled
        const requiredFieldsFilled =
            isNonEmptyString(formData.title) &&
            isNonEmptyString(formData.location) &&
            isNonEmptyString(formData.department) &&
            isNonEmptyString(formData.description); // Check for non-empty description
        formData.description !== null && formData.description !== "<p><br></p>";

        return requiredFieldsFilled;
    };

    // Function to display a toast notification for incomplete form
    const showToast = () => {
        toast.error("Please fill in all required fields!", {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            showToast();
            return;
        }
        try {
            await setDoc(doc(db, "jobs", formData.id), formData);
        } catch (err) {
            console.error("Error adding the job", err);
        }
        // Clear the form fields after submission
        setFormData({
            title: "",
            department: "",
            location: "",
            datePosted: format(new Date(), "yyyy-MM-dd"),
            id: uniqueID(),
        });
        setEditorContent("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check for input name and restrict character length accordingly
        let truncatedValue = value;
        switch (name) {
            case "title":
                if (value.length > MAX_TITLE_LENGTH) {
                    truncatedValue = value.substring(0, MAX_TITLE_LENGTH);
                }
                break;
            case "department":
                if (value.length > MAX_DEPARTMENT_LENGTH) {
                    truncatedValue = value.substring(0, MAX_DEPARTMENT_LENGTH);
                }
                break;
            case "location":
                if (value.length > MAX_LOCATION_LENGTH) {
                    truncatedValue = value.substring(0, MAX_LOCATION_LENGTH);
                }
                break;
            default:
                break;
        }
        setFormData({
            ...formData,
            [name]: truncatedValue,
        });
    };

    // Function to handle changes in the editor content

    const handleChangeEditor = (content) => {
        setEditorContent(content);
        setFormData((prevFormData) => ({
            ...prevFormData,
            description: content,
        }));
    };

    // Function to handle resetting form fields
    const handleReset = () => {
        setFormData({
            title: "",
            department: "",
            location: "",
            date: format(new Date(), "yyyy-MM-dd"),
            id: uniqueID(),
        });
        setEditorContent("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className='flex flex-col md:flex-row md:w-full mx-6'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                {/* Title */}
                <div className='mb-4 space-y-1 text-xl flex flex-col'>
                    <label htmlFor='Title'>{t("Title")}</label>
                    <input
                        type='text'
                        id='Title'
                        className='w-full rounded-md border border-gray-300 bg-white py-3 outline-none'
                        value={formData.title}
                        onChange={handleChange}
                        name='title'
                    />
                </div>
                {/* Department */}
                <div className='mb-4 space-y-1 text-xl flex flex-col'>
                    <label htmlFor='Department'>{t("Department")}</label>
                    <input
                        type='text'
                        id='Department'
                        className='w-full rounded-md border border-gray-300 bg-white py-3 outline-none'
                        value={formData.department}
                        onChange={handleChange}
                        name='department'
                    />
                </div>
                {/* Location */}
                <div className='mb-4 space-y-1 text-xl flex flex-col'>
                    <label htmlFor='Location'>{t("Location")}</label>
                    <input
                        type='text'
                        id='Location'
                        className='w-full rounded-md border border-gray-300 bg-white py-3 outline-none'
                        value={formData.location}
                        onChange={handleChange}
                        name='location'
                    />
                </div>
                {/* Reset and Submit buttons */}
                <div className='flex flex-row'>
                    <button
                        onClick={handleReset}
                        className='w-32 h-10 self-start ml-4 mt-20 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                    >
                        {t("Reset")}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='w-32 h-10 self-start ml-4 mt-20 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                    >
                        {t("Submit")}
                    </button>
                </div>
            </form>
            {/* Text Editor */}
            <div className='pl-4 mb-4 h-fit space-y-1 text-xl flex flex-col'>
                <span className='text-NeutralBlack'>{t("Body")}</span>
                <TextEditor
                    value={editorContent}
                    onChange={handleChangeEditor}
                />
            </div>
        </div>
    );
}
