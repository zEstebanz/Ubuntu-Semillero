import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Select, MenuItem } from '@mui/material';
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

const provinciasArgentinas = [
    'Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán'
];

const paises = [
    'Argentina',
    'Chile',
    'Perú',
    'Brasil',
    'Uruguay',
    'Paraguay',
];
function MicroForm() {
    const [counter, setCounter] = useState(0);
    const [provincia, setProvincia] = useState('');
    const [categoria, setCategoria] = useState('');
    const [images, setImages] = useState([]);
    const [pais, setPais] = useState('');

    const [isFormComplete, setIsFormComplete] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const allFieldsCompleted = provincia && categoria && pais && ciudad && title && informacion && descripcion; // Verifica si todos los campos están completos
        setIsFormComplete(allFieldsCompleted);
    }, [provincia, categoria, pais]); // Dependencias del efecto

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

    const handleChangeImage = (e) => {
        const files = e.target.files;
        const imagesArray = [];

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
                    Completá los datos para crear una nueva publicación
                </Typography>
                <Input
                    type="text"
                    required
                    id="title"
                    label="Nombre del Microemprendimiento*"
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
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
                    value={categoria}
                    onChange={handleCategoriaChange}
                    fullWidth
                    required
                    sx={{ mt: 3 }}
                    displayEmpty
                    renderValue={(value) => {
                        if (value === '') {
                            return <p>Categoría*</p>;
                        }
                        return value;
                    }}
                >
                    <MenuItem value="Economía social/Desarrollo local/
                        Inclusión financiera">
                        Economía social/Desarrollo local/
                        Inclusión financiera
                    </MenuItem>

                    <MenuItem value="Agroecología/Orgánicos/Alimentación
                        saludable">
                        Agroecología/Orgánicos/Alimentación
                        saludable
                    </MenuItem>

                    <MenuItem value="Conservación/Regeneración/Servicios
                        ecosistémicos">
                        Conservación/Regeneración/Servicios
                        ecosistémicos
                    </MenuItem>

                    <MenuItem value="Empresas/Organismos de impacto/
                        Economía circular">
                        Empresas/Organismos de impacto/
                        Economía circular
                    </MenuItem>
                </Select>

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

                {/* País */}

                <Select
                    value={pais}
                    required
                    onChange={handlePaisChange}
                    fullWidth
                    sx={{ mt: 3 }}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        País*
                    </MenuItem>
                    {paises.map((pais) => (
                        <MenuItem key={pais} value={pais}>
                            {pais}
                        </MenuItem>
                    ))}
                </Select>

                {/* Provincia/Estado */}

                <Select
                    value={provincia}
                    required
                    onChange={handleProvinciaChange}
                    fullWidth
                    sx={{ mt: 3 }}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Provincia/Estado*
                    </MenuItem>
                    {provinciasArgentinas.map((provincia) => (
                        <MenuItem key={provincia} value={provincia}>
                            {provincia}
                        </MenuItem>
                    ))}
                </Select>

                <Input
                    type="text"
                    required
                    id="ciudad"
                    label="Ciudad"
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                />
                <Input
                    type="text"
                    required
                    id="descripcion"
                    label="Descripción del Microemprendimiento"
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                />
                <Input
                    type="text"
                    required
                    id="informacion"
                    label="Más información del Microemprendimiento"
                    fullWidth
                    sx={{
                        mt: 3,
                    }}

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

export default MicroForm;
