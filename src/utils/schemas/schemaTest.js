import * as yup from 'yup';

const schemaTest = yup.object().shape({
  textInput: yup.string()
    .min(5, 'El texto debe tener al menos 5 caracteres')
    .max(25, 'El texto no debe exceder los 25 caracteres')
    .required('Este campo es obligatorio'),
  numberInput: yup.number()
    .min(100, 'El valor mínimo es 100')
    .max(1000, 'El valor máximo es 1000')
    .required('Este campo es obligatorio'),
  email: yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('Este campo es obligatorio'),
  categoria: yup.string().required('Debes seleccionar una categoría'),
});

export default schemaTest;