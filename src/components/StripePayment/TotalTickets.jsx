import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/util/firebase";

const TotalTickets = ({ user }) => {
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

                    setTotalTicketsFromPayments(totalTickets);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchTotalTicketsFromPayments();
    }, [user]);

    return <div>Total Tickets from Payments: {totalTicketsFromPayments}</div>;
};

export default TotalTickets;
