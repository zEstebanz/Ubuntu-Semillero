import { ubuntuApi } from "../../utils/services/axiosConfig";

const getProvincias = async (paisId) => {
    try {
        const res = await ubuntuApi.get(`/provincias/${paisId}`);
        return res.data;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
        return [];
    }
}

export default getProvincias;