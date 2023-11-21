import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import Modal from "react-modal";

import { db } from "@/util/firebase";

const ReceivedEmails = ({ emails: initialEmails }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailContent, setEmailContent] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [currentTab, setCurrentTab] = useState("all");
    const [emails, setEmails] = useState(initialEmails); // Store emails in state

    const handleSendEmailClick = (emailId) => {
        // console.log("Clicked Send Email for emailId:", emailId);
        setSelectedEmailId(emailId);
        setIsModalOpen(true);
    };

    const handleConfirmSendEmail = async () => {
        try {
            if (isSendingEmail) {
                return;
            }
            setIsSendingEmail(true);

            // Your existing logic to send the email
            await fetch("https://sendmail-api-docs.vercel.app/api/send", {
                method: "POST",
                body: JSON.stringify({
                    to: emails.find((email) => email.id === selectedEmailId)
                        ?.data.Email,
                    subject: emailSubject,
                    message: emailContent,
                }),
            });

            // Show success notification
            // ...

            // Clear input fields and close modal
            setEmailSubject("");
            setEmailContent("");
            setIsModalOpen(false);
        } catch (error) {
            // Handle error if needed
            // ...
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handleCancelSendEmail = () => {
        setEmailSubject("");
        setEmailContent("");
        setIsModalOpen(false);
    };

    const handleRespond = (emailId) => {
        // console.log("Clicked Respond for emailId:", emailId);

        handleSendEmailClick(emailId);
    };

    const handleDelete = async (emailId, isArchived) => {
        try {
            const emailRef = doc(db, "contact", emailId);
            await updateDoc(emailRef, { archived: !isArchived });

            // Update the emails list to reflect the change
            setEmails((prevEmails) =>
                prevEmails.map((email) =>
                    email.id === emailId
                        ? {
                              ...email,
                              data: { ...email.data, archived: !isArchived },
                          }
                        : email
                )
            );
        } catch (error) {
            console.error("Error updating email status:", error);
        }
    };

    const filteredEmails = {
        all: emails,
        archived: emails.filter((email) => email.data.archived === true),
        notArchived: emails.filter((email) => email.data.archived !== true),
    }[currentTab];

    return (
        <div className='p-8'>
            <h2 className='font-bold text-2xl mb-4'>Received Emails</h2>
            <div>
                <div className='flex space-x-4 mb-4'>
                    <button
                        className={`py-2 px-4 ${
                            currentTab === "all"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-700"
                        } rounded`}
                        onClick={() => setCurrentTab("all")}
                    >
                        All
                    </button>
                    <button
                        className={`py-2 px-4 ${
                            currentTab === "archived"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-700"
                        } rounded`}
                        onClick={() => setCurrentTab("archived")}
                    >
                        Archived
                    </button>
                    <button
                        className={`py-2 px-4 ${
                            currentTab === "notArchived"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-700"
                        } rounded`}
                        onClick={() => setCurrentTab("notArchived")}
                    >
                        Not Archived
                    </button>
                </div>
                <table className='w-full border-collapse border border-gray-300'>
                    <thead className='bg-gray-200'>
                        <tr>
                            {/* Adjust headers based on your email structure */}
                            <th className='py-2 px-4 border-b'>Name</th>
                            <th className='py-2 px-4 border-b'>Email</th>
                            <th className='py-2 px-4 border-b'>Contact Type</th>
                            <th className='py-2 px-4 border-b'>Details</th>
                            <th className='py-2 px-4 border-b'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmails.map((email) => (
                            <tr key={email.id} className='hover:bg-gray-100'>
                                {/* Render email data */}
                                {/* Replace fields with your email data structure */}
                                <td className='py-2 px-4 border-b'>
                                    {email.data.Name}
                                </td>
                                <td className='py-2 px-4 border-b'>
                                    {email.data.Email}
                                </td>
                                <td className='py-2 px-4 border-b'>
                                    {email.data.ContactType}
                                </td>
                                <td className='py-2 px-4 border-b'>
                                    {email.data.Details}
                                </td>
                                <td className='py-2 px-4 border-b flex flex-row'>
                                    <button
                                        className='mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                                        onClick={() =>
                                            handleSendEmailClick(email.id)
                                        }
                                    >
                                        Respond
                                    </button>
                                    {email.data.archived ? (
                                        <button
                                            className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400'
                                            onClick={() =>
                                                handleDelete(
                                                    email.id,
                                                    email.data.archived
                                                )
                                            }
                                        >
                                            Unarchive
                                        </button>
                                    ) : (
                                        <button
                                            className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400'
                                            onClick={() =>
                                                handleDelete(
                                                    email.id,
                                                    email.data.archived
                                                )
                                            }
                                        >
                                            Archive
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal for composing response */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCancelSendEmail}
                contentLabel='Send Email Modal'
                className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
                overlayClassName='fixed inset-0 z-50'
            >
                <div className='bg-white w-full max-w-md p-6 rounded-lg shadow-xl'>
                    <div className='modal-content'>
                        <span
                            className='close absolute top-2 right-2 cursor-pointer text-gray-600'
                            onClick={handleCancelSendEmail}
                        >
                            &times;
                        </span>
                        <h2 className='text-2xl font-semibold mb-4'>
                            Compose Response
                        </h2>
                        <div className='mb-4'>
                            <label
                                htmlFor='subject'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Subject:
                            </label>
                            <input
                                type='text'
                                id='subject'
                                value={emailSubject}
                                onChange={(e) =>
                                    setEmailSubject(e.target.value)
                                }
                                className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500'
                            />
                        </div>
                        <div className='mb-6'>
                            <label
                                htmlFor='content'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Message:
                            </label>
                            <textarea
                                id='content'
                                value={emailContent}
                                onChange={(e) =>
                                    setEmailContent(e.target.value)
                                }
                                className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500'
                                rows={5}
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                onClick={handleConfirmSendEmail}
                                className='mr-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                            >
                                Send
                            </button>
                            <button
                                onClick={handleCancelSendEmail}
                                className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ReceivedEmails;
