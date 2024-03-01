import { useRef } from "react";
import { useEffect } from "react";

import { ubuntuApi } from "../utils/services/axiosConfig";
import { Box } from "@mui/material";

export const Login = () => {

    const googleButton = useRef();

    const handleCredentialResponse = async (response) => {
        console.info('JWT GOOGLE: ', response.credential);
        const data = {
            token_id: response.credential
        }

        // const userResponse = await ubuntuApi.get(`/auth/google`, data);


        // console.log(userResponse)
    }

    useEffect(() => {
        if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                });
                window.google.accounts.id.renderButton(
                    googleButton.current,
                    { type: 'standard', shape: 'pill', theme: "filled_black", size: "medium", text: 'signin_with' }  // customization attributes
                );
        }

    }, [])

    return (
        <Box
            sx={{
                width: '200px'
            }}
        >
            <div ref={googleButton}></div>
        </Box>
    )
}