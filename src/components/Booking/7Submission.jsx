import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import { useAppcontext } from "@/context/state";
import { auth, db } from "@/util/firebase";

export default function Submission({ OnNext, OnPrevious, user }) {
    const { bookingInfos, setUser } = useAppcontext();
    const { t } = useTranslation("common");
    const [totalTickets, setTotalTickets] = useState(0); // Track total tickets
    console.log("the booking infos ", bookingInfos);
    async function handleSubmit() {
        const appointment = {
            date: bookingInfos.date,
            time: bookingInfos.start,
        };
        const appointments = user.appointments
            ? [...user.appointments, appointment]
            : [appointment];
        setUser({
            ...user,
            appointments: appointments,
        });
        // console.log("user", user?.uid);
        const userRef = doc(db, "users", user?.uid);
        await updateDoc(userRef, {
            appointments: appointments,
        });
        const rdvRef = doc(db, "appointments", user?.uid);
        const dateRef = doc(db, "dates", bookingInfos?.date);
        const dateDoc = await getDoc(dateRef);
        const docsnap = await getDoc(rdvRef);
        const key = `${bookingInfos.date}__${bookingInfos.start}`;
        if (docsnap.exists()) {
            await updateDoc(rdvRef, {
                [key]: {
                    date: bookingInfos.date,
                    time: bookingInfos.start,
                    type: bookingInfos.typesOfCounceling,
                    relationship: bookingInfos.relationshipStatus,
                    hadTherapy: bookingInfos.therapy,
                    counselorQualities: bookingInfos.counseQualities,
                    issues: bookingInfos.issues,
                    description: bookingInfos.description,
                    name: auth.currentUser.displayName,
                },
            });
        } else {
            await setDoc(rdvRef, {
                [key]: {
                    date: bookingInfos.date,
                    time: bookingInfos.start,
                    type: bookingInfos.typesOfCounceling,
                    relationship: bookingInfos.relationshipStatus,
                    hadTherapy: bookingInfos.therapy,
                    counselorQualities: bookingInfos.counseQualities,
                    issues: bookingInfos.issues,
                    description: bookingInfos.description,
                    name: auth.currentUser.displayName,
                },
            });
        }
        if (dateDoc.exists()) {
            await updateDoc(dateRef, {
                bookedHours: [
                    ...dateDoc.data().bookedHours,
                    bookingInfos.start,
                ],
            });
        } else {
            await setDoc(dateRef, {
                bookedHours: [bookingInfos.start],
            });
        }
        fetch("https://sendmail-api-docs.vercel.app/api/send", {
            method: "POST",
            body: JSON.stringify({
                to: auth.currentUser.email,
                subject: "Appointment confirmed",
                message: `
            <html>
              <body style='padding=1rem 2rem;'>
                <h1 style='font-size=18px; margin=auto;'>Hello!</h1>
                <p style='font-size=16px;'> <br>
                your appointment is confirmed for ${bookingInfos.date} at ${bookingInfos.start} </p>
              </body>
            </html>
          `,
            }),
        });

        const userId = user.uid;

        async function assignTherapist() {
            if (!userId) {
                console.error("User ID is undefined or null.");
                return;
            }

            try {
                const usersRef = collection(db, "users");
                const usersSnapshot = await getDocs(usersRef);
                const therapists = [];

                usersSnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.isTherapist === true) {
                        therapists.push({ id: doc.id, data: userData });
                    }
                });

                if (therapists.length > 0) {
                    const randomIndex = Math.floor(
                        Math.random() * therapists.length
                    );
                    const selectedTherapist = therapists[randomIndex];

                    // Update the user's document with the assigned therapist
                    await updateDoc(doc(db, "users", userId), {
                        hasTherapist: true,
                        therapistId: selectedTherapist.id,
                    });

                    // Add patient's ID to therapist's document
                    const therapistRef = doc(db, "users", selectedTherapist.id);
                    const therapistDoc = await getDoc(therapistRef);
                    const therapistData = therapistDoc.data();

                    if (!therapistData.patients) {
                        therapistData.patients = [userId];
                    } else {
                        therapistData.patients.push(userId);
                    }

                    await updateDoc(therapistRef, {
                        patients: therapistData.patients,
                    });

                    console.log("Therapist assigned:", selectedTherapist);
                } else {
                    console.log("No therapists available.");
                }
            } catch (error) {
                console.error("Error assigning therapist:", error);
            }
        }

        assignTherapist();
        OnNext();
    }

    return (
        <div className='bg-NeutralWhite dark:bg-Dark_Accent min-w-screen mb-12'>
            <Head>
                <title>Submission</title>
            </Head>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite dark:bg-Dark_Accent flex flex-col'>
                <div className='mb-3 pt-12 font-poppins font-bold tracking-wideer text-NeutralBlack dark:text-NeutralWhite capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("Submit your appointment")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack dark:text-NeutralWhite text-base lg:text-lg'>
                    {t("Click Submit if you are sure of all your choices.")}
                </div>

                <div className=" bg-NeutralWhite dark:bg-Dark_Accent lg:w-3/5 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'">
                    <div className='flex flex-col justify-center items-center text-center'>
                        <h3 className=' rounded-md py-6 text-NeutralBlack dark:text-NeutralWhite text-2xl font-semibold font-poppins capitalize'>
                            {t("Please be aware that this action")}
                            <br />
                            {t("will cost you a ticket!")}
                        </h3>

                        <h3 className='font-poppins text-NeutralBlack dark:text-NeutralWhite'>
                            You currently have {user.totalTickets} tickets.
                        </h3>
                    </div>
                    <div className='flex justify-between '>
                        <div className=' pl-6 py-10 lg:py-10 lg:pl-11 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                                onClick={OnPrevious}
                            >
                                {t("Previous")}
                            </button>
                        </div>

                        <div className=' pr-6 py-10 lg:py-10 lg:pr-11 group'>
                            {user.totalTickets === 0 ? (
                                <div className='flex flex-col justify-end items-end'>
                                    <button
                                        disabled
                                        className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-gray-300 text-NeutralBlack dark:text-NeutralWhite'
                                    >
                                        {t("Submit")}
                                    </button>
                                    <p className='font-poppins text-xs mt-2'>
                                        Please purchase a ticket first.
                                    </p>
                                </div>
                            ) : (
                                <button
                                    className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                                    onClick={handleSubmit}
                                >
                                    {t("Submit")}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
