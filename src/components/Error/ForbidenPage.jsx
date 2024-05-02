import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomButton from '../buttonCustom';
import { Link } from 'react-router-dom'; 

const ForbiddenPage = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", maxWidth: "500px", margin: "auto", textAlign: "center",pl: 10, pr: 10, mt: 10}}>
                <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: "rgb(6, 42, 62)", mb: 1 }}>
                403
              </Typography>
              <Typography variant="1"  gutterBottom sx={{mb: 3}}>
              Lo sentimos, no tienes permiso para acceder a esta página. Por favor, verificá tus credenciales e intentá nuevamente.      </Typography>
              <Box>
              <Link to="/login">
                  <CustomButton  color="primary" sx={{width: "auto", mr: 2}}>
                    Iniciar Sesión
                  </CustomButton>
                </Link>
                <Link to="/">
                  <CustomButton  color="primary" sx={{width: "auto"}}>
                    Ir a la página principal
                  </CustomButton>
                </Link>
            </Box>
            </Box>
            
          );
        }

export default ForbiddenPage;