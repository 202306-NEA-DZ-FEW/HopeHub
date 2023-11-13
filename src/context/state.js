import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

    useEffect(() => {
        const loggedInUserCookie = Cookie.get("loggedInUser");
        if (loggedInUserCookie) {
            // User is logged in, set isLogged to true
            setIsLogged(true);
            // You can also fetch the user's data from the cookie and set it to the user state
            setUser({ ...user, uid: loggedInUserCookie });
        }
        // Fetch blogs data when the component mounts
    }, []);

    async function authChange() {
        try {
            await onAuthStateChanged(auth, async (logUser) => {
                if (logUser) {
                    // console.log("logUser true", logUser);
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
                    console.log("logUser false", logUser);
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppcontext() {
    return useContext(AppContext);
}
