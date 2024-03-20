import * as jose from 'jose';

export const decodeUserData = (userDataToken) => {
    return jose.decodeJwt(userDataToken);
}