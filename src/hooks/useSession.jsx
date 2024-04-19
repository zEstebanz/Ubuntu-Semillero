import { useEffect } from "react";

import { deleteAccessToken, getAccessToken } from "../utils/helpers/localStorage";
import { ubuntuApi } from "../utils/services/axiosConfig";
import { decodeUserData } from "../utils/helpers/decodeJWT";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setUser } from "../store/auth/authSlice";

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
        getUser()
            .then(user => {
                if (user) {
                    dispatch(setUser(user));
                    dispatch(setCredentials(getAccessToken()))
                } else {
                    deleteAccessToken();
                }
            })
            .catch(error => console.log(error))
    }, [dispatch])

    return user;
}