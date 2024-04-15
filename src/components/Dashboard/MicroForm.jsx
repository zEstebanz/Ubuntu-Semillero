import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Select, MenuItem, Snackbar, SnackbarContent } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import upload from "../../../public/img/upload.svg";
import getRubros from '../../api/rubrosCategori/getRubro';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import getPaises from '../../api/location/getPaises';
import getProvincias from '../../api/location/getProvincias';
import { getAccessToken } from "../../utils/helpers/localStorage";
import { useSession } from '../../hooks/useSession';
import { MessageHelperText } from "../../components/Contact/MessageHelperText";
import { MicroMessageText } from "./Message/MicroMessageText";
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

function MicroForm() {
    const user = useSession();

    const [submit, setSubmit] = useState(true);

    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [provincia, setProvincia] = useState([]);
    const [pais, setPais] = useState([]);
    const [paisSeleccionado, setPaisSeleccionado] = useState('');
    const [paisIdSeleccionado, setPaisIdSeleccionado] = useState('');
    const [categoria, setCategoria] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [nombreMicro, setNombreMicro] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [errorMessageOpen, setErrorMessageOpen] = useState(false);
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);

    const [masInfo, setMasInfo] = useState('');
    const maxLength = 300;

    const [counter, setCounter] = useState(0);

    const [subcategoria, setSubcategoria] = useState('');

    const [imageList, setImageList] = useState(images);

    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        getRubros().then(data => setCategoria(data));
        getPaises().then(data => setPais(data));
    }, []);


    const fileInputRef = useRef(null);

    const handleImageUpload = () => {
        // Lógica para manejar la carga de la imagen aquí
    };

    const handleDeleteClick = (index) => {
        const newImageList = [...imageList];
        newImageList.splice(index, 1);
        setImageList(newImageList);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleCategoriaChange = (event) => {
        setCategoriaSeleccionada(event.target.value);
    };

    const handlePaisChange = async (event) => {

        const selectedCountryId = event.target.value;
        setPaisSeleccionado(event.target.value)

        //setPaisSeleccionado(selectedCountryId); // Actualiza el país seleccionado
        //setPaisIdSeleccionado(selectedCountryId);
        // console.log(selectedCountryId)
        try {
            const provincia = await getProvincias(selectedCountryId);
            setProvincia(provincia);
        } catch (error) {
            console.error('Error al obtener las provincias:', error);
        }
    };

    const handleProvinciaChange = (event) => {
        setProvincia(event.target.value);
    };

    const handleChangeImage = (e) => {
        const files = e.target.files;
        setFiles((fileState) => [...fileState, files[0]])
        const imagesArray = [];

        // console.log(files.length)

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

    // console.log(files)

    const handleNombreMicroChange = (event) => {
        setNombreMicro(event.target.value);
    };

    const handleSubcategoriaChange = (event) => {
        setSubcategoria(event.target.value);
    };

    const handleCiudad = (event) => {
        setCiudad(event.target.value);
    };

    const handleDescripcion = (event) => {
        setDescripcion(event.target.value);
        const text = event.target.value;
        if (text.length <= maxLength) { // Verifica si el texto es menor o igual al máximo permitido
            setDescripcion(text);
        }
    };

    const handleMasInfo = (event) => {
        setMasInfo(event.target.value);
        const text = event.target.value;
        if (text.length <= maxLength) { // Verifica si el texto es menor o igual al máximo permitido
            setMasInfo(text);
        }
    };


    const handleSubmit = async () => {

        if (isSubmitting) {
            return; // Evitar múltiples envíos si ya se está procesando una solicitud
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('nombre', nombreMicro);
        formData.append('idRubro', 2);
        formData.append('subrubro', subcategoria);

        formData.append('idPais', 1);
        formData.append('idProvincia', 1);

        formData.append('ciudad', ciudad);
        formData.append('descripcion', descripcion);
        formData.append('masInfo', masInfo);

        formData.append('email', user.sub);

        // formData.append(`images`, files[0], 'images1')

        files.forEach((image, index) => {
            formData.append(`images`, image, image.name)
        })

        try {

            const response = await ubuntuApi.postForm('/microemprendimientos/admin/create', formData,
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                        'content-type': 'multipart/form-data'
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
                    Completá el formulario para cargar un Microemprendimiento
                </Typography>
                <Input
                    type="text"
                    required
                    id="title"
                    label="Nombre del Microemprendimiento"
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                    value={nombreMicro} // Agrega el valor del estado
                    onChange={handleNombreMicroChange} // Agrega el manejador de cambio
                />
                <Typography
                    sx={{
                        fontSize: '13px',
                        fontWeight: 400,
                        lineHeight: '35px',
                    }}
                >
                    Se visualizará en el título de la publicación
                </Typography>

                {/* Categoría */}
                <Select
                    onChange={handleCategoriaChange}
                    fullWidth
                    required
                    sx={{ mt: 3 }}
                    displayEmpty
                    value={categoriaSeleccionada} // Utiliza la categoría seleccionada como valor
                >
                    <MenuItem value="" disabled>
                        {categoriaSeleccionada ? categoriaSeleccionada : 'Categoria*'}
                    </MenuItem>
                    {categoria.map((item, index) => (
                        <MenuItem key={item.id} value={item.nombre}>
                            {item.nombre}
                        </MenuItem>
                    ))}
                </Select>
                {/* End Categoría */}

                {/* Sub-Categoría */}
                <Input
                    type="text"
                    required
                    id="title"
                    label="Subcategoría"
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                    value={subcategoria} // Agrega el valor del estado
                    onChange={handleSubcategoriaChange} // Agrega el manejador de cambio
                />
                <Typography
                    sx={{
                        fontSize: '13px',
                        fontWeight: 400,
                        lineHeight: '35px',
                    }}
                >
                    Escribi la subcategoría del Microemprendimiento
                </Typography>
                {/* End Sub-Categoría */}

                {/* País */}
                <Select
                    onChange={handlePaisChange}
                    fullWidth
                    required
                    sx={{ mt: 3 }}
                    displayEmpty
                    value={paisSeleccionado} // Agrega el valor del estado
                >
                    <MenuItem value={paisIdSeleccionado}>
                        {paisSeleccionado ? paisSeleccionado : 'Pais*'}
                    </MenuItem>
                    {pais.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                            {item.nombre}
                        </MenuItem>
                    ))}
                </Select>
                {/* End País */}

                {/* Provincia/Estado */}
                <Select
                    required
                    fullWidth
                    sx={{ mt: 3 }}
                    displayEmpty
                    value={provincia.nombre || ''}
                    onChange={handleProvinciaChange}
                    placeholder='Provincia*'
                >

                    <MenuItem value="">
                        {provincia.nombre ? provincia.nombre : 'Provincia*'}
                    </MenuItem>

                    {Array.isArray(provincia) && provincia.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                            {item.nombre}
                        </MenuItem>
                    ))}
                </Select>
                {/* End Provincia/Estado */}

                {/* Ciudad */}
                <Input
                    type="text"
                    id="ciudad"
                    label="Ciudad*"
                    value={ciudad}
                    onChange={handleCiudad}
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                />
                {/* Descripcion */}
                <Input
                    required
                    type="text"
                    helperText={<MicroMessageText counter={counter} />}
                    //defaultValue={messageDefaultValue}
                    label='Descripción del Microemprendimiento'
                    value={descripcion}
                    fullWidth
                    multiline
                    rows={7}
                    sx={{
                        mt: 2,
                    }}
                    inputProps={{
                        maxLength: maxLength, // Establece la longitud máxima permitida
                    }}
                    onChange={(event) => {
                        setCounter(event.target.value.length);
                        handleDescripcion(event);
                    }}
                />
                {/* Mas Info */}

                <Input
                    required
                    type="text"
                    helperText={<MicroMessageText counter={counter} />}
                    //defaultValue={messageDefaultValue}
                    label='Más información del Microemprendimiento'
                    value={masInfo}
                    fullWidth
                    multiline
                    rows={7}
                    sx={{
                        mt: 2,
                    }}
                    inputProps={{
                        maxLength: maxLength, // Establece la longitud máxima permitida
                    }}
                    onChange={(event) => {
                        setCounter(event.target.value.length);
                        handleMasInfo(event);
                    }}
                />

                {/* End Mas Info */}

                <Box
                    sx={{
                        mt: 2
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
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

                        {/* Columna de imágenes */}
                        <Box
                            sx={{
                                position: 'relative', // Establece el posicionamiento relativo para el contenedor de imágenes
                                display: 'flex',
                                flexDirection: 'row',
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
                                            width: '104px',
                                            height: '80px',
                                            opacity: '0.9',
                                            borderRadius: '4px',
                                            objectFit: 'cover'
                                        }}
                                        alt={`Image ${index + 1}`}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
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
                                            <img src="../../../public/img/edit.svg" alt="" />

                                        </Box>
                                        <Box sx={{
                                            background: '#09090999',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                            onClick={() => handleDeleteClick(index)}
                                        >
                                            <img src="../../../public/img/delete.svg" alt="" />
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {/* Renderiza el botón solo si hay menos de 3 imágenes cargadas */}
                        {images.length < 3 && (
                            <>
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
                                        marginTop: '16px' // Añade un margen superior
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
                            </>
                        )}
                    </Box>
                </Box>

                {submit &&
                    <CustomButton
                        fullWidth
                        style={{
                            marginBottom: "32px",
                            color: "#FDFDFE",
                            backgroundColor: '#093C59',
                        }}
                        onClick={handleSubmit}
                    >
                        Crear Microemprendimiento
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
                        onClose={handleCloseSuccessMessage}
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
                        onClose={handleCloseErrorMessage}
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
                                            <Link to="/dashboard-micro" variant="button" style={{ marginRight: '8px', textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600, marginRight: '16px' }} onClick={() => setErrorMessageOpen(false)}>Cancelar</Link>
                                            <Link to="/dashboard-micro/form" variant="button" style={{ textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600 }} onClick={() => { setErrorMessageOpen(false); }}>Intentar Nuevamente</Link>
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

export default MicroForm;