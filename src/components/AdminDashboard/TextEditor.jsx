import dynamic from "next/dynamic";
// import { useTranslation } from "next-i18next";

// import QuillEditor from "./QuillEditor";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

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
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};
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

const TextEditor = ({ value, onChange }) => {
    // const { t } = useTranslation("common");
    const handleChange = (content, delta, source, editor) => {
        onChange(content); // Ensure that you are updating the parent state
    };

    return typeof window !== "undefined" ? (
        <div>
            {/* <EditorToolBar />
            <QuillNoSSRWrapper
                theme='snow'
                value={value}
                onChange={handleChange}
                placeholder={t("Write something awesome...")}
                modules={modules}
                formats={formats}
            /> */}
            <QuillNoSSRWrapper
                value={value}
                onChange={(content, _, __, editor) => {
                    // Call the onChange prop with the HTML content of the editor
                    onChange(editor.getHTML());
                    console.log("Editor content changed:", content);
                }}
                className='h-fit'
                modules={modules}
                formats={formats}
            />
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default TextEditor;
