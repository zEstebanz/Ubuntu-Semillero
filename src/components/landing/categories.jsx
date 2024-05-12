import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CategoriesCard from '../Categories/categoriesCard.jsx';
import CustomButton from '../buttonCustom.jsx';
import theme from '../../theme/theme.js';
import { Link } from 'react-router-dom';

const Categories = () => {
  const handleClick = () => {
    // console.log('Click');
  };

  // Datos hardcodeados de categorías
  const hardcodedCategorias = [
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

  const [rubro, setRubro] = useState(hardcodedCategorias);

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
            {rubro?.length > 0 ? (
              rubro.map((categoria, index) => (
                <Link
                  key={index}
                  component="button"
                  to={`/microemprendimientos/${categoria.id}`}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <CategoriesCard
                    imageUrl={`./public/img/rubros/${categoria.id}.png`}
                    altText="Logo de Economia Social."
                    title={categoria.nombre}
                    dividerColor="green.dark"
                  />
                </Link>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No hay categorías por el momento...
              </Typography>
            )}
          </Box>

          {/* Renderizar el botón solo si hay categorías disponibles */}
          {rubro && rubro.length > 0 && (
            <CustomButton onClick={handleClick}>
              <Link to={'/microemprendimientos'} style={{
                textDecoration: 'none',
                color: 'white'
              }} >
                Ir a categorías
              </Link>
            </CustomButton>
          )}
         
        </Box>

      </Box>

    </ThemeProvider>
  );
};

export default Categories;