import { useTranslation } from "next-i18next";

export default function Blogs({ onEdit, onDelete, blog }) {
    const handleEditClick = () => {
        // Trigger the onEdit function with the entire blog object
        onEdit(blog);
    };

    const handleDeleteClick = async () => {
        try {
            // Trigger the onDelete function with the blog ID
            await onDelete(blog);
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const { t } = useTranslation("common");

    return (
        <div className='flex flex-col font-poppins text-NeutralBlack w-[1080px] '>
            <div className='flex bg-slate-200 mt-3 mx-4 py-2 px-2 space-x-2 rounded-md hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.30)] duration-500 '>
                <h3 className='flex-1'>{blog.title}</h3>
                <button
                    onClick={handleEditClick}
                    className='w-28 h-6 rounded-md self-end text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    {t("Edit")}
                </button>
                <button
                    onClick={handleDeleteClick}
                    className='w-28 h-6 rounded-md self-end text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    {t("Delete")}
                </button>
            </div>
        </div>
    );
}
