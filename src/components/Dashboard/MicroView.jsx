import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Modal, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../utils/helpers/localStorage';
import { useSession } from '../../hooks/useSession';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import getRubros from '../../api/rubrosCategori/getRubro';

const getMicroByID = async (id) => {
    const res = await ubuntuApi.get(`/microemprendimientos/admin/findById/${id}`, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        }
    });
    console.log(res.data.body)
    return res.data.body;
}

function MicroView() {
    const { id } = useParams();
    const [nombreMicro, setNombreMicro] = useState('');
    const [rubro, setRubro] = useState('');
    const [provincia, setProvincia] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [info, setInfo] = useState('');
    const [pais, setPais] = useState('');
    const [images, setImages] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleSearchIconClick = (image) => {
        setModalImage(image);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const currentFraction = `${currentImageIndex + 1}/${images.length}`;

    useEffect(() => {
        // Llamada a la API para obtener los datos del microemprendimiento
        getRubros().then(data => setCategoria(data)); // Si es necesario obtener rubros
        getMicroByID(id).then(data => {
            setNombreMicro(data.nombre)
            setRubro(data.rubro)
            setPais(data.pais)
            setProvincia(data.provincia)
            setCiudad(data.ciudad)
            setDescripcion(data.descripcion)
            setInfo(data.masInfo)
            setImages(data.images)

            console.log("Valor de images:", data.images);
        });

    }, [id]);

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
                        {nombreMicro}
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

                    {/* Provincia/Estado */}
                    <TextField
                        value={provincia.nombre}
                        label="Provincia/Estado"
                        fullWidth
                        sx={{ mt: 3 }}
                        InputLabelProps={{
                            shrink: true,
                            sx: { color: '#093C59' },
                        }}
                        InputProps={{
                            style: { marginBottom: '8px' }
                        }}
                    />

                    <TextField
                        value={pais.nombre}
                        label="País"
                        fullWidth
                        sx={{ mt: 3 }}
                        InputLabelProps={{
                            shrink: true,
                            sx: { color: '#093C59' },
                        }}
                        InputProps={{
                            style: { marginBottom: '8px' }, // Agrega un margen inferior
                        }}
                    />

                    {/* Ciudad */}
                    <TextField
                        value={ciudad}
                        label="Ciudad"
                        fullWidth
                        sx={{ mt: 3 }}
                        InputLabelProps={{
                            shrink: true,
                            sx: { color: '#093C59' },
                        }}
                    />

                    {/* Descripción del Microemprendimiento */}
                    <TextField
                        value={descripcion}
                        label="Descripción del Microemprendimiento"
                        fullWidth
                        sx={{ mt: 3 }}
                        InputLabelProps={{
                            shrink: true,
                            sx: { color: '#093C59' },
                        }}
                        multiline
                    />

                    {/* Más información del Microemprendimiento */}
                    <TextField
                        value={info}
                        label="Más información del Microemprendimiento"
                        fullWidth
                        sx={{ mt: 3 }}
                        InputLabelProps={{
                            shrink: true,
                            sx: { color: '#093C59' },
                        }}
                        multiline
                    />

                    {/* Columna de imágenes */}
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        {Array.isArray(images) && images.map((image, index) => (
                            <Box key={index} style={{ position: 'relative', margin: '0 5px' }}>
                                <img
                                    src={image}
                                    style={{
                                        width: '104px',
                                        height: '80px',
                                        opacity: '0.9',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        objectFit: 'cover'
                                    }}
                                    alt={`Image ${index + 1}`}
                                />
                                {/* Icono de búsqueda */}
                                <div
                                    style={{
                                        borderRadius: '50%',
                                        width: '1.5rem',
                                        height: '1.5rem',
                                        background: '#09090999',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        cursor: 'pointer' // Agregado cursor pointer para indicar que es clickable
                                    }}
                                    onClick={() => handleSearchIconClick(image)}
                                >
                                    <img
                                        src={'../../../public/img/search.svg'}
                                        alt="Search Icon"
                                        style={{
                                            transform: 'translate(-50%, -50%)',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            width: '1rem',
                                            height: '1rem'
                                        }}
                                    />
                                </div>
                            </Box>
                        ))}
                        {/* Modal */}
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100%',
                                    height: '100vh',
                                    maxWidth: '800px',
                                    bgcolor: '#000000',
                                    borderRadius: '4px',
                                    boxShadow: 24,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={images[currentImageIndex]}
                                    style={{ height: '248px', width: '100%', maxWidth: '100%', objectFit: 'cover' }}
                                    alt="Modal Image"
                                />
                                <button
                                    style={{
                                        position: 'absolute',
                                        left: '16px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#fff',
                                        marginBottom: '380px',
                                        display: currentImageIndex === 0 ? 'none' : 'block' // Oculta el botón si es la primera imagen
                                    }}
                                    onClick={handlePrevImage}
                                >
                                    <img src="../../../public/img/back.svg" alt="" />
                                </button>
                                <button
                                    style={{
                                        position: 'absolute',
                                        right: '32px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#fff',
                                        marginBottom: '380px',
                                        display: currentImageIndex === images.length - 1 ? 'none' : 'block' // Oculta el botón si es la última imagen
                                    }}
                                    onClick={handleNextImage}
                                >
                                    <img src="../../../public/img/next.svg" alt="" />
                                </button>
                                <Typography style={{
                                    color: '#fff', position: 'absolute', top: '10.625rem'
                                }}>
                                    {currentFraction}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={handleCloseModal} style={{ marginTop: '16px' }}>
                                    Cerrar
                                </Button>
                            </Box>
                        </Modal>
                    </Box>
                    {/* End de imagenes */}

                </Box>
            </Box>
        </section >
    )
}

export default MicroView;