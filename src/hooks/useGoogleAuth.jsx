import { useEffect, useState } from "react";

export const useGoogleAuth = (wrapperRef) => {

    const [googleButtonWrapper, setGoogleButtonWrapper] = useState();

    const handleCredentialResponse = async (response) => {
        console.info('JWT GOOGLE: ', response.credential);
        // const data = {
        //     token_id: response.credential
        // }

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