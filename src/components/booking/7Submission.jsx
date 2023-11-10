import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useTranslation } from "next-i18next";

import { useAppcontext } from "@/context/state";
import { auth, db } from "@/util/firebase";
export default function Submission({ OnNext, OnPrevious }) {
    const { bookingInfos, user, setUser } = useAppcontext();
    const { t } = useTranslation("common");
    async function handleSubmit() {
        // send request to save the data
        // ...
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
        console.log("user", user?.uid);
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
        OnNext();
    }

    return (
        <div className='bg-NeutralWhite dark:bg-Dark_Accent min-w-screen mb-12'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite dark:bg-Dark_Accent flex flex-col'>
                <div className='mb-3 pt-12 font-poppins font-bold tracking-wideer text-NeutralBlack dark:text-NeutralWhite capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("Submit your appointment")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack dark:text-NeutralWhite text-base lg:text-lg'>
                    {t("Click Submit if you are sure of all your choices.")}
                </div>

                <div className=" bg-NeutralWhite dark:bg-Dark_Accent lg:w-3/5 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'">
                    <div className='flex flex-col justify-center items-center text-center'>
                        <h3 className=' rounded-md py-12 text-NeutralBlack dark:text-NeutralWhite text-2xl font-semibold font-poppins capitalize'>
                            {t("Please be aware that this action")}
                            <br />
                            {t("will cost you a ticket!")}
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
                        <div className=' pr-6 py-10 lg:py-10 lg:pr-11 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack dark:text-NeutralWhite dark:bg-Dark_Primary dark:hover:bg-[#3E4E68]  hover:bg-[#879AB8] hover:text-NeutralWhite hover:scale-105 duration-500'
                                onClick={handleSubmit}
                            >
                                {t("Submit")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
