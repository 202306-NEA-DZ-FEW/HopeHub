import { useTheme } from "next-themes";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    // declare variables with useState in this part and import them in value part
    const { theme, setTheme } = useTheme();
    const [darkMode, setDarkMode] = useState(false);

    function toggledarkMode() {
        setDarkMode(!darkMode);
        console.log("darkmode", darkMode);
    }
    return (
        <AppContext.Provider
            value={{
                darkMode,
                toggledarkMode,
                //all the values declared here will be accessible for all components
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export function useAppcontext() {
    return useContext(AppContext);
}
