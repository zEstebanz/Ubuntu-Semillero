import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, CardMedia, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function PostCardAdmin({ title, description, date, images }) {
    const [expanded, setExpanded] = useState(false);
    const descriptionLimit = 100;
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const obtenerMicro = async () => {
            try {
                const microData = await getPostEdit();

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

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

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
                                <Link to={"/dashboard-micro/form-edit/"} style={{
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
                        <div style={{ marginTop: "0.8rem" }}>
                            <button>Editar</button>
                            <button onClick={toggleSubMenu}>Ocultar</button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Grid>

    );
}

export default PostCardAdmin;
