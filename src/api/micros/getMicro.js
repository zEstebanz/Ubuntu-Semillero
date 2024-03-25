import { ubuntuApi } from "../../utils/services/axiosConfig";
import { getAccessToken } from "../../utils/helpers/localStorage";
import { decodeUserData } from "../../utils/helpers/decodeJWT";

const getMicro = async () => {
    try {
        const { headers } = await ubuntuApi.get('/auth/user/details', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        });
        const user = decodeUserData(headers.getAuthorization())

        const res = await ubuntuApi.get('microemprendimientos/findByRubro/1',
            {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                }
            });
        return res.data;

    } catch (error) {
        console.error('Error al obtener los rubros:', error);
        return [];
    }
};

export default getMicro;
