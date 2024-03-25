import { ubuntuApi } from "../../utils/services/axiosConfig";

const getRubros = async () => {
    try {
        // const res = await ubuntuApi.get('/admin/estadisticasPorUsuario');
        const res = await ubuntuApi.get('/rubros/get-all');
        return res.data;
    } catch (error) {
        console.error('Error al obtener los rubros:', error);
        return [];
    }
};

export default getRubros;