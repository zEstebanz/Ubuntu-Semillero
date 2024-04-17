import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, CardMedia, Menu, MenuItem, Box, Snackbar, SnackbarContent  } from "@mui/material";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ubuntuApi } from "../../utils/services/axiosConfig";
import { getAccessToken } from "../../utils/helpers/localStorage";
import getPostEdit from "../../api/publications/getPostEdit";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const hideId = async (id) => {
    const res = ubuntuApi.get(`publicaciones/admin/findById/${id}`, null, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        }
    })
}

function PostCardAdmin({ title, description, date, images, id }) {
    const [expanded, setExpanded] = useState(false);
    const descriptionLimit = 100;
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [reload, setReload] = useState(false);
    const [post, setPost] = useState();

    const [successMessageOpen, setSuccessMessageOpen] = useState(false);

    useEffect(() => {
        const obtenerPost = async () => {
            try {
                const postEditData = await getPostEdit();

                setPost(postEditData.body);

                console.log(postEditData)
            } catch (error) {
                console.error('Error al editar:', error);
            }
        };

        obtenerPost();
    }, [reload]);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (itemId) => {
        hideId(itemId)
        setReload(!reload)
        setAnchorEl(null);
    };

    const handleHideClick = (itemId) => {
        setSnackbarOpen(true);
        handleClose(itemId);
        setSuccessMessageOpen(true);
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    const handleCloseSuccessMessage = () => {
        setSuccessMessageOpen(false);
    }

    const renderSwiper = () => {
        if (images.length > 1) {
            return (
                <div style={{ position: "relative" }}>
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="swiper"
                    >
                        {images.map((imageUrl, index) => (
                            <SwiperSlide key={index} className="swiper-slide">
                                <CardMedia component="img" height="128" width="304" image={imageUrl} alt={title} sx={{ borderRadius: "16px" }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            );
        } else if (images.length === 1) {
            return (
                <CardMedia component="img" height="128" width="304" image={images[0]} alt={title} sx={{ borderRadius: "16px" }} />
            );
        } else {
            return null;  //No hay imágenes disponibles
        }
    };

    return (
        <Grid container justifyContent="center" paddingTop={"16px"}>
            <Card
                // className="post-card"
                sx={{
                    width: "328px",
                    height: 'fit-content',
                    borderRadius: "16px",
                    gap: "16px"
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        paddingBottom: "0.8rem !important",
                    }}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Typography
                            variant="subtitles"
                            fontWeight={600}
                            component="div"
                            gutterBottom
                            alignSelf="center"
                            marginBottom={2.5}
                            fontSize={'18px'}
                        >
                            {title}
                        </Typography>
                        <button onClick={handleClick}
                            style={{
                                marginRight: "16px",
                                marginBottom: "16px",
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
                                <Link to={"/dashboard-publications/form-edit/" + id} style={{
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    color: '#090909'
                                }}>Editar</Link>
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleClose(id)}
                            >
                                <Link to="#" style={{
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    color: '#090909'
                                }}>Ocultar</Link>
                            </MenuItem>
                        </Menu>

                    </div>

                    {renderSwiper()}

                    <Typography
                        variant="body2"
                        fontWeight={600}
                        marginTop="1.8rem"
                        marginBottom={0.6}
                        color="common.black"
                        fontSize={'14px'}
                    >
                        {date}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        color="common.black"
                        className={expanded ? "expanded" : "collapsed"}
                        fontSize={'16px'}
                    >
                        {expanded ? description : description.slice(0, descriptionLimit) + (description.length > descriptionLimit ? '...' : '')}
                    </Typography>
                    <Button
                        variant="text"
                        sx={{
                            textTransform: "none",
                            alignSelf: "center",
                            marginTop: "0.8rem",
                        }}
                        onClick={toggleExpand}
                    >
                        <Typography variant="body2" fontWeight={600} color="principal" fontSize={'16px'}>
                            {expanded ? "Ver menos" : "Ver más"}
                        </Typography>
                    </Button>

                    {showSubMenu && (

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to={"/dashboard-publications/form-edit/" + id} style={{
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
                    )}
                </CardContent>

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
                                        margin: '0px 0px 16px 0px',
                                        width: '328px'
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
                                            Publicación ocultada con éxito
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
            </Card>
        </Grid>

    );
}

export default PostCardAdmin;
