import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomButton from '../buttonCustom';
import { Link } from 'react-router-dom'; 

function PageNotFound() {
  return (
<Box sx={{display: "flex", flexDirection: "column", maxWidth: "500px", margin: "auto", textAlign: "center",pl: 10, pr: 10, mt: 10}}>
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: "rgb(6, 42, 62)", mb: 1 }}>
        404
      </Typography>
      <Typography variant="1"  gutterBottom sx={{mb: 3}}>
      Lo sentimos, la página que estás buscando no existe. Por favor, verifica la URL o intenta volver a la página principal.      </Typography>
      <Box>
      <Link to="/">
          <CustomButton  color="primary" sx={{width: "auto"}}>
            Ir a la página principal
          </CustomButton>
        </Link>
    </Box>
    </Box>
    
  );
}

export default PageNotFound;
