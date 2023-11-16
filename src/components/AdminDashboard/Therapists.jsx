import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";

export default function Therapists({
    name,
    age,
    birthday,
    gender,
    phoneNumber,
    imgURL,
    email,
    member,
    onDelete,
}) {
    const { t } = useTranslation("common");

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailSubject, setEmailSubject] = useState("");
    const [emailContent, setEmailContent] = useState("");
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const handleTherapistDeleteClick = async () => {
        try {
            // Trigger the onDelete function with the blog ID
            await onDelete(member);
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const handleSendEmailClick = () => {
        // Open the confirmation dialog
        setIsModalOpen(true);
    };

    const handleConfirmSendEmail = async () => {
        try {
            // Check if the email is already being sent
            if (isSendingEmail) {
                return;
            }

            // Set the flag to indicate that the email is being sent
            setIsSendingEmail(true);

            // Your existing logic to send the email
            await fetch("/api/sendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    to: email,
                    subject: emailSubject,
                    message: emailContent,
                }),
            });

            // Clear input fields
            setEmailSubject("");
            setEmailContent("");

            // Close the modal
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error sending email:", error);
            // Handle error if needed
        } finally {
            // Reset the flag after the email is sent or if there's an error
            setIsSendingEmail(false);
        }
    };
    // Example usage:
    // handleConfirmSendEmail("recipient@example.com", "Your Subject", "Your custom message");

    const handleCancelSendEmail = () => {
        // Clear input fields
        setEmailSubject("");
        setEmailContent("");

        // Close the modal
        setIsModalOpen(false);
    };

    return (
        <div className='card flex w-64 h-110 mb-4 mx-auto  font-poppins text-NeutralBlack bg-NeutralWhite shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)]'>
            <div className='mx-auto rounded-full my-8 px-4  '>
                <Image
                    alt={name}
                    width={80}
                    height={80}
                    src={imgURL}
                    className='rounded-full w-24 h-24'
                />{" "}
            </div>
            <div className='flex-grow space-y-3 px-4'>
                <h3>Full Name: {name}</h3>
                <h3>
                    {t("Age:")} {age}
                </h3>
                <h3>
                    {t("Birthday:")} {birthday}
                </h3>
                <h3>
                    {t("Gender:")} {gender}
                </h3>
                <h3>Phone Number: {phoneNumber}</h3>
            </div>
            <div className='flex flex-col items-center space-y-2 py-4'>
                <button
                    onClick={handleTherapistDeleteClick}
                    className='w-56 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    Delete
                </button>
                <button
                    onClick={handleSendEmailClick}
                    className='w-56 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                >
                    Send Email
                </button>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleCancelSendEmail}
                    contentLabel='Send Email Modal'
                >
                    <h2>Compose Email</h2>
                    <input
                        type='text'
                        placeholder='Subject'
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                    />
                    <textarea
                        placeholder='Email Content'
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                    />
                    <button onClick={handleConfirmSendEmail}>Send</button>
                    <button onClick={handleCancelSendEmail}>Cancel</button>
                </Modal>
            </div>
        </div>
    );
}
