import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CategoriesCard from '../Categories/categoriesCard.jsx';
import CustomButton from '../buttonCustom.jsx';
import theme from '../../theme/theme.js';
import getRubro from '../../api/rubrosCategori/getRubro.js'
import { Link } from 'react-router-dom';

const Categories = () => {
  const handleClick = () => {
    // console.log('Click');
  };

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
            {rubro?.map((rubro, index) =>

              <Link
                key={index}
                component="button"
                to={`/microemprendimientos/${rubro.id}`}
                style={{
                  textDecoration: "none"
                }}
              // onClick={() => handleButtonClick(rubro.id)}
              >
                <CategoriesCard
                  imageUrl={`./public/img/rubros/${rubro.id}.png`}
                  altText="Logo de Economia Social."
                  title={rubro.nombre}
                  dividerColor="green.dark"
                />
              </Link>
            )}
          </Box>

          <CustomButton onClick={handleClick}>
            <Link to={'/microemprendimientos'} style={{
              textDecoration: 'none',
              color: 'white'
            }} >
              Ir a categorías
            </Link>
          </CustomButton>
        </Box>

      </Box>

    </ThemeProvider>
  );
};

export default Categories;
