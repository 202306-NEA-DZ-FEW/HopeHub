import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { isLogged } = useAppcontext();
    const router = useRouter();

    useEffect(() => {
        console.log("yooooo", isLogged);

        // Redirect to the login page if the user is not logged in
        if (!isLogged) {
            console.log("noooooooo", !isLogged);
            router.push("/Auth?logged=islogged");
        }
    }, [isLogged, router]);

    return isLogged ? (
        <>{children}</>
    ) : (
        <Layout>
            <div className='text-center '>
                <h1 className='text-6xl font-poppins font-bold text-Accent py-36 '>
                    You need to be logged in!
                </h1>
            </div>
        </Layout>
    );
};

export default ProtectedRoute;
