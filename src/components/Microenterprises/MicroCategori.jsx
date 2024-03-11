import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CategoriesCard from '../Categories/categoriesCard.jsx';
import theme from '../../theme/theme.js';

const Categories = () => {

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
                        zIndex: 0,
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
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            <CategoriesCard
                                imageUrl="./public/img/eco-social.png"
                                altText="Logo de Economia Social."
                                title="Economía social/Desarrollo local/ Inclusión financiera"
                                dividerColor="green.dark"
                            />
                        </Link>


                        <Link
                            component="button"
                            to="/microemprendimientos/2"
                            style={{
                                textDecoration: "none"
                            }}
                        >

                            <CategoriesCard
                                imageUrl="./public/img/agroecologia.png"
                                altText="Logo de Agroecologia."
                                title="Agroecología/Orgánicos/
  Alimentación saludable"
                                dividerColor="green.dark"
                                link="#"
                            />
                        </Link>

                        <Link
                            component="button"
                            to="/microemprendimientos/3"
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            <CategoriesCard
                                imageUrl="./public/img/conservacion.png"
                                altText="Logo de Conservación."
                                title="Conservación/Regeneración/
  Servicios ecosistémicos"
                                dividerColor="green.dark"
                                link="#"
                            />

                        </Link>


                        <Link
                            component="button"
                            to="/microemprendimientos/4"
                            style={{
                                textDecoration: "none"
                            }}
                        >
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
