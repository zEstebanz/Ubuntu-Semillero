import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Select, MenuItem } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import { MessageText } from "./Message/MessageText";
import upload from "../../../public/img/upload.svg";
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../utils/helpers/localStorage';
import { useSession } from '../../hooks/useSession';

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

const provinciasArgentinas = [
    {
        id: 1,
        nombre: 'Buenos Aires',
    }

    // 'Catamarca',
    // 'Chaco',
    // 'Chubut',
    // 'Córdoba',
    // 'Corrientes',
    // 'Entre Ríos',
    // 'Formosa',
    // 'Jujuy',
    // 'La Pampa',
    // 'La Rioja',
    // 'Mendoza',
    // 'Misiones',
    // 'Neuquén',
    // 'Río Negro',
    // 'Salta',
    // 'San Juan',
    // 'San Luis',
    // 'Santa Cruz',
    // 'Santa Fe',
    // 'Santiago del Estero',
    // 'Tierra del Fuego',
    // 'Tucumán'
];

const paises = [
    {
        id: 1,
        nombre: 'Argentina',
    }

    // 'Chile',
    // 'Perú',
    // 'Brasil',
    // 'Uruguay',
    // 'Paraguay',
];

const getMicroByID = async (id) => {
    const res = await ubuntuApi.get(`/microemprendimientos/admin/findById/${id}`, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        }
    });
    console.log(res.data.body)
    return res.data.body;
}

function MicroForm() {
    const user = useSession();

    const { id } = useParams();

    const [counter, setCounter] = useState(0);
    const [provincia, setProvincia] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [info, setInfo] = useState('');
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [pais, setPais] = useState('');
    console.log(categoria);

    console.log({ pais, provincia, files });
    // const [micro, setMicro] = useState(null);

    const [isFormComplete, setIsFormComplete] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        getMicroByID(id).then(data => {
            setCategoria(data.subrubro)
            setPais(data.pais)
            setProvincia(data.provincia)
            setCiudad(data.ciudad)
            setDescripcion(data.descripcion)
            setInfo(data.masInfo)
        })
        const allFieldsCompleted = provincia && categoria && pais && ciudad && title && informacion && descripcion; // Verifica si todos los campos están completos
        setIsFormComplete(allFieldsCompleted);
    }, []); // Dependencias del efecto

    const handleImageUpload = () => {
        // Lógica para manejar la carga de la imagen aquí
    };

    const handleClick = () => {
        fileInputRef.current.click(); // Simula hacer clic en el campo de entrada de archivo
    };

    const handleChange = (event) => {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            handleImageUpload(file); // Maneja la carga de la imagen
        }
    };

    const handleProvinciaChange = (event) => {
        setProvincia(event.target.value);
    };

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };

    const handlePaisChange = (event) => {
        setPais(event.target.value);
    };

    const handleCiudadChange = (event) => {
        setCiudad(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleInfoChange = (event) => {
        setInfo(event.target.value);
    };

    const handleChangeImage = (e) => {
        const files = e.target.files;
        setFiles((fileState) => [...fileState, files[0]])
        const imagesArray = [];

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


    const handleSubmit = async () => {
        // Crea un objeto con los datos del formulario
        const formData = new FormData();
        formData.append('nombre', 'holis editado');
        formData.append('idRubro', 2);
        formData.append('subrubro', categoria); // debería llamarse dubcategoria la variable

        formData.append('idPais', pais);
        formData.append('idProvincia', provincia);

        formData.append('ciudad', ciudad);
        formData.append('descripcion', descripcion);
        formData.append('masInfo', info);

        formData.append('email', user.sub);

        // formData.append(`images`, files[0], 'images1')

        files.forEach((image, index) => {
            formData.append(`images`, image, image.name)
        })

        try {

            const response = await ubuntuApi.putForm('/microemprendimientos/admin/edit/' + id, formData,
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
                            lineHeight: '35px'
                        }}
                    >
                        Microemprendimientos
                    </Typography>

                    <Typography
                        variant="h3"
                        color="primary"
                        sx={{
                            fontSize: '1.375rem',
                            textAlign: 'center',
                            fontWeight: 700,
                            lineHeight: '24px',
                            paddingTop: '32px'
                        }}
                    >
                        EcoSenda
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: '1.25rem',
                            textAlign: 'center',
                            fontWeight: 400,
                            lineHeight: '35px',
                            paddingTop: '8px'
                        }}
                    >
                        Agroecología/Orgánicos/Alimentación saludable
                    </Typography>

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
                        onChange={handleCategoriaChange}
                        value={categoria}
                    />

                    {/* País */}

                    <Select
                        value={pais.id}
                        required
                        onChange={handlePaisChange}
                        fullWidth
                        sx={{ mt: 3 }}
                        displayEmpty
                        defaultValue={pais.id}
                    >
                        <MenuItem value={pais.id} disabled>
                            {pais.nombre}
                        </MenuItem>
                        {paises.map((pais) => (
                            <MenuItem key={pais.nombre} value={pais.id}>
                                {pais.nombre}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Provincia/Estado */}

                    <Select
                        value={provincia.id}
                        required
                        onChange={handleProvinciaChange}
                        fullWidth
                        sx={{ mt: 3 }}
                        displayEmpty
                    >
                        <MenuItem value={provincia.id} disabled>
                            {provincia.nombre}
                        </MenuItem>
                        {provinciasArgentinas.map((provincia) => (
                            <MenuItem key={provincia.nombre} value={provincia.id}>
                                {provincia.nombre}
                            </MenuItem>
                        ))}
                    </Select>

                    <Input
                        value={ciudad}
                        type="text"
                        required
                        id="ciudad"
                        label="Ciudad"
                        fullWidth
                        sx={{
                            mt: 3,
                        }}
                        onChange={handleCiudadChange}
                    />
                    <Input
                        value={descripcion}
                        type="text"
                        required
                        id="descripcion"
                        label="Descripción del Microemprendimiento"
                        fullWidth
                        sx={{
                            mt: 3,
                        }}
                        onChange={handleDescripcionChange}
                    />
                    <Input
                        value={info}
                        type="text"
                        required
                        id="informacion"
                        label="Más información del Microemprendimiento"
                        fullWidth
                        sx={{
                            mt: 3,
                        }}
                        onChange={handleInfoChange}
                    />
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
                        onClick={handleSubmit}
                        fullWidth
                        style={{
                            marginBottom: "32px",
                            color: "#FDFDFE",
                            backgroundColor: isFormComplete ? '#093C59' : '#6E6F70',
                        }}
                    // disabled={!isFormComplete}
                    >
                        Guardar cambios
                    </CustomButton>
                </Box>
            </Box>

        </section>
    )
}

export default MicroForm;