import React, { useState } from 'react';
import { Box, Typography, styled, TextField, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import createInversion from '../../api/inversiones/createInversion';
import InputAdornment from '@mui/material/InputAdornment';
import CustomButton from '../buttonCustom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../modalCustom';

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

const InversionesForm = () => {
  const { nombre, id } = useParams();
  const user = useSession();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

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
          Crea un gestor para el microemprendimiento:
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
          {nombre} {id}
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

          <CustomButton fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}
            disabled={!formik.dirty || !formik.isValid}>
            Crear Gestión de Inversión
          </CustomButton>
        </Box>
      </form>

      <CustomModal
        open={modalOpen && modalType === 'success'}
        onClose={() => setModalOpen(false)}
        title="Gestionador de Inversiones creado con éxito."
        buttons={[{ text: 'Aceptar', onClick: () => setModalOpen(false) }]}
        icon="check"
      />

      <CustomModal
        open={modalOpen && modalType === 'error'}
        onClose={() => setModalOpen(false)}
        title="Lo sentimos, no se pudo crear el Gestionador de Inversiones."
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

export default InversionesForm;
