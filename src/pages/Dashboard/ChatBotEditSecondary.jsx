import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import CustomButton from '../../components/buttonCustom';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { getAccessToken } from '../../utils/helpers/localStorage';

export const getQuestionById = async (id) => {
    try {
        const res = await ubuntuApi.get(`/question/${id}`, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });
        console.log("Pregunta por ID:", res.data);

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAnswerById = async (id) => {
    try {
        const res = await ubuntuApi.get(`/answer/${id}`, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });
        console.log("Respuesta por ID:", res.data);

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const validationSchema = Yup.object().shape({
    pregunta: Yup.string().required('Debe escribir una pregunta.').min(6, 'La pregunta debe tener al menos 6 caracteres.').max(150, 'La pregunta no puede tener más de 150 caracteres.'),
});

const validationSchemaRespuesta = Yup.object().shape({
    respuesta: Yup.string().required('Debe escribir una respuesta.').min(6, 'La respuesta debe tener al menos 6 caracteres.').max(400, 'La pregunta no puede tener más de 400 caracteres.'),
});

export const ChatBotEditSecondary = () => {
    const { id } = useParams();
    const idActual = id;

    console.log(`El ID actual es: ${idActual}`);
    const [preguntas, setPregunta] = useState({});
    const [respuesta, setRespuesta] = useState({});
    const [hasChanged, setHasChanged] = useState(false);
    const [hasRespuestaChanged, setHasRespuestaChanged] = useState(false);

    //Editar 
    const [preguntaText, setPreguntaText] = useState('');


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
                console.log('Respuesta actualizada:', response.data);
            } catch (error) {
                console.error('Error al actualizar la respuesta:', error);
            }
        },
    });

    useEffect(() => {
        const fetchQuestionAndAnswer = async () => {
            try {
                const fetchedPregunta = await getQuestionById(idActual);
                setPregunta(fetchedPregunta);

                if (fetchedPregunta.id_answer) {
                    const fetchedRespuesta = await getAnswerById(fetchedPregunta.id_answer);
                    setRespuesta(fetchedRespuesta);
                }
            } catch (error) {
                console.error('Error al obtener la pregunta y la respuesta:', error);
            }
        };
        fetchQuestionAndAnswer();
    }, [idActual]);

    useEffect(() => {
        const fetchQuestionAndAnswer = async () => {
            try {
                const fetchedPregunta = await getQuestionById(idActual);
                setPregunta(fetchedPregunta);
                setPreguntaText(fetchedPregunta.text || '');
            } catch (error) {
                console.error('Error al obtener la pregunta y la respuesta:', error);
            }
        };
        fetchQuestionAndAnswer();
    }, [idActual]);

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
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: '1rem',
                            marginTop: '8px',
                            textAlign: 'center',
                            fontWeight: 700,
                            color: '#093C59'
                        }}
                    >
                        {preguntas.text || ''}

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
                                setPregunta({ ...preguntas, text: e.target.value });
                            }}



                            error={formik.touched.pregunta && Boolean(formik.errors.pregunta)}
                            helperText={formik.touched.pregunta && formik.errors.pregunta}

                        />

                        <CustomButton
                            type="button"
                            fullWidth
                            sx={{
                                my: 5,
                            }}
                            disabled={!formik.isValid || !hasChanged}
                            onClick={formik.handleSubmit}
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
                                Editar Respuesta
                            </CustomButton>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
    );
};
