import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../hooks/useSession";

export const ProtectedRoute = () => {
    const user = useSession();

    if (user) {
        return (<Outlet />)
    }

    return (<Navigate to='/login' />)
}