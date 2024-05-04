import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import CustomButton from '../../components/buttonCustom';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { getAccessToken } from '../../utils/helpers/localStorage';
import { getQuestionInitial } from '../../api/chatbot/getQuestionInitial';
import { getAnswer } from '../../api/chatbot/getAnswer';

const validationSchema = Yup.object().shape({
    pregunta: Yup.string().required('Debe escribir una pregunta.').min(6, 'La pregunta debe tener al menos 6 caracteres.').max(150, 'La pregunta no puede tener más de 150 caracteres.'),
});

const validationSchemaRespuesta = Yup.object().shape({
    respuesta: Yup.string().required('Debe escribir una respuesta.').min(6, 'La respuesta debe tener al menos 6 caracteres.').max(400, 'La pregunta no puede tener más de 400 caracteres.'),
});

export const ChatBotEdit = () => {
    const { id } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preguntas, setPreguntas] = useState(null);
    const [expandedMenus, setExpandedMenus] = useState({});
    const [expandedText, setExpandedText] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [hasRespuestaChanged, setHasRespuestaChanged] = useState(false);
    const [respuesta, setRespuesta] = useState('');
    const [hasChangedPregunta, setHasChangedPregunta] = useState(false);
    const [hasChangedRespuesta, setHasChangedRespuesta] = useState(false);
    const formik = useFormik({
        initialValues: {
            pregunta: '',
            id: id,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const accessToken = getAccessToken();
                const response = await ubuntuApi.put(`/question/text/${id}?text=${encodeURIComponent(values.pregunta)}`, null, { headers: { Authorization: `Bearer ${accessToken}` } });
                console.log('Pregunta actualizada:', response.data);
            } catch (error) {
                console.error('Error al actualizar la pregunta:', error);
            }
        },
    });



    useEffect(() => {
        const fetchPreguntaById = async (id) => {
            try {
                if (!id) {
                    console.error('ID no válido:', id);
                    return;
                }
                const response = await getQuestionInitial();
                const pregunta = response.find((pregunta) => pregunta.id.toString() === id.toString());
                if (pregunta) {
                    setPreguntas(pregunta);
                    console.log('pregunta x id:', pregunta);

                    const answer = await getAnswer(pregunta.id);
                    console.log('Respuesta:', answer);
                    setRespuesta(answer); 
                } else {
                    console.error('Pregunta no encontrada para el ID:', id);
                }
            } catch (error) {
                console.error('Error al traer la pregunta:', error);
            }
        };

        fetchPreguntaById(id);
    }, [id]);


    const formikRespuesta = useFormik({
        initialValues: {
            respuesta: '',
            id: id,
        },
        validationSchema: validationSchemaRespuesta,
        onSubmit: async (values) => {
            try {
                const accessToken = getAccessToken();
                const response = await ubuntuApi.put(`/answer/${id}?text=${encodeURIComponent(values.respuesta)}`, null, { headers: { Authorization: `Bearer ${accessToken}` } });
                console.log('respuesta actualizada:', response.data);
            } catch (error) {
                console.error('Error al actualizar la respuesta:', error);
            }
        },
    });


    const handleInputChange = (e) => {
        formik.handleChange(e);
        setHasChanged(true); 
    };

    const handleRespuestaChange = (e) => {
        formikRespuesta.handleChange(e);
        setHasRespuestaChanged(true); 
    };


    return (
        <div>
            <div className="contact-section">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: 5,
                        px: 3,
                        mx: 'auto',
                    }}
                    maxWidth="sm"
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: '1.375rem',
                            textAlign: 'center',
                            fontWeight: 700,
                        }}
                    >
                        Edición de Pregunta
                    </Typography>


                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            width: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            id="pregunta"
                            label="Texto de la Pregunta"
                            fullWidth
                            multiline
                            rows={7}

                            sx={{
                                mt: 2,
                            }}
                            {...formik.getFieldProps('pregunta')}

                            value={preguntas ? preguntas.text : ''}
                            onChange={(e) => {
                                handleInputChange(e);
                                setPreguntas({ ...preguntas, text: e.target.value });
                            }}


                            
                            error={formik.touched.pregunta && Boolean(formik.errors.pregunta)}
                            helperText={formik.touched.pregunta && formik.errors.pregunta}

                        />
                        <CustomButton
                            type="submit"
                            fullWidth
                            sx={{
                                my: 5,
                            }}
                            disabled={!formik.isValid || !hasChanged}
                        >
                            Editar Pregunta
                        </CustomButton>
                    </Box>

                    <Box sx={{
                        width: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: '1.375rem',
                                textAlign: 'center',
                                fontWeight: 700,
                            }}
                        >
                            Edición de Respuesta
                        </Typography>



                        <Box
                            component="form"
                            onSubmit={formikRespuesta.handleSubmit}
                            sx={{
                                width: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                id="respuesta"
                                label="Texto de la Respuesta"
                                fullWidth
                                multiline
                                rows={7}
                                sx={{
                                    mt: 2,
                                }}
                                {...formikRespuesta.getFieldProps('respuesta')}
                                value={respuesta ? respuesta.text : ''}
                                onChange={(e) => {
                                    handleRespuestaChange(e); 
                                    setRespuesta({ ...respuesta, text: e.target.value });
                                }}
                                error={formikRespuesta.touched.respuesta && Boolean(formikRespuesta.errors.respuesta)}
                                helperText={formikRespuesta.touched.respuesta && formikRespuesta.errors.respuesta}

                            />
                            <CustomButton
                                type="submit"
                                fullWidth
                                sx={{
                                    my: 5,
                                }}
                                disabled={!formikRespuesta.isValid || !hasRespuestaChanged} 
                            >
                                Editar Pregunta
                            </CustomButton>
                        </Box>



                    </Box>


                </Box>
            </div>
        </div>
    );
};
