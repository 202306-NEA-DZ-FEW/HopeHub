import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}
export function useAppcontext() {
    return useContext(AppContext);
}
