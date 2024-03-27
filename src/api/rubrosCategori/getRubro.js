import { ubuntuApi } from "../../utils/services/axiosConfig";

// Función para obtener los micros desde el backend
const getRubros = async () => {
    try {
        const res = await ubuntuApi.get('/rubros/get-all'); // Reemplaza '/ruta-del-endpoint' con la ruta correcta de tu backend
        return res.data;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
        return []; // Devuelve una lista vacía en caso de error
    }
}

export default getRubros;