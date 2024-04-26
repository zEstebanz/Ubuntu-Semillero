import { getAccessToken } from "../../utils/helpers/localStorage";
import { ubuntuApi } from "../../utils/services/axiosConfig";

const getInversion = async () => {
    try {
        const res = await ubuntuApi.get('/gestionInversion/admin/getAll', {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });

        console.log('Mensajes:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        return [];
    }
}

export default getInversion;