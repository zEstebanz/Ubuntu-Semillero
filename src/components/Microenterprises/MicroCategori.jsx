import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CategoriesCard from '../Categories/categoriesCard.jsx';
import theme from '../../theme/theme.js';

// Categorías anteriores hardcodeadas
const hardcodedCategories = [
  {
    "id": 1,
    "nombre": "Economía social/Desarrollo local/Inclusión financiera"
  },
  {
    "id": 2,
    "nombre": "Agroecología/Orgánicos/Alimentación saludable"
  },
  {
    "id": 3,
    "nombre": "Conservación/Regeneración/Servicios ecosistémicos"
  },
  {
    "id": 4,
    "nombre": "Empresas/Organismos de impacto/Economía circular"
  }
];

const Categories = () => {
    const [rubro, setRubro] = useState([]);

    useEffect(() => {
        // Simulación de obtención de categorías
        setRubro(hardcodedCategories);
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
                            rubro.map((category, index) =>
                                <Link
                                    key={index}
                                    component="button"
                                    to={`/microemprendimientos/${category.id}`}
                                    style={{
                                        textDecoration: "none"
                                    }}
                                >
                                    <CategoriesCard
                                        imageUrl={`./public/img/rubros/${category.id}.png`}
                                        altText="Logo de Economia Social."
                                        title={category.nombre}
                                        dividerColor="green.dark"
                                    />
                                </Link>
                            )
                        ) : (
                            <Typography
                                variant="subtitle1"
                                fontWeight={400}
                                gutterBottom
                                alignSelf="center"
                                marginBottom={2.5}
                                fontSize={"18px"}
                                sx={{
                                    textAlign: "center",
                                    display: "block",
                                    paddingY: "50px",
                                    color: '#093C59',
                                    backgroundColor: '#FDFDFE',
                                    paddingX: '20px',
                                    borderRadius: '28px',
                                    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.5)',
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
