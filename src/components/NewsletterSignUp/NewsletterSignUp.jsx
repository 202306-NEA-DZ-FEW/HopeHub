// NewsletterSignUp.js

import { deleteDoc, doc, updateDoc, where } from "firebase/firestore";
import { collection, getDocs, query } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import React from "react";
import { useState } from "react";

import { db } from "@/util/firebase";
function NewsletterSignUp() {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");
    const [textDirectionClass, setTextDirectionClass] = useState("ltr");

    const router = useRouter();
    const pathname = usePathname().slice(1);

    function emailChange(e) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    async function handleSubscribe(e) {
        const sendBtn = e.type === "click" && e.target.id === "subscribe";
        if (e.key === "Enter" || sendBtn) {
            e.preventDefault();
            let blogContent = "";
            let sortedBlogs = [];
            try {
                // Fetch blogs data
                const blogSnapshot = await getDocs(collection(db, "blogs"));
                const blogs = [];
                blogSnapshot.forEach((doc) => {
                    blogs.push(doc.data());
                });
                sortedBlogs = blogs.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
            } catch (error) {
                console.log(error);
            }
            sortedBlogs.slice(0, 6).forEach((blog) => {
                const firstParagraph = blog.body.split("</p")[0]; // Assuming paragraphs are separated by two newlines
                blogContent += `
        <div style='display: flex; align-items: center; padding-bottom: 20px;'>
            <div style='width: 300px; height: 200px;'>
            <a href='https://hope-hub.vercel.app/blogs/${blog.id}' target='_blank'>
            <img src='${blog.imageURL}' alt='${blog.title}' style='width: 100%; height: 100%; object-fit: cover;' />
        </a>
                    </div>
            <div style='margin-left: 20px; width: 50%;'>
            <h2 style='font-size: 16px; font-weight: bold; color: #222; margin: 0;'>
            <a href='https://hopehub.vercel.app/blogs/${blog.id}' target='_blank' style='text-decoration: none; color: #222;'>${blog.title}</a>
             </h2>
                <p style='font-size: 12px; color: #888;'>
                    Written by ${blog.author}
                </p>
                <h4 style='font-size: 14px; font-weight: 200; color: #333;'>
                    ${firstParagraph}
                </h4>
            </div>
        </div>
        `;
            });
            fetch("https://sendmail-api-docs.vercel.app/api/send", {
                method: "POST",
                body: JSON.stringify({
                    to: email,
                    subject: "Welcome to Hope Hub",
                    message: `
                    <html>
                    <body style='padding: 1rem 2rem; font-family: "Poppins", sans-serif; background-color: #ccc; margin: 0;'>
                    <div style='background-color: #fff; margin: 20px auto; padding: 20px 10px; max-width: 800px;'>
                    <h1 style='font-size: 36px; margin: auto; text-align: center; color: #222;'>
                            <strong>HOPEHUB's</strong> Weekly Digest
                        </h1>
                        <hr style='border: none; height: 3px; background-color: #222; margin-top: 20px; margin-bottom: 20px;' />
                        <h4 style='font-size: 16px; font-weight: 200; color: #222;'>THIS WEEK'S HIGHLIGHTS</h4>
                        <hr style='border: none; height: 1px; background-color: #ccc; margin-top: 10px; margin-bottom: 20px;' />
                        ${blogContent}
                        <div style="margin-top: 20px; font-size: 14px; color: #666;">
                            <p>You are receiving this email because you subscribed to HopeHub's Newsletter</p>
                            </div>
                    </div>
                </body>
                </html>
                    `,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        router.push(`/thanks?from=${pathname}`);
                        const newsletterRef = doc(
                            db,
                            "newsletter",
                            "subscribe"
                        );
                        const docKey = email.replace(/\./g, "_");
                        try {
                            updateDoc(newsletterRef, {
                                [docKey]: email,
                            });
                        } catch (err) {
                            console.error(err);
                        }
                    } else {
                        alert(`Error: ${data.message}`);
                    }
                });
            setEmail("");
        }
    }

    async function unsubscribe(email) {
        const newsletterRef = collection(db, "newsletter", "subscribe");
        const userDoc = query(newsletterRef, where("email", "==", email));

        try {
            const snapshot = await getDocs(userDoc);
            snapshot.forEach((doc) => {
                deleteDoc(doc.ref)
                    .then(() => {
                        // Optional: Show success message or handle accordingly
                        console.log(`Successfully unsubscribed: ${email}`);
                    })
                    .catch((error) => {
                        // Handle error while deleting the document
                        console.error("Error unsubscribing:", error);
                    });
            });
        } catch (error) {
            // Handle error fetching the document
            console.error("Error fetching document:", error);
        }
    }

    return (
        <form dir={textDirectionClass === "rtl" ? "rtl" : "ltr"}>
            <fieldset className='form-control   lg:w-80 mt-2'>
                <div className='relative flex flex-row mr-[-2rem]'>
                    <input
                        onChange={emailChange}
                        value={email}
                        onKeyDown={handleSubscribe}
                        type='text'
                        placeholder={t("Enter your e-mail")}
                        className='input input-bordered cursor-text border-[#718096] border-solid w-4/5 outline-none focus:outline-none'
                    />
                    <span
                        className='w-20 md:w-24 lg:w-20 -ml-2 cursor-pointer'
                        onClick={handleSubscribe}
                    >
                        <svg
                            width='100%'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 100 100'
                            fill='none'
                        >
                            <path
                                id='subscribe'
                                d='M1 1H54C56.7614 1 59 3.23858 59 6V54C59 56.7614 56.7614 59 54 59H1V1Z'
                                fill='#99B4DF'
                                stroke='#718096'
                                strokeWidth='2'
                            />
                            <path
                                d='M29.6327 30.3673L25.0421 32.5401C24.5997 32.7861 24.053 32.7438 23.6538 32.4325L17.4862 27.7498C16.6922 27.1308 16.9078 25.8769 17.8628 25.5585L40.3377 18.0669C41.3237 17.7382 42.2618 18.6763 41.9331 19.6623L34.4415 42.1372C34.1231 43.0922 32.8691 43.3078 32.2502 42.5138L27.5675 36.3462C27.2562 35.947 27.2139 35.4003 27.4599 34.9579L29.6327 30.3673Z'
                                fill='#1A1A1A'
                            />{" "}
                        </svg>
                    </span>
                </div>
            </fieldset>
        </form>
    );
}

export default NewsletterSignUp;
