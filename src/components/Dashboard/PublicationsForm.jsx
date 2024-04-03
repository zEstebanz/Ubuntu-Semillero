import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Button } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import { MessageText } from "./Message/MessageText";
import upload from "../../../public/img/upload.svg";
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { useSession } from '../../hooks/useSession';
import { getAccessToken } from '../../utils/helpers/localStorage';

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

function PublicationsForm() {
    const user = useSession();

    const [counter, setCounter] = useState(0);
    const [isFormComplete, setIsFormComplete] = useState(false);

    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);

    const [nombre, setNombre] = useState([]);
    const [date, setDate] = useState([]);
    const [descripcion, setDescripcion] = useState([]);

    const messageDefaultValue = `Ingresa el contenido de la publicación*`;

    const fileInputRef = useRef(null);

    useEffect(() => {
        // Verifica si todos los campos están completos
        if (counter > 0 && true) {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    }, [counter]);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChangeImage = (e) => {
        const files = e.target.files;
        setFiles((fileState) => [...fileState, files[0]])
        const imagesArray = [];

        console.log(files.length)

        if (files[0].size > 3000000) {
            alert('Imagenes mayor a 3mb')
            return
        }

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagesArray.push(event.target.result);
                if (imagesArray.length === files.length) {
                    setImages([...images, ...imagesArray]);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const handleNombre = (event) => {
        setNombre(event.target.value)
    }
    const handleDate = (event) => {
        setDate(event.target.value)
    }
    const handleDescripcion = (event) => {
        setDescripcion(event.target.value)
    }

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('titulo', nombre);
        formData.append('descripcion', descripcion)
        // formData.append('fecha-creacion', date)

        formData.append('email', user.sub);

        files.forEach((image, index) => {
            formData.append(`images`, image, image.name)
        })

        try {

            const response = await ubuntuApi.postForm('/#', formData,
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                        'content-type': 'multipart/form-data'
                    },
                });

        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <section>
            <Box
                component='form'
                sx={{
                    width: '328px',
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
                    Carga de publicación
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
                    label="Titulo*"
                    value={nombre}
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
                    value={descripcion}
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
                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            ref={fileInputRef}
                            style={{ display: 'none' }} // Oculta visualmente el campo de entrada de archivo
                            onChange={handleChangeImage}
                            disabled={images.length === 3} // Deshabilita el input cuando hay 3 imágenes cargadas
                        />

                        <div>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`preview ${index}`}
                                    style={{
                                        width: '328px',
                                        height: '112px',
                                        borderRadius: "4px",
                                        objectFit: "cover"
                                    }}
                                />
                            ))}
                        </div>
                        
                        {/* Renderiza el botón solo si hay menos de 3 imágenes cargadas */}
                        {images.length < 3 && (
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
                                    color: '#FDFDFE',
                                    marginTop: '16px'
                                }}
                                onClick={handleClick}
                                disabled={images.length === 3} // Deshabilita el botón cuando hay 3 imágenes cargadas
                            >
                                <img
                                    src={upload}
                                    alt="Upload Icon"
                                    style={{
                                        marginRight: '8px',
                                        verticalAlign: 'middle',
                                    }}
                                />
                                Subir imagen
                            </button>
                        )}
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
