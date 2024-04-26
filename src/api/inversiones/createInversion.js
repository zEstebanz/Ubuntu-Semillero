// createInversion.js

import { ubuntuApi } from '../../utils/services/axiosConfig';
import { getAccessToken } from '../../utils/helpers/localStorage';

const createInversion = async (formData) => {
  try {
    const accessToken = getAccessToken(); 
    const response = await ubuntuApi.post('/gestionInversion/admin/create', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al crear la gestión de inversión: ${error.response.data.message}`);
  }
};

export default createInversion;
