import { ubuntuApi } from '../../utils/services/axiosConfig';

const getRubros = async () => {
  try {
    const response = await ubuntuApi.get('/rubros/get-all');
    console.log(response)

    return response.data;
  } catch (error) {
    console.error('Error al obtener los rubros:', error);
    throw error;
  }
};

export default getRubros;