import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";

const RouteLoader = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
        setLoading(false);
        }, 500); 

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
        {loading && <PageLoader />}
        {children}
        </>
    );
};

export default RouteLoader;
