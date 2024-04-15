import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Modal } from '@mui/material';
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

    const handleSearchIconClick = (image) => {
        setModalImage(image);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

   

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
                        disabled
                        InputLabelProps={{
                            shrink: true,
                            sx: { color: '#0000FF' },
                        }}
                        InputProps={{
                            style: { marginBottom: '8px' }, // Agrega un margen inferior
                        }}
                    />

                    <TextField
                        value={pais.nombre}
                        label="País"
                        fullWidth
                        sx={{ mt: 3 }}
                        disabled
                        InputLabelProps={{
                            shrink: true,
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
                        disabled
                    />

                    {/* Descripción del Microemprendimiento */}
                    <TextField
                        value={descripcion}
                        label="Descripción del Microemprendimiento"
                        fullWidth
                        sx={{ mt: 3 }}
                        multiline
                        disabled
                    />

                    {/* Más información del Microemprendimiento */}
                    <TextField
                        value={info}
                        label="Más información del Microemprendimiento"
                        fullWidth
                        sx={{ mt: 3 }}
                        multiline
                        disabled
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
                                    width: '80%',
                                    maxWidth: '800px',
                                    bgcolor: 'background.paper',
                                    borderRadius: '4px',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <img src={modalImage} style={{ width: '100%' }} alt="Modal Image" />
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
