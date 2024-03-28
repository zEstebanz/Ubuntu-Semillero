import { ubuntuApi } from "../../utils/services/axiosConfig";
const getRubro = async () => {
    try {
        const res = await ubuntuApi.get('/rubros/get-all');
        return res.data;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
    }
}
export default getRubro;