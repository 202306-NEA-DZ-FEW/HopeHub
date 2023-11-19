import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

import { useAppcontext } from "@/context/state";
const ProtectedRoute = ({ children }) => {
    const { isLogged, user } = useAppcontext();
    const router = useRouter();

    useEffect(() => {
        console.log("yooooo", isLogged);

        // Redirect to the login page if the user is not logged in
        if (isLogged) {
            console.log("noooooooo", isLogged);
            router.push("/");
            // Need to fix user data issue for this to work correctly
            // router.push(`/Profile?userid=${user.uid}`);
        }
    }, [isLogged, router]);

    return !isLogged ? <>{children}</> : "";
};

export default ProtectedRoute;
