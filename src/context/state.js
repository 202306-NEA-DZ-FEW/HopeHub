import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useTheme } from "next-themes";
import { auth, db } from "@/util/firebase";

const AppContext = createContext();

export function AppWrapper({ children }) {
    // declare variables with useState in this part and import them in value part
    const [bookingInfos, setBookingInfos] = useState({});

    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const { theme, setTheme } = useTheme();
    const [darkMode, setDarkMode] = useState(false);

    async function authChange() {
        try {
            await onAuthStateChanged(auth, async (logUser) => {
                if (logUser) {
                    console.log("logUser true", logUser);
                    setIsLogged(true);
                    const collection = await getDoc(
                        doc(db, "users", logUser.uid)
                    );
                    if (collection.exists()) {
                        setUser({
                            ...collection.data(),
                            name: logUser.displayName,
                            email: logUser.email,
                            photoURL: logUser.photoURL,
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
        console.log("darkmode", darkMode);
    }
    return (
        <AppContext.Provider
            value={{
                //all the values declared here will be accessible for all components

                bookingInfos,
                setBookingInfos,
                user,
                isLogged,
                authChange,
                darkMode,
                toggledarkMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export function useAppcontext() {
    return useContext(AppContext);
}
