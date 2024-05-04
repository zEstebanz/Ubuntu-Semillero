import React, { useEffect, useState, useRef } from 'react';
import { getQuestionInitial } from '../../api/chatbot/getQuestionInitial';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/buttonCustom';
import { Box, Grid, Card, CardContent, Typography, Menu, MenuItem, Divider } from '@mui/material';
import { getAccessToken } from "../../utils/helpers/localStorage";
import { ubuntuApi } from '../../utils/services/axiosConfig';


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

function ChatBot() {
    const [preguntas, setPreguntas] = useState(null);
    const [expandedMenus, setExpandedMenus] = useState({});
    const anchorRefs = useRef({});
    const [expandedText, setExpandedText] = useState(false);

    useEffect(() => {
        const fetchPreguntasInitial = async () => {
            try {
                const response = await getQuestionInitial();
                setPreguntas(response);
                setExpandedMenus(initialExpandedMenus(response)); // Inicializar los menús expandidos
            } catch (error) {
                console.error('Error al traer las preguntas:', error);
            }
        };
        fetchPreguntasInitial();
    }, []);



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
            console.log('Respuesta para la pregunta', id, ':', data);
            return data;
        } catch (error) {
            console.error('Error al obtener la respuesta para la pregunta', id, ':', error);
            return null; // Devuelve null si hay un error al obtener la respuesta
        }
    };
    
    
    // Dentro de useEffect
    useEffect(() => {
        const fetchPreguntasInitial = async () => {
            try {
                const response = await getQuestionInitial();
                const preguntasConRespuestas = await Promise.all(response.map(async pregunta => {
                    const respuesta = await getAnswerForQuestionId(pregunta.id);
                    return { ...pregunta, respuesta };
                }));
                setPreguntas(preguntasConRespuestas);
                setExpandedMenus(initialExpandedMenus(response)); // Inicializar los menús expandidos
            } catch (error) {
                console.error('Error al traer las preguntas:', error);
            }
        };
        fetchPreguntasInitial();
    }, []);






    /////











    // Función para inicializar los menús expandidos con valor false para cada pregunta
    const initialExpandedMenus = (preguntas) => {
        const initialMenus = {};
        preguntas.forEach(pregunta => {
            initialMenus[pregunta.id] = false;
        });
        return initialMenus;
    };

    // Función para manejar la apertura del menú desplegable
    const handleClick = (id) => {
        setExpandedMenus((prevMenus) => ({
            ...prevMenus,
            [id]: !prevMenus[id], // Invertir el estado del menú correspondiente al id
        }));
    };

    // Función para cerrar el menú desplegable
    const handleClose = (id) => {
        setExpandedMenus((prevMenus) => ({
            ...prevMenus,
            [id]: false, // Cerrar el menú correspondiente al id
        }));
    };

    // Función para ocultar
    const handleHideClick = async (id) => {
        try {
            await hideQuestion(id);
            // Si la solicitud se completa con éxito, puedes mostrar algún tipo de mensaje de éxito o actualizar el estado de tu componente según sea necesario
            setSuccessMessageOpen(true);
            console.log("La pregunta se ha ocultado correctamente.");
        } catch (error) {
            // Si ocurre un error durante la solicitud, puedes manejarlo aquí mostrando un mensaje de error o tomando otras acciones según sea necesario
            console.error("Error al ocultar la pregunta:", error);
            setErrorMessageOpen(true);
        }
    };

    // Función para mostrar una pregunta oculta
    const handleShowClick = async (id) => {
        try {
            await showQuestion(id);
            // Actualizar preguntas después de mostrar una pregunta oculta
            const updatedPreguntas = preguntas.map(pregunta => {
                if (pregunta.id === id) {
                    return {
                        ...pregunta,
                        hidden: false // Actualiza el estado de oculto a falso
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

    return (
        <main style={{ padding: '20px' }}>
            <Link to={"/chatbot-gestion"}>
                <CustomButton
                    fullWidth
                    sx={{
                        my: '32px',
                    }}
                >
                    Cargar Pregunta/Respuesta
                </CustomButton>
            </Link>
            <Box>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Preguntas Iniciales</h2>
                {preguntas && (
                    <Grid container justifyContent="center">
                        {preguntas.map(pregunta => (
                            <Card key={pregunta.id} sx={{
                                width: "328px",
                                borderRadius: "16px",
                                m: 1,
                                boxShadow: "none",
                            }}>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        color="primary"
                                        sx={{
                                            fontFamily: 'Lato',
                                            fontSize: '18px',
                                            fontWeight: 700,
                                            lineHeight: '25px',
                                            letterSpacing: '0px',
                                            textAlign: 'left',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignpreguntas: 'center'
                                        }}
                                    >
                                        {pregunta.text}
                                        <button onClick={() => handleClick(pregunta.id)} ref={el => anchorRefs.current[pregunta.id] = el}
                                            style={{
                                                border: 'none',
                                                marginLeft: "1.5rem",
                                            }}>
                                            <img src="../../../public/img/menu-edit.svg" alt="menu" />
                                        </button>
                                        <Menu
                                            anchorEl={anchorRefs.current[pregunta.id]}
                                            open={expandedMenus[pregunta.id]}
                                            onClose={() => handleClose(pregunta.id)}
                                        >
                                            <MenuItem onClick={() => handleClose(pregunta.id)}>
                                                <Link to={"/chatbot-edit/" + pregunta.id} style={{
                                                    textDecoration: 'none',
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    color: '#090909'
                                                }}>Editar / Ver más</Link>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleHideClick}
                                            >
                                                <Link to="#" style={{
                                                    textDecoration: 'none',
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    color: '#090909'
                                                }}>Ocultar</Link>
                                            </MenuItem>
                                        </Menu>
                                    </Typography>
                                    <Divider sx={{
                                        border: '1px solid #226516',
                                        width: '200px'
                                    }} />
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                       <Typography
    sx={{
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '24px',
        marginTop: '8px',
        width: 'calc(244px - 16px)',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: expandedText ? 'unset' : 3,
        overflow: 'hidden',
    }}
>
    {/* {pregunta.type} */}
    {pregunta.respuesta ? pregunta.respuesta.text : 'Respuesta no disponible'}
</Typography>


                                        
                                        {/* <div style={{
                                            width: '7.41px',
                                            height: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingTop: '16px'
                                        }}>
                                            <Link to="#">
                                                <img src="../../../public/img/right.svg" alt="right" />
                                            </Link>
                                        </div> */}
                                    </div>


{/* 
                                    {pregunta.respuesta && (
    <CustomButton onClick={() => setExpandedText(!expandedText)}>
        {expandedText ? 'Mostrar menos' : 'Mostrar más'}
    </CustomButton>
)} */}


                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                )}

            </Box>


        </main>
    );
}

export default ChatBot;
