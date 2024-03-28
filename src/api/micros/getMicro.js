import { ubuntuApi } from "../../utils/services/axiosConfig";
const getMicro = async (idRubro) => {

    console.log("elRubroooid", idRubro)
    const url = `microemprendimientos/findByRubro/${idRubro}`;
    try {
        const res = await ubuntuApi.get(url);
        return res.data;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
        return [];
    }
}
export default getMicro;