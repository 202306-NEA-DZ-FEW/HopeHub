import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/util/firebase";

export const CheckoutURL = async (auth, priceId) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated");

    const checkoutSessionRef = collection(
        db,
        "customers",
        userId,
        "checkout_sessions"
    );

    const docRef = await addDoc(checkoutSessionRef, {
        mode: "payment",
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });

    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data() || {};
            if (error) {
                unsubscribe();
                reject(new Error(`An error occurred: ${error.message}`));
            }
            if (url) {
                console.log("Stripe Checkout URL:", url);
                unsubscribe();
                resolve(url);
            }
        });
    });
};
