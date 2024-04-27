import { ubuntuApi } from "../../utils/services/axiosConfig";

export const calcInversion = async (values, id) => {
  try {
    const response = await ubuntuApi.post('/gestionInversion/calcularInversion', {
      ...values,
      id_microemprendimiento: id
    });
    const inversionData = response.data; 
    console.log('Datos de inversión calculados:', inversionData);
    return inversionData;
  } catch (error) {
    console.error('Error al calcular la inversión:', error);
    return null;
  }
};
