import React, { useState , useEffect} from 'react';
import { Box, Typography, styled, TextField, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import createInversion from '../../api/inversiones/createInversion';
import InputAdornment from '@mui/material/InputAdornment';
import CustomButton from '../buttonCustom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../modalCustom';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { getAccessToken } from '../../utils/helpers/localStorage';

const validationSchema = Yup.object().shape({
  min: Yup.number().typeError('Ingrese un monto válido').required('El mínimo es requerido'),
  max: Yup.number().typeError('Ingrese un monto válido').required('El máximo es requerido'),
  costosGestion: Yup.number().typeError('Ingrese un monto válido').required('El costo de gestión es requerido'),
  cuotas: Yup.string().required('Seleccione el número de cuotas'),
  nivelRiesgo: Yup.string().required('Seleccione el nivel de riesgo'),
  tasaRetorno: Yup.number().typeError('Ingrese un monto válido').required('La tasa de retorno es requerida'),
  notasAdicionales: Yup.string().typeError('Ingrese un texto válido').required('Las notas adicionales son requeridas'),
});

const Subtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitles,
}));

const InversionesFormEdit = () => {
  const { nombre, id} = useParams();
  const user = useSession();
  const [inversion, setInversion] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ubuntuApi.get(`/gestionInversion/admin/${id}`, {
          headers: {
            Authorization: 'Bearer ' + getAccessToken(),
          },
        });

        console.log('Data received:', res.data);
        setInversion(res.data); // Actualiza el estado de inversion con los datos recibidos
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      min: '',
      max: '',
      costosGestion: '',
      cuotas: '3',
      nivelRiesgo: 'BAJO',
      tasaRetorno: '',
      notasAdicionales: '',
      inactivo: true,
      id: id,
      idMicro: id,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      try {
        const response = await createInversion(values);
        setModalType('success');
        setModalOpen(true);
        console.log('Respuesta:', response);
      } catch (error) {
        setModalType('error');
        setModalOpen(true);
        console.error('Error al crear la gestión de inversión:', error);
      }
    },
  });

  const handleEditClick = async (newData) => {
    try {
      const res = await ubuntuApi.put(`/gestionInversion/admin/edit`, newData, {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      });
      console.log('Response from Backend:', res.data);
  
      setModalType('success'); // Configura el tipo de modal
      setModalOpen(true); // Abre el modal
  
      setInversion(newData); // Actualiza el estado de inversion con los nuevos datos
    } catch (error) {
      console.error('Error saving changes to the database:', error);
      setModalType('error'); // Configura el tipo de modal
      setModalOpen(true); // Abre el modal
    }
  };

  useEffect(() => {
    if (inversion) {
      formik.setValues({
        ...formik.values,
        min: inversion.min,
        max: inversion.max,
        costosGestion: inversion.costosGestion,
        cuotas: inversion.cuotas,
        nivelRiesgo: inversion.nivelRiesgo,
        tasaRetorno: inversion.tasaRetorno,
        notasAdicionales: inversion.notasAdicionales,
      });
    }
  }, [inversion]);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }



  const countCharacters = (text) => {
    const maxLength = 300;
    if (text.length > maxLength) {
      formik.setFieldValue('notasAdicionales', text.substring(0, maxLength));
      return maxLength;
    }
    return text.length;
  };

  const currencies = [
    { value: '3', label: '3 Cuotas' },
    { value: '6', label: '6 Cuotas' },
    { value: '9', label: '9 Cuotas' },
    { value: '12', label: '12 Cuotas' },
  ];

  const riesgo = [
    { value: 'BAJO', label: 'BAJO' },
    { value: 'MEDIO', label: 'MEDIO' },
    { value: 'ALTO', label: 'ALTO' },
  ];

  return (
    <>





      <Box m={2}>
        <Typography
          variant="h3"
          sx={{
            fontSize: '1.375rem',
            textAlign: 'center',
            fontWeight: 500
          }}
        >
          Edición de Gestionador de Inversiones 
        </Typography>

        <Typography
          variant="h3"
          sx={{
            mt: 2,
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: 500
          }}
        >
          Editá el gestionador para el Microemprendimiento: 
        </Typography>

        <Subtitle
          variant="h4"
          color='primary.main'
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            mt: 2,
          }}
        >
          {nombre} 
        </Subtitle>
      </Box>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Box m={3}>
          <TextField
            id="min"
            name="min"
            label="Minimo"
            placeholder='Ingrese el valor en pesos' 
            fullWidth
            value={formik.values.min}
            onChange={formik.handleChange}
            {...formik.getFieldProps('min')}
            error={formik.touched.min && Boolean(formik.errors.min)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mt: 1 }}
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            FormHelperTextProps={{
              sx: { whiteSpace: 'pre-line' },
            }}
            helperText={(
              <Typography variant="1" sx={{ whiteSpace: 'pre-line' }}>
                {formik.touched.min && formik.errors.min ? formik.errors.min : 'Ingresá el mínimo permitido para una Inversión \nDivisa: Peso Argentino (ARS)'}
              </Typography>
            )}
          />

          <TextField
            id="max"
            name="max"
            label="Máximo"
            placeholder='Ingrese el valor en pesos' 
            fullWidth
            value={formik.values.max}
            onChange={formik.handleChange}
            {...formik.getFieldProps('max')}
            error={formik.touched.max && Boolean(formik.errors.max)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mt: 3 }}
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            FormHelperTextProps={{
              sx: { whiteSpace: 'pre-line' },
            }}
            helperText={(
              <Typography variant="1" sx={{ whiteSpace: 'pre-line' }}>
                {formik.touched.max && formik.errors.max ? formik.errors.max : 'Ingresá el máximo permitido para una Inversión \nDivisa: Peso Argentino (ARS)'}
              </Typography>
            )}
          />

          <TextField
            id="costosGestion"
            name="costosGestion"
            label="Costo de Gestión"
            placeholder='Ingrese el valor en pesos' 
            fullWidth
            value={formik.values.costosGestion}
            onChange={formik.handleChange}
            {...formik.getFieldProps('costosGestion')}
            error={formik.touched.costosGestion && Boolean(formik.errors.costosGestion)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mt: 3 }}
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            FormHelperTextProps={{
              sx: { whiteSpace: 'pre-line' },
            }}
            helperText={(
              <Typography variant="1" sx={{ whiteSpace: 'pre-line' }}>
                {formik.touched.costosGestion && formik.errors.costosGestion ? formik.errors.costosGestion : 'Ingresá el costo de gestion del proceso de la inversion \nDivisa: Peso Argentino (ARS)'}
              </Typography>
            )}
          />

          <TextField
            id="cuotas"
            name="cuotas"
            select
            label="Cuotas"
            fullWidth
            value={formik.values.cuotas}
            onChange={formik.handleChange}
            error={formik.touched.cuotas && Boolean(formik.errors.cuotas)}
            sx={{ mt: 3 }}
            FormHelperTextProps={{
              sx: { whiteSpace: 'pre-line' },
            }}
            helperText={(
              <Typography variant="1" sx={{ whiteSpace: 'pre-line' }}>
                {formik.touched.cuotas && formik.errors.cuotas ? formik.errors.cuotas : 'Máximas cuotas permitidas por la inversion.'}
              </Typography>
            )}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="nivelRiesgo"
            name="nivelRiesgo"
            select
            label="Nivel de Riesgo"
            fullWidth
            value={formik.values.nivelRiesgo}
            onChange={formik.handleChange}
            error={formik.touched.nivelRiesgo && Boolean(formik.errors.nivelRiesgo)}
            sx={{ mt: 3 }}
            FormHelperTextProps={{
              sx: { whiteSpace: 'pre-line' },
            }}
            helperText={(
              <Typography variant="1" sx={{ whiteSpace: 'pre-line' }}>
                {formik.touched.nivelRiesgo && formik.errors.nivelRiesgo ? formik.errors.nivelRiesgo : 'Seleccioná un nivel de riesgo al invertir en el microemprendimiento.'}
              </Typography>
            )}
            SelectProps={{
              style: {
                color:
                  formik.values.nivelRiesgo === 'BAJO'
                    ? 'green'
                    : formik.values.nivelRiesgo === 'MEDIO'
                      ? 'orange'
                      : 'red',
              },
            }}
          >
            {riesgo.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={{
                  color:
                    option.value === 'BAJO'
                      ? 'green'
                      : option.value === 'MEDIO'
                        ? 'orange'
                        : 'red',
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="tasaRetorno"
            name="tasaRetorno"
            label="Tasa de Retorno"
            placeholder='Tasa de Retorno'
            fullWidth
            value={formik.values.tasaRetorno}
            onChange={formik.handleChange}
            {...formik.getFieldProps('tasaRetorno')}
            error={formik.touched.tasaRetorno && Boolean(formik.errors.tasaRetorno)}

            sx={{ mt: 3 }}
            helperText={(
              <Typography variant="1" sx={{ whiteSpace: 'pre-line' }}>
                {formik.touched.tasaRetorno && formik.errors.tasaRetorno ? formik.errors.tasaRetorno : 'Ingrese la tasa de retorno.'}
              </Typography>
            )}
          />

          <TextField
            id="notasAdicionales"
            name="notasAdicionales"
            label="Notas adicionales"
            fullWidth
            multiline
            rows={7}
            sx={{ mt: 3 }}
            value={formik.values.notasAdicionales}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            error={formik.touched.notasAdicionales && Boolean(formik.errors.notasAdicionales)}
            helperText={
              <Box display="flex" justifyContent="space-between">
                <Typography variant="1">
                  Máximo 300 caracteres
                  <br />
                  {formik.touched.notasAdicionales && formik.errors.notasAdicionales ? formik.errors.notasAdicionales : ''}
                </Typography>
                <Typography variant="1">
                  {countCharacters(formik.values.notasAdicionales)}/300
                </Typography>
              </Box>
            }
          />

<CustomButton fullWidth onClick={() => handleEditClick(formik.values)} variant="contained" color="primary" sx={{ mt: 2 }}>
          Guardar Cambios
        </CustomButton>
        </Box>
      </form>

      {/* {inversion && (
    <Box m={3}>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>Datos de la inversión:</Typography>
      <Typography variant="body1">Costos de Gestión: ${inversion.costosGestion}</Typography>
      <Typography variant="body1">Mínimo: ${inversion.min}</Typography>
      <Typography variant="body1">Máximo: ${inversion.max}</Typography>
      <Typography variant="body1">Tasa de Retorno: {inversion.tasaRetorno}%</Typography>
      <Typography variant="body1">Cuotas: {inversion.cuotas}</Typography>
      <Typography variant="body1">Nivel de Riesgo: {inversion.nivelRiesgo}</Typography>
      <Typography variant="body1">Notas Adicionales: {inversion.notasAdicionales}</Typography>
    </Box>
  )} */}

<CustomModal
  open={modalOpen && modalType === 'success'}
  onClose={() => setModalOpen(false)}
  title="Cambios guardados con éxito."
  buttons={[{ text: 'Aceptar', onClick: () => setModalOpen(false) }]}
  icon="check"
/>

<CustomModal
  open={modalOpen && modalType === 'error'}
  onClose={() => setModalOpen(false)}
  title="Lo sentimos, los cambios no pudieron ser guardados."
  message="Por favor, volvé a intentarlo."
  buttons={[
    { text: 'Cerrar', onClick: () => setModalOpen(false) },
    {
      text: 'Intentar nuevamente',
      onClick: () => {
        setModalOpen(false);
        formik.handleSubmit();
      }
    }
  ]}
  icon="error"
/>
    </>
  );
}

export default InversionesFormEdit;
