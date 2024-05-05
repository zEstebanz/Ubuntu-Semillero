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
        const res = await ubuntuApi.get(`/faq/answer/${id}`, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });
        //console.log("Preguntas secundarias", res.data);

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [respuesta, setRespuesta] = useState({}); // Estado para almacenar la respuesta
    const [hasChanged, setHasChanged] = useState(false);
    const [hasRespuestaChanged, setHasRespuestaChanged] = useState(false);
    const [hasChangedPregunta, setHasChangedPregunta] = useState(false);
    const [hasChangedRespuesta, setHasChangedRespuesta] = useState(false);
    const [preguntas, setPreguntas] = useState([]);
    const [preguntasSecundarias, setPreguntasSecundarias] = useState([]);
    const [expandedMenus, setExpandedMenus] = useState({});
    const anchorRefs = useRef({});
    const [expandedText, setExpandedText] = useState(false);
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);
    const [errorMessageOpen, setErrorMessageOpen] = useState(false);

    
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

    useEffect(() => {
        const fetchPreguntasInitial = async () => {
            try {
                const response = await getQuestionInitial();
                setPreguntas(response);
                setExpandedMenus(initialExpandedMenus(response)); 
            } catch (error) {
            }
        };
        fetchPreguntasInitial();
    }, []);

    useEffect(() => {
        const fetchPreguntasSecundarias = async () => {
            try {
                const secondaryQuestions = await Promise.all(preguntas.map(async pregunta => {
                    const secondary = await getQuestionSecondary(pregunta.id);
                    const secondaryWithResponse = await Promise.all(secondary.secondaryQuestions.map(async preguntaSecundaria => {
                        const respuesta = await getAnswerForQuestionId(preguntaSecundaria.id);
                        return { ...preguntaSecundaria, respuesta };
                    }));
                    return secondaryWithResponse;
                }));
                
                const allSecondaryQuestions = secondaryQuestions.reduce((acc, val) => acc.concat(val), []);
                setPreguntasSecundarias(allSecondaryQuestions);
                
            } catch (error) {
            }
        };
        fetchPreguntasSecundarias();
    }, [preguntas]);


    /////


    const getAnswerForQuestionId = async (id) => {
        try {
            const response = await ubuntuApi.get(`/answer/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + getAccessToken(),
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            return data;
        } catch (error) {
            return null; 
        }
    };

    
    
    
    
    useEffect(() => {
        const fetchPreguntasInitial = async () => {
            try {
                const response = await getQuestionInitial();
                const preguntasConRespuestas = await Promise.all(response.map(async pregunta => {
                    const respuesta = await getAnswerForQuestionId(pregunta.id);
                    return { ...pregunta, respuesta };
                }));
                setPreguntas(preguntasConRespuestas);
                setExpandedMenus(initialExpandedMenus(response)); 
            } catch (error) {
            }
        };
        fetchPreguntasInitial();
    }, []);






    /////




    useEffect(() => {
        const fetchPreguntasSecundarias = async () => {
            try {
                const secondaryQuestions = await Promise.all(preguntas.map(async pregunta => {
                    const secondary = await getQuestionSecondary(pregunta.id);
                    return secondary.secondaryQuestions;
                }));
                const allSecondaryQuestions = secondaryQuestions.reduce((acc, val) => acc.concat(val), []);
                setPreguntasSecundarias(allSecondaryQuestions);
                console.log("Todas las preguntas secundarias:", allSecondaryQuestions);
                
            } catch (error) {
                console.error('Error al traer las preguntas secundarias:', error);
            }
        };
        fetchPreguntasSecundarias();
    }, [preguntas]);
    


    const initialExpandedMenus = (preguntas) => {
        const initialMenus = {};
        preguntas.forEach(pregunta => {
            initialMenus[pregunta.id] = false;
        });
        return initialMenus;
    };

    const handleClick = (id) => {
        setExpandedMenus((prevMenus) => ({
            ...prevMenus,
            [id]: !prevMenus[id], 
        }));
    };

    const handleClose = (id) => {
        setExpandedMenus((prevMenus) => ({
            ...prevMenus,
            [id]: false, 
        }));
    };

    const handleHideClick = async (id) => {
        try {
            await hideQuestion(id);
            setSuccessMessageOpen(true);
            console.log("La pregunta se ha ocultado correctamente.");
        } catch (error) {
            console.error("Error al ocultar la pregunta:", error);
            setErrorMessageOpen(true);
        }
    };

    const handleShowClick = async (id) => {
        try {
            await showQuestion(id);
            const updatedPreguntas = preguntas.map(pregunta => {
                if (pregunta.id === id) {
                    return {
                        ...pregunta,
                        hidden: false 
                    };
                }
                return pregunta;
            });
            setPreguntas(updatedPreguntas);
            console.log("La pregunta se ha mostrado correctamente.");
        } catch (error) {
            console.error("Error al mostrar la pregunta:", error);
        }
    };



    const handleChangePregunta = (e, preguntaId) => {
        const newValue = e.target.value;
        setPreguntasSecundarias(prevState => {
            return prevState.map(pregunta => {
                if (pregunta.id === preguntaId) {
                    return {
                        ...pregunta,
                        text: newValue
                    };
                }
                return pregunta;
            });
        });
    };

    const handleChangeRespuesta = (e, preguntaId) => {
        const newValue = e.target.value;
        setPreguntasSecundarias(prevState => {
            return prevState.map(pregunta => {
                if (pregunta.id === preguntaId && pregunta.respuesta) {
                    return {
                        ...pregunta,
                        respuesta: {
                            ...pregunta.respuesta,
                            text: newValue
                        }
                    };
                }
                return pregunta;
            });
        });
    };


    return (
        <div>




<div>
            {preguntasSecundarias
                .filter(pregunta => pregunta.id == idActual)
                .map(pregunta => (
                    <div key={pregunta.id}>
                        <form>
                            <label>
                                Pregunta:
                                <input
                                    type="text"
                                    value={pregunta.text}
                                    onChange={e => handleChangePregunta(e, pregunta.id)}
                                />
                            </label>

                      



                            <br />
                            <label>
                                Respuesta:
                                <input
                                    type="text"
                                    value={pregunta.respuesta ? pregunta.respuesta.text : ''}
                                    onChange={e => handleChangeRespuesta(e, pregunta.id)}
                                />
                            </label>
                            <br />
                            <input type="submit" value="Guardar cambios" />
                        </form>






                        
                    </div>
                ))}
        </div>








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

                    {console.log("Todas las preguntas:", (preguntasSecundarias))}

{console.log("Todas las respuestas:", (preguntasSecundarias.map(pregunta => pregunta.respuesta)))}
                </Box>
            </div>
        </div>
    );
};
