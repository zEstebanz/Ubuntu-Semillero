import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Button } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import { MessageText } from "./Message/MessageText";
import upload from "../../../public/img/upload.svg";

const Input = styled(TextField)(({ theme }) => ({
    "& label": {
        color: theme.palette.common.black,
    },
    "&.MuiInputLabel-shrink label": {
        color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: `1px solid ${theme.palette.common.black}`,
        },
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.palette.common.black}`
        },
        "&.Mui-focused label": {
            color: theme.palette.primary.main,
        },
    },
}));

const handleImageUpload = () => {
    // Lógica para manejar la carga de la imagen aquí
};

function PublicationsForm() {
    const [counter, setCounter] = useState(0);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const messageDefaultValue = `Ingresa el contenido de la publicación*`;
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Verifica si todos los campos están completos
        if (counter > 0 && true) {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    }, [counter /*, otros estados necesarios */]);

    const handleClick = () => {
        fileInputRef.current.click(); // Simula hacer clic en el campo de entrada de archivo
    };

    const handleChange = (event) => {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            handleImageUpload(file); // Maneja la carga de la imagen
        }
    };

    return (
        <section>
            <Box
                component='form'
                sx={{
                    width: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: '1.75rem',
                        textAlign: 'center',
                        fontWeight: 500,
                    }}
                >
                    Carga de microemprendimientos
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: '1.25rem',
                        textAlign: 'center',
                        fontWeight: 400,
                        lineHeight: '35px',
                        paddingTop: '32px'
                    }}
                >
                    Completá los datos para crear una nueva publicación
                </Typography>
                <Input
                    type="text"
                    required
                    id="full-name"
                    label="Titulo"
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                />
                <Input
                    required
                    type="text"
                    helperText={<MessageText counter={counter} />}
                    //defaultValue={messageDefaultValue}
                    placeholder='Ingresa el contenido de la publicación*'
                    fullWidth
                    multiline
                    rows={7}
                    sx={{
                        mt: 2,
                    }}
                    onChange={(event) => setCounter(event.target.value.length)}
                />
                <Box
                    sx={{
                        mt: 2,
                        ml: '60%'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 2,
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }} // Oculta visualmente el campo de entrada de archivo
                            onChange={handleChange}
                        />
                        <button
                            style={{
                                width: '152px',
                                height: '40px',
                                padding: '10px 16px',
                                border: 'none',
                                gap: '8px',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textAlign: 'center',
                                textTransform: 'none',
                                backgroundColor: '#093C59',
                                color: '#FDFDFE'
                            }}
                            onClick={handleClick}
                            disabled={!isFormComplete}
                        >
                            <img
                                src={upload}
                                alt="Upload Icon"
                                style={{ marginRight: '8px', verticalAlign: 'middle' }}
                            />
                            Subir imágen
                        </button>
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                        }}
                    >
                        <Typography
                            color="black"
                            sx={{
                                display: 'block',
                                fontWeight: 400,
                                fontSize: '0.75rem'
                            }}
                        >
                            *Requerida al menos una imagen
                        </Typography>
                        <Typography
                            color="black"
                            sx={{
                                display: 'block',
                                fontWeight: 400,
                                fontSize: '0.75rem'
                            }}
                        >
                            Hasta 3 imágenes.
                            <br />
                            Máximo 3Mb cada una
                        </Typography>
                    </Box>
                </Box>
                <CustomButton
                    fullWidth
                    style={{
                        marginBottom: "32px",
                        color: "#FDFDFE",
                        backgroundColor: isFormComplete ? '#093C59' : '#6E6F70',
                    }}
                    disabled={!isFormComplete}
                >
                    Crear publicación
                </CustomButton>
            </Box>
        </section>
    )
}

export default PublicationsForm;
