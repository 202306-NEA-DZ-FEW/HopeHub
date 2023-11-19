import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import React from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import placeholderImage from "../../../public/assets/Avatar-placeholder.png";
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

            const formattedEmailContent = `
                <html>
                    <body style='padding=1rem 2rem;'>
                        <h1 style='font-size:18px; margin:auto;'>${emailSubject}</h1>
                        <p style='font-size:16px;'>${emailContent}</p>
                    </body>
                </html>
            `;

            // Your existing logic to send the email
            await fetch("https://sendmail-api-docs.vercel.app/api/send", {
                method: "POST",
                body: JSON.stringify({
                    to: email,
                    subject: emailSubject,
                    message: formattedEmailContent,
                }),
            });

            toast.success("Email sent successfully", {
                position: "top-right",
                autoClose: 3000, // Close the notification after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Clear input fields
            setEmailSubject("");
            setEmailContent("");

            // Close the modal
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error sending email:", error);
            // Handle error if needed
            toast.error("Error sending email. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                    src={imgURL || placeholderImage}
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
                    className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
                    overlayClassName='fixed inset-0'
                >
                    <div className='bg-white w-full max-w-md p-6 rounded-lg shadow-xl'>
                        <h2 className='text-2xl font-bold mb-4'>
                            Compose Email
                        </h2>
                        <input
                            type='text'
                            placeholder='Subject'
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            className='w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                        />
                        <textarea
                            placeholder='Email Content'
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            className='w-full h-40 px-4 py-2 mb-4 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500'
                        />
                        <div className='flex justify-end'>
                            <button
                                onClick={handleConfirmSendEmail}
                                className='mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                            >
                                Send
                            </button>
                            <button
                                onClick={handleCancelSendEmail}
                                className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
