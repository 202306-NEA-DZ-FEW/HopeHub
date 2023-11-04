import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useTranslation } from "next-i18next";

import { useAppcontext } from "@/context/state";
import { db } from "@/util/firebase";
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
        OnNext();
    }

    return (
        <div className='bg-NeutralWhite min-w-screen min-h-screen'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite flex flex-col'>
                <div className='mb-3 pt-12 font-ogg font-bold tracking-wideer text-NeutralBlack capitalize text-2xl lg:text-4xl leading-normal'>
                    {t("Submit your appointment")}
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack text-base lg:text-lg'>
                    {t("Click Submit if you are sure of all your choices.")}
                </div>

                <div className=" bg-NeutralWhite lg:w-1/2 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'">
                    <div className='flex flex-col justify-center items-center'>
                        <h3 className=' rounded-md py-12 text-NeutralBlack text-xl font-bold font-poppins capitalize'>
                            {t(
                                "Please be aware that this action will cost you a ticket!"
                            )}
                        </h3>
                    </div>
                    <div className='flex justify-between '>
                        <div className=' pl-6 py-10 lg:py-10 lg:pl-11 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                                onClick={OnPrevious}
                            >
                                {t("Previous")}
                            </button>
                        </div>
                        <div className=' pr-6 py-10 lg:py-10 lg:pr-11 group '>
                            <button
                                className='w-28 h-10 rounded-md text-base font-poppins font-regular bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                                onClick={
                                    handleSubmit // Call the handleSubmit function
                                }
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