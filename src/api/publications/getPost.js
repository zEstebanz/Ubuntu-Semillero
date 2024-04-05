import { ubuntuApi } from "../../utils/services/axiosConfig";
const getPost = async () => {
    try {
        const res = await ubuntuApi.get('/publicaciones/permitidas');
        return res.data;
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
    }
}
export default getPost;