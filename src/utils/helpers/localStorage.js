
export const saveAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

export const deleteAccessToken = () => {
    localStorage.removeItem('accessToken');
}