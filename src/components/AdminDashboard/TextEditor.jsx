import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";

import EditorToolBar, {
    formats,
    modules,
} from "@/components/AdminDashboard/EditorToolBar";

const TextEditor = () => {
    const { t } = useTranslation("common");
    const [value, setValue] = useState("");
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        []
    );

    return (
        <div>
            <EditorToolBar />
            <ReactQuill
                theme='snow'
                value={value}
                onChange={setValue}
                placeholder={t("Write something awesome...")}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default TextEditor;
