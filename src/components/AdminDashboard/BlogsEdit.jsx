import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
import format from "date-fns/format";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/util/firebase";

import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/BlogdEdit.module.css";

// Dynamically import Quill to avoid SSR
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

// Define Quill modules and formats
const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
];

// Component for the Text Editor using Quill
const TextEditor = ({ value, onChange }) => {
    const handleChange = (content, _, __, editor) => {
        onChange(editor.getHTML()); // Use editor.getHTML() to get the HTML content
    };

    return typeof window !== "undefined" ? (
        <div>
            <QuillNoSSRWrapper
                value={value}
                onChange={handleChange}
                className='h-fit'
                modules={modules}
                formats={formats}
            />
        </div>
    ) : (
        <p>Loading...</p>
    );
};

// Main BlogsEdit component
export default function BlogsEdit({ blog }) {
    const { t } = useTranslation("common");
    const fileInputRef = useRef(null);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [editorContent, setEditorContent] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        author: "",
        tags: [],
        imageURL: "",
        date: format(new Date(), "yyyy-MM-dd"),
        id: uniqueID(),
    });

    // Maximum character limits for input fields
    const MAX_TITLE_LENGTH = 40;
    const MAX_SUBTITLE_LENGTH = 80;
    const MAX_AUTHOR_LENGTH = 30;

    //useEffect to populate form data when 'blog' prop changes
    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || "",
                subTitle: blog.subTitle || "",
                author: blog.author || "",
                tags: blog.tags || [],
                imageURL: blog.imageURL || "",
                date: blog.date || format(new Date(), "yyyy-MM-dd"),
                id: blog.id || uniqueID(),
            });
            setTags(blog.tags || []);
            setEditorContent(blog.body || "");
        }
    }, [blog]);

    // Function to generate a unique ID
    function uniqueID() {
        return (
            Math.random().toString(36).substring(2) + Date.now().toString(36)
        );
    }

    // Function to check if the form is valid before submission
    const isFormValid = () => {
        const isNonEmptyString = (value) => {
            return value && value.trim() !== "";
        };

        // Check if all required fields are filled
        const requiredFieldsFilled =
            isNonEmptyString(formData.title) &&
            isNonEmptyString(formData.subTitle) &&
            isNonEmptyString(formData.author) &&
            formData.body !== null &&
            formData.body !== "<p><br></p>";

        // Check if an image is uploaded and at least one tag is added
        const imageUploaded = isNonEmptyString(formData.imageURL);
        const atLeastOneTagAdded = formData.tags.length > 0;

        return requiredFieldsFilled && imageUploaded && atLeastOneTagAdded;
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
            await setDoc(doc(db, "blogs", formData.id), formData);
        } catch (err) {
            console.error("error adding the blog", err);
        }
        setFormData({
            title: "",
            subTitle: "",
            author: "",
            tags: [],
            imageURL: "",
            date: format(new Date(), "yyyy-MM-dd"),
            id: uniqueID(),
        });
        setTags([]);
        setEditorContent("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Function to handle image upload
    const handleImage = (e) => {
        e.preventDefault();
        const img = e.target.files[0];
        const formD = new FormData();
        formD.append("file", img);
        formD.append("upload_preset", "hopehub");
        axios
            .post(
                "https://api.cloudinary.com/v1_1/dxic1agza/image/upload",
                formD
            )
            .then((response) => {
                setFormData({
                    ...formData,
                    imageURL: response.data.secure_url,
                });
            })
            .catch((err) => console.error("upload image error", err));
    };

    // Function to handle clearing image URL when the user removes the image input
    const handleClearImage = () => {
        setFormData({
            ...formData,
            imageURL: "", // Reset imageURL to an empty string
        });
    };

    // JSX for the file input
    <div className={styles.input_file}>
        <input
            type='file'
            ref={fileInputRef}
            name='imageURL'
            id='imageURL'
            onChange={handleImage}
            onClick={handleClearImage} // Add this line to handle clearing the imageURL
        />
    </div>;

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
            case "subTitle":
                if (value.length > MAX_SUBTITLE_LENGTH) {
                    truncatedValue = value.substring(0, MAX_SUBTITLE_LENGTH);
                }
                break;
            case "author":
                if (value.length > MAX_AUTHOR_LENGTH) {
                    truncatedValue = value.substring(0, MAX_AUTHOR_LENGTH);
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
            body: content,
        }));
    };

    // Function to add a tag to the tags list
    const addTag = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setTags([...tags, e.target.value]);
            setFormData({
                ...formData,
                tags: [...formData.tags, e.target.value],
            });
            setTag("");
        }
    };

    // Function to delete a tag from the tags list
    const deleteTag = (txt) => {
        let newArr = tags.filter((tag) => tag !== txt);
        setTags(newArr);
        // After updating the tags state, also update the formData
        setFormData({
            ...formData,
            tags: newArr,
        });
    };

    // Component for displaying tags
    const TagBtn = ({ txt }) => (
        <span className='w-fit p-1 mb-5 mr-2 border rounded-3xl border-gray-500  group relative'>
            {txt}{" "}
            <button
                className='rounded-full w-6 opacity-0 group-hover:opacity-100 h-6 border absolute right-0 -top-3 border-red-500 text-xs text-red-500'
                onClick={() => deleteTag(txt)}
            >
                X
            </button>
        </span>
    );

    // Function to handle resetting form fields
    const handleReset = () => {
        setFormData({
            title: "",
            subTitle: "",
            author: "",
            tags: [],
            imageURL: "",
            date: format(new Date(), "yyyy-MM-dd"),
            id: uniqueID(),
        });
        setTags([]);
        setEditorContent("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className='flex flex-col md:flex-row md:w-full '>
            <form onSubmit={handleSubmit} className='flex flex-col w-1/2'>
                <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                    <label htmlFor='Title'>{t("Title")}</label>
                    <input
                        type='text'
                        id='Title'
                        className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                        value={formData.title}
                        onChange={handleChange}
                        name='title'
                    />
                </div>
                <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                    <label htmlFor='subTitle'>{t("Subtitle")}</label>
                    <input
                        type='text'
                        id='subTitle'
                        className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                        value={formData.subTitle}
                        onChange={handleChange}
                        name='subTitle'
                    />
                </div>
                <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                    <label htmlFor='Author'>{t("Author")}</label>
                    <input
                        type='text'
                        id='Author'
                        className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                        value={formData.author}
                        onChange={handleChange}
                        name='author'
                    />
                </div>
                <div className={styles.input_file}>
                    <input
                        type='file'
                        ref={fileInputRef}
                        name='imageURL'
                        id='imageURL'
                        onChange={handleImage}
                        onClick={handleClearImage}
                    />
                </div>
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
            <div className='flex flex-col w-1/2'>
                <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                    <label htmlFor='tags'>Tags</label>
                    <input
                        type='text'
                        name='tags'
                        id='tags'
                        onChange={(e) => setTag(e.target.value)}
                        value={tag}
                        className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                        onKeyDown={addTag}
                    />
                    <div>
                        {tags?.map((tag, id) => (
                            <TagBtn key={id} txt={tag} />
                        ))}
                    </div>
                </div>
                <div className='pl-4 mb-4 h-fit space-y-1 text-xl flex flex-col'>
                    <span className='text-NeutralBlack'>{t("body")}</span>
                    <TextEditor
                        value={editorContent}
                        onChange={handleChangeEditor}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
