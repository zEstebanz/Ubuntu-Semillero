import { useEffect } from "react";
import { deleteAccessToken, getAccessToken } from "../utils/helpers/localStorage";
import { ubuntuApi } from "../utils/services/axiosConfig";
import { decodeUserData } from "../utils/helpers/decodeJWT";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setUser, logout } from "../store/auth/authSlice";

const getUser = async () => {
    try {
        const { headers } = await ubuntuApi.get('/auth/user/details', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        });
        const user = decodeUserData(headers.getAuthorization())

        return user;
    } catch (error) {
        console.log(error);
        if (error.response?.status === 403) {
            return null;
        }
    }
}

export const useSession = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.user);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            dispatch(setUser(storedUser));
        }

        const fetchUser = async () => {
            try {
                const user = await getUser();
                if (user) {
                    dispatch(setUser(user));
                    dispatch(setCredentials(getAccessToken()));
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    dispatch(logout()); 
                    deleteAccessToken();
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();

    }, [dispatch]);

    return user;
};
