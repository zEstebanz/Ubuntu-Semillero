import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Divider, Box, Menu, MenuItem, Snackbar, SnackbarContent } from '@mui/material';
import { Link } from 'react-router-dom';
import getMicroEdit from '../../api/micros/getMicroEdit';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { getAccessToken } from '../../utils/helpers/localStorage';

const hideMicro = async (id) => {
    const res = ubuntuApi.put(`/microemprendimientos/admin/hide/${id}`, null, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        }
    });
}

function Micro() {

    const [expanded, setExpanded] = useState(false);
    const [micros, setMicros] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [reload, setReload] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);

    useEffect(() => {
        const obtenerMicro = async () => {
            try {
                const microData = await getMicroEdit();

                setMicros(microData.body);

                // console.log(microData)
            } catch (error) {
                console.error('Error al obtener los rubros:', error);
            }
        };

        obtenerMicro();
    }, [reload]);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (itemId) => {
        hideMicro(itemId)
        setReload(!reload)
        setAnchorEl(null);
    };

    const handleHideClick = (itemId) => {
        setSnackbarOpen(true);
        handleClose(itemId);
        setSuccessMessageOpen(true);
    };

    const handleCloseSuccessMessage = () => {
        setSuccessMessageOpen(false);
    }

    return (

        <section>
            <Grid container justifyContent="center">
                {micros.map((item, index) => (
                    <Card key={index} sx={{
                        width: "328px",
                        borderRadius: "16px",
                        marginBottom: '16px'
                    }}>
                        <CardContent>

                            <Typography
                                variant="h6"
                                gutterBottom
                                color="primary"
                                sx={{
                                    fontFamily: 'Lato',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    lineHeight: '25px',
                                    letterSpacing: '0px',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                {item.nombre}
                                <button onClick={handleClick}
                                    style={{
                                        border: 'none'
                                    }}>
                                    <img src="../../../public/img/menu-edit.svg" alt="menu" />
                                </button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link to={"/dashboard-micro/form-edit/" + item.id} style={{
                                            textDecoration: 'none',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#090909'
                                        }}>Editar</Link>
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => handleHideClick(item.id)}
                                    >
                                        <Link to="#" style={{
                                            textDecoration: 'none',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#090909'
                                        }}>Ocultar</Link>
                                    </MenuItem>

                                </Menu>

                            </Typography>

                            {/* Snackbar para mostrar mensaje de éxito */}

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
                                                    margin: '0px 0px 16px 0px'
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
                                                    <Link variant="button" style={{ display: 'block', textDecoration: 'none', fontSize: '14px', color: '#093C59', fontWeight: 600, textAlign: 'end', marginTop: '16px' }} onClick={() => setSuccessMessageOpen(false)}>Aceptar</Link>
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

                            <Divider sx={{
                                border: '1px solid #226516',
                                width: '200px'
                            }} />
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '24px',
                                        marginTop: '8px',
                                        width: 'calc(244px - 16px)',
                                    }}
                                >
                                    {item.rubro.nombre}

                                </Typography>
                                <div style={{
                                    width: '7.41px',
                                    height: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingTop: '16px'
                                }}>
                                    <Link
                                        to={"/dashboard-micro/view/" + item.id}
                                    >
                                        <img src="../../../public/img/right.svg" alt="right" />
                                    </Link>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </section>

    );
}

export default Micro;
