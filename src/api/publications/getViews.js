import { getAccessToken } from "../../utils/helpers/localStorage";
import { ubuntuApi } from "../../utils/services/axiosConfig";

// Función para obtener los micros desde el backend
const getMensaje = async () => {
    try {
        const res = await ubuntuApi.get('/mensaje/estadistica', {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });

        console.log('Estadisticas:', res)
        return res.data;
    } catch (error) {
        console.error('Error al obtener estadisticas de visitas:', error);
        return [];
    }
}

export default getMensaje;