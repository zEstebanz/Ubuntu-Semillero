import React, { useState, useEffect } from 'react';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { getAccessToken } from "../../utils/helpers/localStorage";

const InversionPorIdMicro = ({ idMicro }) => {
  const [inversion, setInversion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ubuntuApi.get(`/gestionInversion/admin/${idMicro}`, {
          headers: {
            Authorization: 'Bearer ' + getAccessToken(),
          },
        });

        setInversion(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [idMicro]);

  if (loading) {
    return <div>Cargando la inversión...</div>;
  }

  if (!inversion) {
    return <div>No se encontró la inversión para el ID de microemprendimiento proporcionado.</div>;
  }

  return (
    <div>
      <h1>Inversión ID: {inversion.id}</h1>
      <p>Costos de gestión: {inversion.costosGestion}</p>
      <p>Cuotas: {inversion.cuotas}</p>
      <p>Máximo: {inversion.max}</p>
      <p>Mínimo: {inversion.min}</p>
      <p>Tasa de retorno: {inversion.tasaRetorno}</p>
      <p>Nivel de riesgo: {inversion.nivelRiesgo}</p>
      <p>Notas adicionales: {inversion.notasAdicionales}</p>
      {/* Agrega más detalles si es necesario */}
    </div>
  );
};

export default InversionPorIdMicro;
