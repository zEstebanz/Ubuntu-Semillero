import React, { useState, useEffect, useRef } from 'react';
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
//import { getQuestionSecondary } from '../../api/chatbot/getQuestionSecondary';

export const getQuestionSecondary = async (id) => {
    try {
        const res = await ubuntuApi.get(`/faq/answer/2`, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });
        console.log("Preguntas secundarias", res.data);
        // Imprimir id_secondary
        console.log("id_secondary:", res.data);
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



export const ChatBotEdit = () => {
    const { id } = useParams();
    const idActual = id;

  console.log(`El ID actual es: ${idActual}`);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preguntas, setPreguntas] = useState({}); // Estado para almacenar la pregunta
    const [respuesta, setRespuesta] = useState({}); // Estado para almacenar la respuesta
    const [expandedMenus, setExpandedMenus] = useState({});
    const [expandedText, setExpandedText] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [hasRespuestaChanged, setHasRespuestaChanged] = useState(false);
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


    const hideQuestion = async (id) => {
        try {
            const res = await ubuntuApi.put(`/question/hide/${id}`, null, {
                headers: {
                    Authorization: 'Bearer ' + getAccessToken(),
                    'Content-Type': 'application/json' // Asegúrate de establecer el tipo de contenido correctamente si estás enviando datos en el cuerpo
                },
                // Puedes enviar datos en el cuerpo de la solicitud PUT si es necesario
                // body: JSON.stringify({ key: value }),
            });
    
            // Aquí puedes manejar la respuesta si es necesario
            console.log('Publicación ocultada correctamente:', res);
        } catch (error) {
            console.error('Error al ocultar la publicación:', error);
            // Aquí puedes manejar cualquier error que ocurra durante la solicitud
        }
    };
    
    const showQuestion = async (id) => {
        try {
            const res = await ubuntuApi.put(`/question/show/${id}`, null, {
                headers: {
                    Authorization: 'Bearer ' + getAccessToken(),
                    'Content-Type': 'application/json'
                },
            });
            console.log('Publicación mostrada correctamente:', res);
        } catch (error) {
            console.error('Error al mostrar la publicación:', error);
        }
    };

     const getQuestionSecondary = async (id) => {
        try {
            const res = await ubuntuApi.get(`/faq/answer/2`, {
                headers: {
                    Authorization: 'Bearer ' + getAccessToken(),
                }
            });
            console.log("Preguntas secundarias", res.data);
    
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
    const getAllQuestionsWithAnswer = async () => {
        try {
            const initialQuestionsResponse = await ubuntuApi.get('/faq/initials');
            const initialQuestions = initialQuestionsResponse.data;
    
            for (const initialQuestion of initialQuestions) {
                const answerResponse = await ubuntuApi.get(`/faq/answer/${initialQuestion.id}`);
                console.log('Pregunta inicial:', initialQuestion);
                console.log('Respuesta:', answerResponse.data);
            }
    
            const secondaryQuestionsResponse = await ubuntuApi.get('/faq/secondaries');
            const secondaryQuestions = secondaryQuestionsResponse.data;
    
            for (const secondaryQuestion of secondaryQuestions) {
                const answerResponse = await ubuntuApi.get(`/faq/answer/${secondaryQuestion.id}`);
                console.log('Pregunta secundaria:', secondaryQuestion);
                console.log('Respuesta:', answerResponse.data);
            }
        } catch (error) {
            console.error('Error al obtener preguntas con respuestas:', error);
        }
    };


  useEffect(() => {
    const fetchPreguntaById = async (id) => {
        try {
            if (!id) {
                console.error('ID no válido:', id);
                return;
            }

            

            const initialQuestionResponse = await getQuestionInitial();
            const initialQuestion = initialQuestionResponse.find((pregunta) => pregunta.id.toString() === id.toString());

            const secondaryQuestionResponse = await getQuestionSecondary(id);
            const secondaryQuestion = secondaryQuestionResponse.secondaryQuestions.find((pregunta) => pregunta.id.toString() === id.toString());

            if (initialQuestion) {
                setPreguntas(initialQuestion);
                console.log('Pregunta inicial x id:', initialQuestion);

                const initialAnswer = await getAnswer(initialQuestion.id);
                console.log('Respuesta inicial:', initialAnswer);
                setRespuesta(initialAnswer); 
            } else if (secondaryQuestion) {
                setPreguntas(secondaryQuestion);
                console.log('Pregunta secundaria x id:', secondaryQuestion);

                const secondaryAnswer = await getAnswer(secondaryQuestion.id);
                console.log('Respuesta secundaria:', secondaryAnswer);
                setRespuesta(secondaryAnswer); 
            } else {
                console.error('Pregunta no encontrada para el ID:', id);
            }
        } catch (error) {
            console.error('Error al traer la pregunta:', error);
        }
    };

    fetchPreguntaById(id);
}, [id]);



useEffect(() => {
    getAllQuestionsWithAnswer();
}, []);



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
