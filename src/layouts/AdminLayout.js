import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import PageLoader from "../components/PageLoader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <PageLoader />;

    return (
        <>
        <Navbar />
        <Sidebar />
        <div className="app-content">
            <Outlet />
        </div>
        </>
    );
};

export default AdminLayout;
