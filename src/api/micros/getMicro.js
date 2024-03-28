import { ubuntuApi } from "../../utils/services/axiosConfig";

const getMicro = async () => {
    try {
        const res = await ubuntuApi.get('microemprendimientos/findAll');
        return res.data;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
        return [];
    }
}

export default getMicro;