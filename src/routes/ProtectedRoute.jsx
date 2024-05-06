import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../hooks/useSession";

export const ProtectedRoute = () => {
    const user = useSession();

    if (user) {
        return <Outlet />;
    } else {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            return <Outlet />;
        } else {
            return <Navigate to="/login" />;
        }
    }
};