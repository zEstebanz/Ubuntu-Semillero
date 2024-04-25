import React, { useState, useEffect, useRef } from 'react';
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

function Micro({ microId }) {

    const [micros, setMicros] = useState([]);
    const [reload, setReload] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const anchorRefs = useRef({});

    useEffect(() => {
        const obtenerMicro = async () => {
            try {
                const microData = await getMicroEdit();
                const initialExpandedMenus = microData.body.reduce((acc, item) => {
                    acc[item.id] = false;
                    return acc;
                }, {});
                setMicros(microData.body);
                setExpandedMenus(initialExpandedMenus);
                console.log("Datos de los micros:", microData.body);
            } catch (error) {
                console.error('Error al obtener los rubros:', error);
            }
        };
        obtenerMicro();
    }, [reload]);

    const handleClick = (itemId) => {
        setExpandedMenus(prevState => ({
            ...prevState,
            [itemId]: true
        }));
    };

    const handleClose = (itemId) => {
        setReload(!reload);
        setExpandedMenus(prevState => ({
            ...prevState,
            [itemId]: false
        }));
    };

    const handleHideClick = (itemId) => {
        hideMicro(itemId);

        setSnackbarOpen(true);
        handleClose(itemId);
    };

    const handleCloseSuccessMessage = () => {
        setSuccessMessageOpen(false);
    };

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
                                <button onClick={() => handleClick(item.id)} ref={el => anchorRefs.current[item.id] = el}
                                    style={{
                                        border: 'none'
                                    }}>
                                    <img src="../../../public/img/menu-edit.svg" alt="menu" />
                                </button>
                                <Menu
                                    anchorEl={anchorRefs.current[item.id]}
                                    open={expandedMenus[item.id]}
                                    onClose={() => handleClose(item.id)}
                                >
                                    <MenuItem onClick={() => handleClose(item.id)}>
                                        <Link to={"/dashboard-micro/form-edit/" + item.id} style={{
                                            textDecoration: 'none',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#090909'
                                        }}>Editar</Link>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleHideClick(item.id)}>
                                        <Link to="#" style={{
                                            textDecoration: 'none',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#090909'
                                        }}>Ocultar</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={`/inversiones/gestionar/${item.nombre}/${item.id}`} style={{
                                            textDecoration: 'none',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#090909'
                                        }}>
                                            Inversiones
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </Typography>
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
                                    <Link to={"/dashboard-micro/view/" + item.id}>
                                        <img src="../../../public/img/right.svg" alt="right" />
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <SnackbarContent
                    message="Publicación ocultada con éxito"
                    action={
                        <Link to="/dashboard-admin" variant="button" style={{ color: '#093C59', fontWeight: 600 }}>
                            Aceptar
                        </Link>
                    }
                />
            </Snackbar>
        </section>
    );
}

export default Micro;