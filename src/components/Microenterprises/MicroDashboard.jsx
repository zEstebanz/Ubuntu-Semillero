import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Divider, Button, Menu, MenuItem } from '@mui/material';
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

    useEffect(() => {
        const obtenerMicro = async () => {
            try {
                const microData = await getMicroEdit();

                setMicros(microData.body);

                console.log(microData)
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
                                <button onClick={handleClick}>
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
                                        onClick={() => handleClose(item.id)}
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
