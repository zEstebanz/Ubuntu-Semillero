import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Button, SnackbarContent, Snackbar } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import { MessageText } from "./Message/MessageText";
import upload from "../../../public/img/upload.svg";
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { useSession } from '../../hooks/useSession';
import { getAccessToken } from '../../utils/helpers/localStorage';
import { Link } from 'react-router-dom';

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

    const maxLength = 2000;

    const messageDefaultValue = `Ingresa el contenido de la publicación*`;

    const fileInputRef = useRef(null);

    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submit, setSubmit] = useState(true);

    useEffect(() => {
        // Verifica si todos los campos están completos
        const allFieldsCompleted = nombre.length > 0 && typeof descripcion === 'string' && descripcion.trim() !== '';
        setIsFormComplete(allFieldsCompleted);
    }, [nombre, descripcion]);
    

    const handleClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleChangeImage = (e) => {
        e.preventDefault();

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
        const text = event.target.value;
        if (text.length <= maxLength) {
            setDescripcion(text);
        }
    }
    const handleSubmit = async () => {

        if (isSubmitting) {
            return; // Evitar múltiples envíos si ya se está procesando una solicitud
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('titulo', nombre);
        formData.append('descripcion', descripcion);
        formData.append('isDeleted', false);
        formData.append('idUsuario', 1)

        // Añade cada imagen al FormData
        //  images.forEach((image, index) => {
        //      formData.append('images[]', image);
        //  });

        // images.forEach((file) => {
        //     formData.append('images', file);
        // });

        files.forEach((image, index) => {
            formData.append(`images`, image, image.name)
        })

        try {
            const response = await ubuntuApi.postForm('/publicaciones/admin/create', formData, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                    'content-type': 'multipart/form-data'
                    // No necesitas establecer content-type ya que FormData lo manejará automáticamente
                },
            });
            if (response.status === 200) {
                setSuccessMessageOpen(true);
                setSubmit(false);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setErrorMessageOpen(true);
        }
        finally {
            setIsSubmitting(false); // Habilitar nuevamente el botón de envío
        }
    };

    const handleCloseSuccessMessage = () => {
        setSuccessMessageOpen(false);
    };
    const handleCloseErrorMessage = () => {
        setErrorMessageOpen(false);
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
                    label="Titulo"
                    value={nombre}
                    fullWidth
                    onChange={handleNombre}
                    sx={{
                        mt: 3,
                    }}
                />
                <Input
                    type="text"
                    required
                    helperText={<MessageText counter={counter} />}
                    //defaultValue={messageDefaultValue}
                    label='Ingresa el contenido de la publicación'
                    value={descripcion}
                    fullWidth
                    multiline
                    rows={7}
                    sx={{
                        mt: 2,
                    }}
                    inputProps={{
                        maxLength: maxLength,
                    }}
                    onChange={(event) => {
                        setCounter(event.target.value.length);
                        handleDescripcion(event);
                    }}
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
                            <div>
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

                            </div>
                        )}
                    </Box>


                </Box>

                {submit &&
                    <CustomButton
                        onClick={handleSubmit}
                        fullWidth
                        style={{
                            marginBottom: "32px",
                            color: "#FDFDFE",
                            backgroundColor: isFormComplete ? '#093C59' : '#6E6F70',
                        }}
                        disabled={!isFormComplete}
                    >
                        Guardar Publicación
                    </CustomButton>
                }

                {/* mensaje de Exito */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Snackbar
                        open={successMessageOpen}
                        autoHideDuration={null}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <SnackbarContent
                            message={
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center', // Centrar contenido verticalmente
                                        margin: '0px 0px 16px 0px',
                                    }}>
                                        <div style={{
                                            height: '40px',
                                            width: '40px',
                                            border: '2px solid #1D9129',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: '8px', // Añadir un espacio entre la imagen y el texto
                                        }}>
                                            <img src="../../../public/img/check.svg" alt="check" style={{ width: '24px', height: '24px' }} />
                                        </div>
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                color: '#333333',
                                                fontWeight: '400',
                                                fontSize: '18px',
                                                lineHeight: '32px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            Publicación creada con éxito
                                        </span>
                                        {/* Al hacer clic en el enlace, oculta el Snackbar */}
                                        <Link to="/dashboard-admin" variant="button" style={{ display: 'block', textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600, textAlign: 'end', marginTop: '16px' }} onClick={() => setSuccessMessageOpen(false)}>Aceptar</Link>
                                    </div>
                                </>
                            }
                            sx={{
                                width: '328px',
                                height: '184px',
                                borderRadius: '28px',
                                backgroundColor: '#FDFDFE',
                                color: '#FDFDFE'
                            }}
                        />
                    </Snackbar>
                </Box>

                {/* mensaje de Error */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Snackbar
                        open={errorMessageOpen}
                        autoHideDuration={null}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <SnackbarContent
                            message={
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center', // Centrar contenido verticalmente
                                        margin: '0px 0px 16px 0px',
                                    }}>
                                        <div style={{
                                            height: '40px',
                                            width: '40px',
                                            border: '2px solid #BC1111',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: '8px', // Añadir un espacio entre la imagen y el texto
                                        }}>
                                            <img src="../../../public/img/error.svg" alt="check" style={{ width: '24px', height: '24px' }} />
                                        </div>
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                color: '#333333',
                                                fontWeight: '400',
                                                fontSize: '18px',
                                                lineHeight: '32px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            Lo sentimos, la Publicación no pudo ser creada.
                                        </span>
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                color: '#333333',
                                                fontWeight: '400',
                                                fontSize: '16px',
                                                lineHeight: '32px'
                                            }}
                                        >
                                            Por favor, volvé a intentarlo.
                                        </span>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
                                            <Link to="/dashboard-publications" variant="button" style={{ marginRight: '8px', textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600, marginRight: '16px' }} onClick={() => setErrorMessageOpen(false)}>Cancelar</Link>
                                            <Link to="/dashboard-publications/form" variant="button" style={{ textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600 }} onClick={() => { setErrorMessageOpen(false); }}>Intentar Nuevamente</Link>
                                        </div>
                                    </div>
                                </>
                            }
                            sx={{
                                width: '328px',
                                height: '208px',
                                borderRadius: '28px',
                                backgroundColor: '#FDFDFE',
                                color: '#FDFDFE'
                            }}
                        />
                    </Snackbar>
                </Box>

            </Box>
        </section>
    )
}

export default PublicationsForm;
