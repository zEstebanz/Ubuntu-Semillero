import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, styled, TextField, Select, MenuItem } from '@mui/material';
import CustomButton from "../../components/buttonCustom";
import upload from "../../../public/img/upload.svg";
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../utils/helpers/localStorage';
import { useSession } from '../../hooks/useSession';
import getRubros from '../../api/rubrosCategori/getRubro';

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
    console.log(res.data.body)
    return res.data.body;
}

function MicroView() {

    const { id } = useParams();

    const [micro, setMicro] = useState([]);

    useEffect(() => {
        getMicroByID(id).then(data => {
            setMicro(data); // Actualiza el estado con los datos obtenidos de la API
        }).catch(error => {
            console.error('Error al obtener microemprendimiento:', error);
        });
    }, [id]);

    return (
        <section>
            {micro && (

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
                            {micro.nombre}
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
                            categoria
                        </Typography>

                        {/* Sub-Categoría */}
                        <Typography>
                            {micro.nombre}
                        </Typography>
                        
                        <Input
                            type="text"
                            required
                            id="title"
                            label={micro.subcategoria}
                            fullWidth
                            sx={{
                                mt: 3,
                            }}
                        />

                        {/* País */}
                        <Input
                            type="text"
                            required
                            id="title"
                            label="Pais"
                            fullWidth
                            sx={{
                                mt: 3,
                            }}
                        />

                        {/* Provincia */}
                        <Input
                            type="text"
                            required
                            id="title"
                            label="Pais"
                            fullWidth
                            sx={{
                                mt: 3,
                            }}
                        />

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
                                {/* aca las imagenes */}
                            </Box>
                        </Box>
                    </Box>
                </Box>

            )}
        </section >
    )
}

export default MicroView;