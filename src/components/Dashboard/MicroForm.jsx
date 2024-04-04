import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Select, MenuItem } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import upload from "../../../public/img/upload.svg";
import getRubros from '../../api/rubrosCategori/getRubro';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import getPaises from '../../api/location/getPaises';
import getProvincias from '../../api/location/getProvincias';
import { getAccessToken } from "../../utils/helpers/localStorage";
import { useSession } from '../../hooks/useSession';
import { MessageHelperText } from "../../components/Contact/MessageHelperText";


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
    const [masInfo, setMasInfo] = useState('');

    const [counter, setCounter] = useState(0);

    const [subcategoria, setSubcategoria] = useState('');

    // const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        getRubros().then(data => setCategoria(data));
        getPaises().then(data => setPais(data));
    }, []);

    const fileInputRef = useRef(null);

    const handleImageUpload = () => {
        // Lógica para manejar la carga de la imagen aquí
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
    };

    const handleMasInfo = (event) => {
        setMasInfo(event.target.value);
    };

    const handleSubmit = async () => {
        // Crea un objeto con los datos del formulario
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
                    label="Nombre del Microemprendimiento*"
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
                    type="text"
                    required
                    id="descripcion"
                    label="Descripción del Microemprendimiento*"
                    value={descripcion}
                    onChange={handleDescripcion}
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                />
                {/* Mas Info */}
                <Input
                    type="text"
                    required
                    id="informacion"
                    label="Más información del Microemprendimiento*"
                    value={masInfo}
                    onChange={handleMasInfo}
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                />

                {/* <Input
                    required
                    type="text"
                    id="descripcionMicroemprendimiento"
                    label="Descripción del Microemprendimiento"
                    helperText={<MessageHelperText counter={counter} />}
                    fullWidth
                    multiline
                    rows={7}
                    sx={{
                        mt: 2,
                    }}
                    value={masInfo}
                    onChange={(event) => setCounter(event.target.value.length)}
                />

                <Input
                    required
                    type="text"
                    id="infoMicroemprendedor"
                    label="Mas información del Microemprendedor"
                    helperText={<MessageHelperText counter={counter} />}
                    fullWidth
                    multiline
                    rows={7}
                    sx={{
                        mt: 2,
                    }}
                    value={masInfo}
                    onChange={(event) => setCounter(event.target.value.length)}
                /> */}

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
                        backgroundColor: '#093C59',
                        // backgroundColor: isFormComplete ? '#093C59' : '#6E6F70',
                    }}
                    // disabled={!isFormComplete}
                    onClick={handleSubmit} // Agrega el manejador de clic para enviar el formulario
                >
                    Crear Microemprendimiento
                </CustomButton>
            </Box>
        </section>
    )
}

export default MicroForm;