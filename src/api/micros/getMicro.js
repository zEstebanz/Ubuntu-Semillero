import { ubuntuApi } from "../../utils/services/axiosConfig";
const getMicro = async (idRubro) => {

    const url = `/microemprendimientos/findByRubro/${idRubro}`;
    try {
        const { data } = await ubuntuApi.get(url);
        return data.body;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
        return [];
    }
}
export default getMicro;