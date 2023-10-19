import { SessionProvider as Provider } from "next-auth/react";

function SessionProvider({ children }) {
    return <Provider>{children}</Provider>;
}

export default SessionProvider;
