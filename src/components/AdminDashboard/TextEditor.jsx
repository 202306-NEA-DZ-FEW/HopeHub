// import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import ReactQuill from "react-quill";
// import { useTranslation } from "next-i18next";

// import QuillEditor from "./QuillEditor";
// type Props = {};
export default function TextEditor({ value, onChange }) {
    const modules = useMemo(() => {
        return {
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
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
        };
    }, []);
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
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
    return (
        <div>
            <ReactQuill
                modules={modules}
                formats={formats}
                theme='snow'
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
// const TextEditor = ({ value, onChange }) => {
//     // const { t } = useTranslation("common");

//     return typeof window !== "undefined" ? (
//         <div>
//             {/* <EditorToolBar />
//             <QuillNoSSRWrapper
//                 theme='snow'
//                 value={value}
//                 onChange={handleChange}
//                 placeholder={t("Write something awesome...")}
//                 modules={modules}
//                 formats={formats}
//             /> */}
//             <QuillNoSSRWrapper
//                 value={value}
//                 onChange={onChange}
//                 className='h-fit'
//                 modules={modules}
//                 formats={formats}
//             />
//         </div>
//     ) : (
//         <p>Loading...</p>
//     );
// };
// export default TextEditor;
