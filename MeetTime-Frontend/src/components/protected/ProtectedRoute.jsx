import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, user, loading }){
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[var(--color-base-400)]">
                <span className="text-xl font-semibold">Memuat data...</span>
            </div>
        );
    } 

    if (!user) {
        return <Navigate to="/autentifikasi/sign-in" replace />;
    }

    return children;
}  