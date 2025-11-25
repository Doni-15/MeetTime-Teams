import { Navigate } from "react-router-dom";

export default function GuestRoute({ children, user, loading }){
    if (loading) {
        return <div className="text-center mt-20">Memuat data...</div>;
    }

    if (user) {
        return <Navigate to="/pages/dashboard" replace />;
    }

    return children;
}