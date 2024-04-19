import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Button, IconButton, SnackbarContent, Snackbar } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import { MessageText } from "./Message/MessageText";
import upload from "../../../public/img/upload.svg";
import { useParams, useLocation } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import { ubuntuApi } from '../../utils/services/axiosConfig';
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

const handleImageUpload = () => {
    // Lógica para manejar la carga de la imagen aquí
};

const getPostId = async (id) => {
    const res = await ubuntuApi.get(`/publicaciones/admin/findById/${id}`, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        }
    });
    console.log(res.data)
    return res.data;
}

function PublicationsForm() {

    const user = useSession();

    const { id } = useParams();
    const data = useLocation();

    console.log(data)

    const [nombre, setNombre] = useState([]);
    const [descripcion, setDescripcion] = useState('');

    // Estados de Imagenes 
    const [images, setImages] = useState([]);
    const [imgEditIndex, setImgEditIndex] = useState(0);
    const [imgDelet, setImgDelete] = useState([]);
    const [mapImages, setMapImages] = useState({});

    const maxLength = 2000;

    const [counter, setCounter] = useState();

    const [isFormComplete, setIsFormComplete] = useState(false);
    const [files, setFiles] = useState([]);
    const [newImages, setNewImages] = useState([]);

    const [submit, setSubmit] = useState(true);

    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // const messageDefaultValue = `Ingresa el contenido de la publicación*`;
    const fileInputRef = useRef(null);

    useEffect(() => {

        getPostId(id).then(data => {
            console.log(data)
            setNombre(data.titulo)
            setDescripcion(data.descripcion)
            setCounter(data.descripcion.length)
            setImages(Object.values(data.images))
            const flipped = Object
                .entries(data.images)
                .map(([key, value]) => [value, key]);
            setMapImages(Object.fromEntries(flipped))
        })



    }, [id]);

    useEffect(() => {
        // Verifica si todos los campos están completos
        if (counter > 0 && true) {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }

        const allFieldsCompleted = nombre && descripcion; // Verifica si todos los campos están completos
        setIsFormComplete(allFieldsCompleted);
    }, [counter])


    const handleClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleChangeImage = (e) => {
        e.preventDefault();

        const files = e.target.files;
        setFiles((fileState) => [...fileState, files[0]])
        const loadedImages = [];

        console.log(files.length)

        if (files[0].size > 3000000) {
            alert('Imagenes mayor a 3mb')
            return
        }

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event) => {
                loadedImages.push(event.target.result);


                if (loadedImages.length === files.length) {
                    const copyImages = [...images];
                    copyImages.splice(imgEditIndex, 0, loadedImages);
                    setImages(copyImages);
                }
            };
            reader.readAsDataURL(files[i]);
        }

        setImgEditIndex(images.length);
    };

    const handleNombre = (event) => {
        setNombre(event.target.value)
    }
    const handleDate = (event) => {
        setDate(event.target.value)
    }
    const handleDescripcion = (event) => {
        setDescripcion(event.target.value)
        // const text = event.target.value;
        // if (text.length <= maxLength) {
        //     setDescripcion(text);
        // }
    }

    const handleSubmit = async () => {


        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('tittle', nombre);
        formData.append('description', descripcion);

        const idList = newImages.map((url) => {
            return mapImages[url]
        }).join(",")

        formData.append('id_imageToReplace', idList);


        // Añade cada imagen al FormData
        if (files.length > 0) {
            files.forEach((image, index) => {
                formData.append('newImages', image);
            });
        } else {
            formData.append('newImages', new Blob());
        }

        try {
            const response = await ubuntuApi.putForm('/publicaciones/admin/edit/' + id, formData, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                    'content-type': 'multipart/form-data'
                },
            });

            if (response.status === 200) {
                setSuccessMessageOpen(true)
                setSubmit(false);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setErrorMessageOpen(true);
        } finally {
            setIsSubmitting(false); // Habilitar nuevamente el botón de envío
        }
    };

    const handleEditImg = async (url) => {

        const indexImage = images.indexOf(url);
        setImgEditIndex(indexImage);

        const filterImages = images.filter(image => image !== url)
        setImages(filterImages)

        setNewImages([...newImages, url])
    }

    const handleDeleteImg = async (url) => {
        const filterImages = images.filter(image => image !== url)
        setImages(filterImages)
        setNewImages([...newImages, url])
    }

    const handleCloseSuccessMessage = () => {
        setSuccessMessageOpen(false);
    };
    const handleCloseErrorMessage = () => {
        setErrorMessageOpen(false);
    };

    return (
        <section>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 5,
                    px: 2,
                    mx: 'auto',
                }}
                maxWidth='sm'
            >
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
                        Edición de publicación
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
                        Modificá los datos de la publicación
                    </Typography>

                    <Input
                        type="text"
                        required
                        id="titulo"
                        label="Titulo"
                        value={nombre}
                        fullWidth
                        onChange={handleNombre}
                        sx={{
                            mt: 3,
                        }}
                    />

                    <Input
                        required
                        type="text"
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
                            />

                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    marginTop: '20px',
                                    borderRadius: '4px'
                                }}
                            >
                                {images.map((image, index) => (
                                    <Box key={index} style={{ position: 'relative', margin: '0 5px', overflow: 'hidden', position: 'relative' }}>
                                        <img
                                            src={image}
                                            style={{
                                                width: '328px',
                                                height: '112px',
                                                opacity: '0.9',
                                                borderRadius: '4px',
                                                objectFit: 'cover'
                                            }}
                                            alt={`preview ${index}`}
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            {/* BOTON EDITAR */}
                                            <Box sx={{
                                                background: '#09090999',
                                                borderRadius: '50%',
                                                width: '24px',
                                                height: '24px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: '5px'
                                            }}>
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        fileInputRef.current.click();
                                                        handleEditImg(image)
                                                    }}
                                                    style={{ padding: 0, border: 'none', background: 'none' }}
                                                >
                                                    <img src="../../../public/img/edit.svg" alt="" />
                                                </IconButton>
                                            </Box>
                                            {/* BOTON DELETE */}
                                            <Box sx={{
                                                background: '#09090999',
                                                borderRadius: '50%',
                                                width: '24px',
                                                height: '24px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            >
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDeleteImg(image)
                                                    }}
                                                    style={{ padding: 0, border: 'none', background: 'none', height: '24px' }}
                                                >
                                                    <img src="../../../public/img/delete.svg" alt="" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

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

                </Box>

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
                                            Microemprendimiento cargado con éxito
                                        </span>
                                        {/* Al hacer clic en el enlace, oculta el Snackbar */}
                                        <Link to="/dashboard-publications" variant="button" style={{ display: 'block', textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600, textAlign: 'end', marginTop: '16px' }} onClick={() => setSuccessMessageOpen(false)}>Aceptar</Link>
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
                                            Lo sentimos, los cambios no pudieron ser guardados.
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
                                        {/* Al hacer clic en el enlace, oculta el Snackbar */}
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
                                            <Link to="/dashboard-publications" variant="button" style={{ marginRight: '8px', textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600, marginRight: '16px' }} onClick={() => setErrorMessageOpen(false)}>Cancelar</Link>
                                            <Link to="#" variant="button" style={{ textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600 }} onClick={() => { setErrorMessageOpen(false); }}>Intentar Nuevamente</Link>
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
        </section >
    )
}

export default PublicationsForm;