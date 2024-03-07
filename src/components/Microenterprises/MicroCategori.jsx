import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CategoriesCard from '../Categories/categoriesCard.jsx';
import theme from '../../theme/theme.js';

const Categories = () => {
    const handleCategoryClick = (categoryTitle) => {
        // Mostrar el título de la categoría en un prompt
        window.prompt('Categoría seleccionada:', categoryTitle);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: "flex",
                    margin: "auto",
                }}
            >
                <div
                    style={{
                        position: 'absolute', // Posicionamiento absoluto para el fondo
                        width: '100%', // Ancho completo
                        height: '100%', // Altura completa
                        background: '#226516', // Color de fondo
                        clipPath: 'polygon(26% 26%, 64% 44%, 100% 44%, 100% 100%, 0 100%, 0 0)',
                        zIndex: -1, // Fondo detrás de los elementos
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: 800,
                        margin: "auto",
                        paddingBottom: 3,
                        paddingLeft: 2,
                        paddingRight: 2,
                        zIndex: 0, // Elementos delante del fondo
                    }}
                >
                    <Typography
                        variant="h5"
                        color="common.black"
                        fontWeight="bold"
                        sx={{
                            paddingTop: 6
                        }}
                        marginBottom={3}
                    >
                        Categorias
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        [theme.breakpoints.up('sm')]: {
                            gap: "10px",
                        },
                    }} lx={{}}>
                        <Link
                            component="button"
                            to="/microemprendimientos/1"
                        >
                            <CategoriesCard
                                imageUrl="./public/img/eco-social.png"
                                altText="Logo de Economia Social."
                                title="Economía social/Desarrollo local/ Inclusión financiera"
                                dividerColor="green.dark"
                            />
                        </Link>


                        <Link component="button" to="/microemprendimientos/2">

                            <CategoriesCard
                                imageUrl="./public/img/agroecologia.png"
                                altText="Logo de Agroecologia."
                                title="Agroecología/Orgánicos/
  Alimentación saludable"
                                dividerColor="green.dark"
                                link="#"
                            />
                        </Link>

                        <Link component="button" to="/microemprendimientos/3">
                            <CategoriesCard
                                imageUrl="./public/img/conservacion.png"
                                altText="Logo de Conservación."
                                title="Conservación/Regeneración/
  Servicios ecosistémicos"
                                dividerColor="green.dark"
                                link="#"
                            />

                        </Link>


                        <Link component="button" to="/microemprendimientos/4">
                            <CategoriesCard
                                imageUrl="./public/img/empresas.png"
                                altText="Logo de Empresas."
                                title="Empresas/Organismos de impacto/Economía circular"
                                dividerColor="green.dark"
                            />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Categories;
