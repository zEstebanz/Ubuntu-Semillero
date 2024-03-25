import { useEffect, useState } from "react";
import { ubuntuApi } from '../utils/services/axiosConfig'
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { saveAccessToken } from "../utils/helpers/localStorage";

export const useGoogleAuth = (wrapperRef) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [googleButtonWrapper, setGoogleButtonWrapper] = useState();

    const handleCredentialResponse = async (response) => {
        try {
            const { headers } = await ubuntuApi.post(`/auth/token`, null, {
                headers: {
                    Authorization: `Bearer ${response.credential}`
                }
            });
            console.log(headers);
            const accessToken = headers.getAuthorization();

            dispatch(setCredentials(accessToken));
            saveAccessToken(accessToken);

            // TODO: Redireccionar a dashboard de administrador
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });
            window.google.accounts.id.renderButton(
                wrapperRef.current,
                { type: 'standard', shape: 'pill', theme: "filled_black", size: "medium", text: 'continue_with', width: '200' }  // customization attributes
            );

            const buttonElement = wrapperRef.current.querySelector("div[role=button]");
            setGoogleButtonWrapper(buttonElement);
        }
    }, [])

    return {
        googleButtonWrapper
    }
}