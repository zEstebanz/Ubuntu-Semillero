import { ubuntuApi } from "../../utils/services/axiosConfig";
import { getAccessToken } from "../../utils/helpers/localStorage";
import { decodeUserData } from "../../utils/helpers/decodeJWT";

const getMicroDashView = async () => {
    try {
        
        const { headers } = await ubuntuApi.get('/auth/user/details', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        });

        const user = decodeUserData(headers.getAuthorization())

        const res = await ubuntuApi.post(`/microemprendimientos/admin/findById/${id}`,
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

export default getMicroDashView;