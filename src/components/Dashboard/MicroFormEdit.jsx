import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import upload from "../../../public/img/upload.svg";
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccessToken } from '../../utils/helpers/localStorage';
import { useSession } from '../../hooks/useSession';
import getRubros from '../../api/rubrosCategori/getRubro';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getImageFromURL } from '../../api/micros/getImageFromURL';
import getPaises from '../../api/location/getPaises';
import getProvincias from '../../api/location/getProvincias';

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

const getMicroByID = async (id) => {
    const res = await ubuntuApi.get(`/microemprendimientos/admin/findById/${id}`, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        }
    });
    return res.data.body;
}

function MicroFormEdit() {

    const paisSelectRef = useRef();
    const user = useSession();

    const navigate = useNavigate();

    const { id } = useParams();

    const [counter, setCounter] = useState(0);
    const [nombre, setNombreMicro] = useState('');
    const [provincia, setProvincia] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [rubro, setRubro] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [info, setInfo] = useState('');
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [pais, setPais] = useState('');
    const [listaPaises, setListaPaises] = useState([]);
    const [listaProvincias, setListaProvincias] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const [imgEditIndex, setImgEditIndex] = useState([]);
    const [newImages, setNewImages] = useState([]);

    // const [micro, setMicro] = useState(null);

    const [isFormComplete, setIsFormComplete] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        getRubros().then(data => setCategoria(data));
        getMicroByID(id).then(data => {
            setNombreMicro(data.nombre)
            setRubro(data.rubro)
            setCategoria(data.subrubro)
            setPais(data.pais)
            setProvincia(data.provincia)
            setCiudad(data.ciudad)
            setDescripcion(data.descripcion)
            setInfo(data.masInfo)

            if (images.length === 0) {
                setImages(data.images)
            }
            setCurrentImages(data.images);
            return data.pais
        })
            .then(pais => {
                getProvincias(pais.id)
                    .then(data => setListaProvincias(data))
                    .catch(err => console.log(err))
            })
        getPaises()
            .then(data => setListaPaises(data))
            .catch(err => console.log(err))

        const allFieldsCompleted = provincia && categoria && pais && ciudad && title && informacion && descripcion; // Verifica si todos los campos están completos
        setIsFormComplete(allFieldsCompleted);
    }, []); // Dependencias del efecto

    const handleImageUpload = () => {
        // Lógica para manejar la carga de la imagen aquí
    };

    const handleClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click(); // Simula hacer clic en el campo de entrada de archivo
    };

    const handleChange = (event) => {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            handleImageUpload(file); // Maneja la carga de la imagen
        }
    };

    const handleNombreMicroChange = (event) => {
        setNombreMicro(event.target.value)
    }

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };

    const handleProvinciaChange = (event) => {
        setProvincia(event.target.value);
    };

    const handlePaisChange = (event) => {
        console.log(event.target.value)
        setPais(event.target.value);
        getProvincias(event.target.value.id)
            .then(data => setListaProvincias(data))
            .catch(err => console.log(err))
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
        e.preventDefault();

        const files = e.target.files;
        setFiles((fileState) => [...fileState, files[0]])
        const loadedImages = [];

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
                    copyImages.splice(imgEditIndex, 0, ...loadedImages);
                    console.log(copyImages)
                    setImages(copyImages);
                }
            };
            reader.readAsDataURL(files[i]);
        }

        setImgEditIndex(images.length);
    };

    const handleSubmit = async () => {
        // Crea un objeto con los datos del formulario
        console.log({
            nombre,
            idRubro: rubro.id,
            subrubro: categoria,
            idPais: pais.id,
            idProvincia: provincia.id,
            ciudad,
            descripcion,
            masInfo: info,
        });
        const imageFileList = await getImageFromURL(currentImages);

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('idRubro', rubro.id);
        formData.append('subrubro', categoria); // debería llamarse subcategoria la variable
        formData.append('idPais', pais.id);
        formData.append('idProvincia', provincia.id);
        formData.append('ciudad', ciudad);
        formData.append('descripcion', descripcion);
        formData.append('masInfo', info);
        formData.append('email', user.sub);

        const allFiles = [...imageFileList, ...files];
        console.log({ imageFileList, files })

        allFiles.forEach((image) => {
            formData.append('images', image, image.name)
        })

        try {
            const response = await ubuntuApi.putForm('/microemprendimientos/admin/edit/' + id, formData,
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                        'content-type': 'multipart/form-data'
                    },
                });

            if (response.status === 200) {
                navigate('/dashboard-micro');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    const handleEditImg = async (url) => {

        const indexImage = images.indexOf(url);
        setImgEditIndex(indexImage);

        const filterImages = images.filter(image => image !== url)
        setImages(filterImages)
        setCurrentImages(filterImages)

        // setNewImages([...newImages, url])
    }

    const handleDeleteImg = async (url) => {
        const filterImages = images.filter(image => image !== url)
        setImages(filterImages)
        setCurrentImages(filterImages)
        // setNewImages([...newImages, url])
    }

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
                        {nombre}
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
                        {rubro.nombre}
                    </Typography>

                    {/* Nombre */}
                    <Input
                        type="text"
                        required
                        id="title"
                        label="Nombre del Microemprendimiento*"
                        fullWidth
                        sx={{
                            mt: 3,
                        }}
                        onChange={handleNombreMicroChange}
                        value={nombre}
                    />

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
                        value={pais}
                        required
                        onChange={handlePaisChange}
                        fullWidth
                        sx={{ mt: 3 }}
                        ref={paisSelectRef}
                    >
                        <MenuItem value={pais} disabled>
                            {pais?.nombre}
                        </MenuItem>
                        {listaPaises?.map((pais) => (
                            <MenuItem key={pais.nombre} value={pais}>
                                {pais.nombre}
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
                    >
                        <MenuItem value={provincia} disabled>
                            {provincia.nombre}
                        </MenuItem>
                        {listaProvincias?.map((provincia) => (
                            <MenuItem key={provincia.nombre} value={provincia}>
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
                            <Box key={index} style={{ position: 'relative', margin: '0 5px', overflow: 'hidden' }}>
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
                                    <Box
                                        onClick={(e) => {
                                            e.preventDefault();
                                            fileInputRef.current.click();
                                            handleEditImg(image)
                                        }}
                                        sx={{
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
                                    <Box
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDeleteImg(image)
                                        }}
                                        sx={{
                                            background: '#09090999',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <img src="../../../public/img/delete.svg" alt="" />
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>

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
                            />
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
                                </div>
                            )}
                        </Box>
                    </Box>

                    <CustomButton
                        onClick={handleSubmit}
                        fullWidth
                        style={{
                            marginBottom: "32px",
                            color: "#FDFDFE",
                            backgroundColor: '#093C59',
                            // backgroundColor: isFormComplete ? '#093C59' : '#6E6F70',
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

export default MicroFormEdit;