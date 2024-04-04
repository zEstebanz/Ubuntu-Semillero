import { getAccessToken } from "../../utils/helpers/localStorage";
import { ubuntuApi } from "../../utils/services/axiosConfig";

// Función para obtener los micros desde el backend
const getMensaje = async () => {
    try {
        const res = await ubuntuApi.get('/mensaje/estadistica', {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        }); // Reemplaza '/ruta-del-endpoint' con la ruta correcta de tu backend

        console.log('Estadisticas:', res)
        return res.data;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
        return []; // Devuelve una lista vacía en caso de error
    }
}

export default getMensaje;