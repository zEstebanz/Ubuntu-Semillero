import { ubuntuApi } from "../../utils/services/axiosConfig";
import { getAccessToken } from "../../utils/helpers/localStorage";
import { decodeUserData } from "../../utils/helpers/decodeJWT";

const getPostAdmin = async () => {
    try {
        const { headers } = await ubuntuApi.get('/auth/user/details', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        });
        const user = decodeUserData(headers.getAuthorization())

        //cambiar endpoint

        const res = await ubuntuApi.get('/publicaciones/ultimasTres',
            {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                data: {
                    email: "ubuntusemillero@gmail.com"
                }
            });
        console.log(res)

        return res.data;

    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        return [];
    }
};

export default getPostAdmin;