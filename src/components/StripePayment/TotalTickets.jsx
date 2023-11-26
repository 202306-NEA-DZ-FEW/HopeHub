import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "@/util/firebase";

const TotalTickets = ({ user, setTotalTickets }) => {
    const [totalTicketsFromPayments, setTotalTicketsFromPayments] = useState(0);

    useEffect(() => {
        const fetchTotalTicketsFromPayments = async () => {
            try {
                if (user) {
                    const paymentsCollectionRef = collection(
                        db,
                        "customers",
                        user.uid,
                        "payments"
                    );

                    const paymentsQuerySnapshot = await getDocs(
                        query(
                            paymentsCollectionRef,
                            where("status", "==", "succeeded")
                        )
                    );

                    let totalTickets = 0;

                    for (const paymentDoc of paymentsQuerySnapshot.docs) {
                        const paymentData = paymentDoc.data();
                        const itemsArray = paymentData.items || [];

                        itemsArray.forEach((item) => {
                            const description = item.description || "";
                            const ticketsMatch =
                                description.match(/(\d+) Tickets/);

                            if (ticketsMatch) {
                                const ticketsCount = parseInt(
                                    ticketsMatch[1],
                                    10
                                );
                                totalTickets += ticketsCount;
                            }
                        });
                    }

                    let appointmentsCount = 0;

                    if (
                        user &&
                        user.appointments &&
                        Array.isArray(user.appointments)
                    ) {
                        appointmentsCount = user.appointments.length;
                        // Use appointmentsCount as needed
                    } else {
                        appointmentsCount = 0;
                        // Handle the case where appointments are not properly defined
                    }

                    const remainingTickets = totalTickets - appointmentsCount;

                    setTotalTickets(remainingTickets);

                    // Update the user document with totalTickets
                    const userDocRef = doc(db, "users", user.uid);
                    // Update the totalTickets field
                    await updateDoc(userDocRef, {
                        totalTickets: remainingTickets,
                    });

                    setTotalTicketsFromPayments(remainingTickets);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchTotalTicketsFromPayments();
    }, [user]);

    return (
        <div className='font-poppins text-base mx-6 md:text-xl md:mx-9 md:pb-9 pb-6 text-NeutralBlack dark:text-NeutralWhite '>
            Total Tickets: {totalTicketsFromPayments}
        </div>
    );
};

export default TotalTickets;
