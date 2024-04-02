import { ubuntuApi } from "../../utils/services/axiosConfig";
const getPostPublic = async () => {
    try {
        const res = await ubuntuApi.get('/publicaciones/ultimasTres');
        return res.data;
    } catch (error) {
        console.error('Error al obtener los micros:', error);
    }
}
export default getPostPublic;