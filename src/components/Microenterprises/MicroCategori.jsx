import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CategoriesCard from '../Categories/categoriesCard.jsx';
import theme from '../../theme/theme.js';
import getRubro from '../../api/rubrosCategori/getRubro.js';

const Categories = () => {
    const [rubro, setRubro] = useState([]);

    useEffect(() => {
        const obtenerRubro = async () => {
            try {
                const rubroData = await getRubro();
                setRubro(rubroData);
            } catch (error) {
                console.error('Error al obtener los rubros:', error);
            }
        };

        obtenerRubro();
    }, []);

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
                        Categorías
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        [theme.breakpoints.up('sm')]: {
                            gap: "10px",
                        },
                    }} lx={{}}>
                        {rubro && rubro.length > 0 ? (
                            rubro.map((rubro, index) =>
                                <Link
                                    key={index}
                                    component="button"
                                    to={`/microemprendimientos/${rubro.id}`}
                                    style={{
                                        textDecoration: "none"
                                    }}
                                >
                                    <CategoriesCard
                                        imageUrl={`./public/img/rubros/${rubro.id}.png`}
                                        altText="Logo de Economia Social."
                                        title={rubro.nombre}
                                        dividerColor="green.dark"
                                    />
                                </Link>
                            )
                        ) : (
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                gutterBottom
                                alignSelf="center"
                                marginBottom={2.5}
                                fontSize={"24px"}
                                sx={{
                                    textAlign: "center",
                                    display: "block",
                                    paddingY: "50px",
                                    color: '#FFF',
                                    backgroundColor: '#093C59', // Fondo rojo para resaltar
                                    paddingX: '20px',
                                    borderRadius: '10px', // Bordes redondeados
                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' // Sombra
                                }}
                            >
                                 No hay categorías por el momento...
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Categories;