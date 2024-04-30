import { ubuntuApi } from "../../utils/services/axiosConfig";
const getPost = async () => {
    try {
        const res = await ubuntuApi.get('/publicaciones/permitidas');
        console.log('Publicaciones:', res.data);
        return res.data;
       
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
    }
}

const increaseViews = async (postId) => {
    try {
        await ubuntuApi.get(`/publicaciones/${postId}`);
    } catch (error) {
        console.error('Error al incrementar las vistas:', error);
    }
}

export { getPost, increaseViews };
