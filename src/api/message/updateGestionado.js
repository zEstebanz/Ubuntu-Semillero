import { getAccessToken } from "../../utils/helpers/localStorage";
import { ubuntuApi } from "../../utils/services/axiosConfig";

const updateGestionado = async (id, gestionado) => {
    try {
        await ubuntuApi.put(`/mensaje/${id}?gestionado=${gestionado}`, null, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });
        console.log('Estado de Gestionado actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el estado de Gestionado:', error);
    }
}

export default updateGestionado;
