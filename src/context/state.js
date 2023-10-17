import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    // declare variables with useState in this part and import them in value part

    return (
        <AppContext.Provider
            value={
                {
                    //all the values declared here will be accessible for all components
                }
            }
        >
            {children}
        </AppContext.Provider>
    );
}
export function useAppcontext() {
    return useContext(AppContext);
}
