import { ubuntuApi } from "../../utils/services/axiosConfig";
import { getAccessToken } from "../../utils/helpers/localStorage";
import { decodeUserData } from "../../utils/helpers/decodeJWT";

const getPostView = async () => {
    try {
        const { headers } = await ubuntuApi.get('/auth/user/details', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        });
        const user = decodeUserData(headers.getAuthorization())

        const res = await ubuntuApi.get('/publicaciones/admin/ultimasDiez',
            {
                email: user.sub
            },
            {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                }
            });

        return res.data;

    } catch (error) {
        console.error('Error al obtener las utlimas 10 publicaciones:', error);
        return [];
    }
};

export default getPostView;
