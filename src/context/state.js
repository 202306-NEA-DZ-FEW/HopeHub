import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    setDoc,
    addDoc,
    getDocs,
} from "firebase/firestore";
import Cookie from "js-cookie";
import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "@/util/firebase";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [bookingInfos, setBookingInfos] = useState({});
    const [user, setUser] = useState();
    const [isLogged, setIsLogged] = useState();
    const { theme, setTheme } = useTheme();
    const [darkMode, setDarkMode] = useState(false);
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [blogs, setBlogs] = useState([{}]); // Store the blogs data

    async function fetchBlogs() {
        try {
            const blogsCollection = collection(db, "blogs");
            const data = await getDocs(blogsCollection);
            const blogsData = [];
            data.forEach((doc) => {
                const blog = doc.data();
                blogsData.push(blog);
            });
            setBlogs(blogsData);
            // return blogsData
        } catch (error) {
            console.log("error fetching blogs:", error);
        }
    }
    useEffect(() => {
        const loggedInUserCookie = Cookie.get("loggedInUser");
        if (loggedInUserCookie) {
            // User is logged in, set isLogged to true
            setIsLogged(true);
            // You can also fetch the user's data from the cookie and set it to the user state
            setUser({ uid: loggedInUserCookie });
        }
        // Fetch blogs data when the component mounts

        fetchBlogs();
    }, []);

    async function authChange() {
        try {
            await onAuthStateChanged(auth, async (logUser) => {
                if (logUser) {
                    setIsLogged(true);
                    const userDocRef = doc(db, "users", logUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setUser({
                            ...userDoc.data(),
                            name: logUser.displayName,
                            email: logUser.email,
                            uid: logUser.uid,
                            phoneNumber: logUser.phoneNumber,
                        });
                    } else {
                        // If the document doesn't exist, create it
                        await setDoc(userDocRef, {
                            name: logUser.displayName,
                            email: logUser.email,
                            uid: logUser.uid,
                            phoneNumber: logUser.phoneNumber,
                            // Add other initial fields if needed
                        });
                        // Set the user with the created document data
                        setUser({
                            name: logUser.displayName,
                            email: logUser.email,
                            uid: logUser.uid,
                            phoneNumber: logUser.phoneNumber,
                        });
                    }
                } else {
                    setIsLogged(false);
                    setUser({});
                    console.log("user not logged");
                }
            });
        } catch (err) {
            console.log("AuthChange error", err);
        }
    }

    function toggledarkMode() {
        setDarkMode(!darkMode);
        // console.log("darkmode", darkMode);
    }

    return (
        <AppContext.Provider
            value={{
                // All the values declared here will be accessible for all components
                bookingInfos,
                setBookingInfos,
                user,
                isLogged,
                authChange,
                darkMode,
                toggledarkMode,
                profileUpdated,
                setProfileUpdated,
                setUser,
                blogs, // Make blogs data accessible in your context
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppcontext() {
    return useContext(AppContext);
}
