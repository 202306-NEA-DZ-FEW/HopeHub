import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import EditorToolBar, {
    formats,
} from "@/components/AdminDashboard/EditorToolBar";

const TextEditor = ({ value, onChange }) => {
    const { t } = useTranslation("common");

    const QuillNoSSRWrapper = dynamic(import("react-quill"), {
        ssr: false,
    });
    // call onChange to update parent state
    const handleChange = (newValue) => {
        onChange(newValue);
    };

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

    return typeof window !== "undefined" ? (
        <div>
            <EditorToolBar />
            <QuillNoSSRWrapper
                theme='snow'
                value={value}
                onChange={handleChange}
                placeholder={t("Write something awesome...")}
                modules={modules}
                formats={formats}
            />
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default TextEditor;
