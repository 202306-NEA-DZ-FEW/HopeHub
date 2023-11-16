import { doc, getDoc } from "firebase/firestore";

import { db } from "@/util/firebase"; // Update with your actual path

export async function getUserData(userId) {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
        return userDoc.data();
    }

    return null;
}
