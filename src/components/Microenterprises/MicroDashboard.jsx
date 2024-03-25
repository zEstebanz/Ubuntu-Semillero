import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Divider, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

function Micro() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const data = [
        { title: 'EcoSenda', imageUrl: '../../../public/img/menu-edit.svg', linkTo: '/dashboard-micro/form-edit', subtitle: 'Agroecología/Orgánicos/Alimentación saludable' },
        { title: 'Lorem ipsu', imageUrl: '../../../public/img/menu-edit.svg', linkTo: '/dashboard-micro/form-edit', subtitle: 'Economía social/Desarrollo local/Inclusión financiera' },
    ];

    return (

        <section>
            <Grid container justifyContent="center">
                {data.map((item, index) => (
                    <Card sx={{
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
                                {item.title}
                                <button onClick={handleClick}>
                                    <img src="../../../public/img/menu-edit.svg" alt="menu" />
                                </button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/dashboard-micro/form-edit" style={{
                                            textDecoration: 'none',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#090909'
                                        }}>Editar</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
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
                                    {item.subtitle}
                                </Typography>
                                <div style={{
                                    width: '7.41px',
                                    height: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingTop: '16px'
                                }}>
                                    <img src="../../../public/img/right.svg" alt="right" />
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
