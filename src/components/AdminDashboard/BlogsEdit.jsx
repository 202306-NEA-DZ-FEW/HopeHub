import axios from "axios";
import format from "date-fns/format";
import { doc, setDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useMemo, useRef, useState } from "react";

import styles from "../../styles/BlogdEdit.module.css";

import { db } from "@/util/firebase";

// import TextEditor from "./TextEditor";

export default function BlogsEdit() {
    const TextEditor = useMemo(() => {
        return dynamic(() => import("@/components/AdminDashboard/TextEditor"), {
            loading: () => <p>loading...</p>,

            ssr: false,
        });
    }, []);

    const { t } = useTranslation("common");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        author: "",
        body: "",
        tags: [],
        imageURL: "",
        date: format(new Date(), "yyyy-MM-dd"),
        id: uniqueID(),
    });
    function uniqueID() {
        return (
            Math.random().toString(36).substring(2) + Date.now().toString(36)
        );
        // return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        //     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        // );
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "blogs", formData.id), formData);
        } catch {
            (err) => console.error("error adding the blog", err);
        }
        // Clear the form fields after submission
        setFormData({
            title: "",
            subtitle: "",
            author: "",
            body: "",
            tags: [],
            imageURL: "",
        });
        setTags([]);
    };
    function handleImage(e) {
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
                // console.log('cloudinary res', response.data.secure_url)
            })
            .catch((err) => console.error("upload image error", err));
        console.log("image uploaded", formData);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // console.log('handle change formdata', formData)
    };
    const handleButtonClick = () => {
        // Manually trigger form submission when the button is clicked
        formRef.current.dispatchEvent(new Event("submit"));
    };
    const formRef = useRef(null);
    function addTag(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            setTags([...tags, e.target.value]);
            setFormData({
                ...formData,
                tags: [...formData.tags, e.target.value],
            });
            setTag("");
        }
    }
    function deleteTag(txt) {
        let newArr = tags.filter((tag) => tag !== txt);
        setTags(newArr);
    }
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
    return (
        <div className='flex flex-col md:flex-row md:w-full '>
            <form
                onSubmit={handleSubmit}
                ref={formRef}
                className='flex flex-col w-1/2'
            >
                {" "}
                {/* Use onSubmit to handle form submission */}
                <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                    {/* <span className='text-NeutralBlack tracking-wider'>
                    {t("Title")}
                </span> */}
                    <label htmlFor='Title'>{t("Title")}</label>
                    <input
                        type='text'
                        id='Title'
                        className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                        value={formData.title} // Bind the value to the form state
                        onChange={handleChange}
                        name='title'
                    />
                </div>
                <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                    {/* <span className='text-NeutralBlack tracking-wider'>
                    {t("Title")}
                </span> */}
                    <label htmlFor='subtitleitle'>{t("Subtitle")}</label>
                    <input
                        type='text'
                        id='subtitle'
                        className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                        value={formData.subtitle} // Bind the value to the form state
                        onChange={handleChange}
                        name='subtitle'
                    />
                </div>
                <div className='pl-4 mb-4 space-y-1 text-xl flex flex-col'>
                    {/* <span className='text-NeutralBlack'>{t("Author")}</span> */}
                    <label htmlFor='Author'>{t("Author")}</label>
                    <input
                        type='text'
                        id='Author'
                        className='w-full text-NeutralBlack font-normal text-lg px-4 rounded-md border border-slate-300 bg-white py-3 outline-none '
                        value={formData.author} // Bind the value to the form state
                        onChange={handleChange}
                        name='author'
                    />
                </div>
                {/* <div className='pl-4 mb-4 h-fit space-y-1 text-xl flex flex-col'>
                <span className='text-NeutralBlack'>{t("body")}</span>
                <TextEditor
                    value={formData.body}
                    onChange={(value) =>
                        setFormData({ ...formData, body: value })
                    }
                />
            </div> */}
                <div className={styles.input_file}>
                    <input
                        type='file'
                        // value={formData.imageURL}
                        placeholder='Upload Image'
                        name='imageURL'
                        id='imageURL'
                        onChange={handleImage}
                    />
                </div>
                <button
                    onClick={handleButtonClick}
                    className='w-32 h-10 self-start ml-4 mt-20 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    {t("Submit")}
                </button>
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
                        value={formData.body}
                        onChange={(value) =>
                            setFormData({ ...formData, body: value })
                        }
                    />
                </div>
            </div>
        </div>
    );
}
