import { getAccessToken } from "../../utils/helpers/localStorage";
import { ubuntuApi } from "../../utils/services/axiosConfig";

const getProvincias = async (paisId) => {
    try {
        const res = await ubuntuApi.get(`/provincias/${paisId}`, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
        return [];
    }
}

export default getProvincias;