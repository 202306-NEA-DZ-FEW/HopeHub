import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Cookie from "js-cookie";
import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

import { auth, db } from "@/util/firebase";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [bookingInfos, setBookingInfos] = useState({});
    const [user, setUser] = useState();
    const [isLogged, setIsLogged] = useState();
    const { theme, setTheme } = useTheme();
    const [darkMode, setDarkMode] = useState(false);
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [loading, setLoading] = useState(); // New loading state

    useEffect(() => {
        const loggedInUserCookie = Cookie.get("loggedInUser");
        if (loggedInUserCookie) {
            const fetchUser = async () => {
                try {
                    const userDoc = await getDoc(
                        doc(db, "users", loggedInUserCookie)
                    );
                    if (userDoc.exists()) {
                        setUser({
                            ...userDoc.data(),
                            uid: loggedInUserCookie,
                        });
                        setIsLogged(true);
                    } else {
                        setIsLogged(false);
                        setUser({});
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false); // Set loading to false when fetching is complete
                }
            };

            // Fetch user information on page load
            fetchUser();
        }
    }, []);

    const authChange = async () => {
        setLoading(true); // Set loading to true when starting the authentication change
        try {
            onAuthStateChanged(auth, async (logUser) => {
                if (logUser) {
                    setIsLogged(true);
                    Cookie.set("loggedInUser", auth.currentUser.uid, {
                        expires: 7,
                    });
                    const userDoc = await getDoc(doc(db, "users", logUser.uid));
                    if (userDoc.exists()) {
                        setUser({
                            ...userDoc.data(),
                            name: logUser.displayName,
                            email: logUser.email,
                            uid: logUser.uid,
                            phoneNumber: logUser.phoneNumber,
                        });
                    }
                } else {
                    setIsLogged(false);
                    setUser({});
                }
            });
        } catch (err) {
            console.error("Error in authChange:", err);
        } finally {
            setLoading(false); // Set loading to false when authentication change is complete
        }
    };

    if (loading) {
        return <div></div>;
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppcontext() {
    return useContext(AppContext);
}
