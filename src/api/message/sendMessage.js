import * as yup from "yup";
import { ubuntuApi } from "../../utils/services/axiosConfig";

export const validationSchema = yup.object({
    apellidoYNombre: yup.string().matches(/^[a-zA-Z\s,]+$/, 'El Apellido y Nombre solo puede contener letras, espacios y comas')
    .required("Debe ingresar su Apellido y Nombre"),
    email: yup.string().email("Debe ingresar un correo electrónico válido").required("Debe ingresar su correo electrónico"),
    telefono: yup.string()
        .matches(/^\+?[0-9]+$/, 'Teléfono inválido')
        .required('Debe escribir su telefono.'),
    texto: yup.string().required("Debe escribir su mensaje.").max(300, "El mensaje no puede exceder los 300 caracteres")
});

export const sendMessage = async (values, id) => {
    try {
        await ubuntuApi.post('/mensaje/create', {
            ...values,
            id_microemprendimiento: id
        });
        console.log('Formulario enviado correctamente:', values);
        return {
            title: 'Formulario enviado con éxito.',
            message: 'Gracias por contactarnos, nos comunicaremos en breve.',
            icon: 'check'
        };
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        return {
            title: 'Lo sentimos, el Formulario no pudo ser enviado.',
            message: 'Por favor, volvé a intentarlo.',
            icon: 'error'
        };
    }
};
