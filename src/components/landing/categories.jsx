import React from 'react';
import { Typography, Button, Box, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CategoriesCard from '../Categories/categoriesCard.jsx';
import CustomButton from '../buttonCustom.jsx';
import theme from '../../theme/theme.js';

const Categories = () => {
  const handleClick = () => {
    console.log('Click');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 800,
        margin: "auto",
        paddingBottom: 3,
        paddingLeft: 2,
        paddingRight: 2

      }}>
        <Typography
          variant="h7"
          color="common.black"
          marginBottom={.5}
          fontWeight="600">
          Microemprendimientos Ubuntu
        </Typography>
        <Typography
          variant="h5"
          color="common.black"
          fontWeight="bold"
          marginBottom={3}>
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

        <CategoriesCard
          imageUrl="./public/img/eco-social.png"
          altText="Logo de Economia Social."
          title="Economía social/Desarrollo local/ Inclusión financiera"
          dividerColor="green.dark"
          link="#"
        />

        <CategoriesCard
          imageUrl="./public/img/agroecologia.png"
          altText="Logo de Agroecologia."
          title="Agroecología/Orgánicos/
  Alimentación saludable"
          dividerColor="green.dark"
          link="#"
        />

        <CategoriesCard
          imageUrl="./public/img/conservacion.png"
          altText="Logo de Conservación."
          title="Conservación/Regeneración/
  Servicios ecosistémicos"
          dividerColor="green.dark"
          link="#"
        />

        <CategoriesCard
          imageUrl="./public/img/empresas.png"
          altText="Logo de Empresas."
          title="Empresas/Organismos de impacto/Economía circular"
          dividerColor="green.dark"
          link="#"
        />
</Box>
        <CustomButton onClick={handleClick}>
          Ver más categorías
        </CustomButton>
      </Box>
    </ThemeProvider>
  );
};

export default Categories;
