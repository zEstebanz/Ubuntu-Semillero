import React from 'react'
import { Box, Typography } from '@mui/material'
import CustomButton from "../../components/buttonCustom";
import MicroList from '../../components/Microenterprises/MicroList';
import { Outlet, useLocation, Link } from 'react-router-dom'; // Importar useLocation


function DashboardMicro() {

  const { pathname } = useLocation();

  return (
    <section>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 5,
          px: 2,
          mx: 'auto',
        }}
        maxWidth='sm'
      >

        <div>

          {pathname !== '/dashboard-micro/form' && (

            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: '1.75rem',
                  textAlign: 'center',
                  fontWeight: 500
                }}
              >
                Microemprendimientos
              </Typography>

              <Link to={"/dashboard-micro/form"}>
                <CustomButton
                  fullWidth
                  sx={{
                    my: 5,
                  }}
                >
                  Cargar Microemprendimiento
                </CustomButton>
              </Link>

              <Typography
                variant="h3"
                sx={{
                  fontSize: '1.375rem',
                  textAlign: 'center',
                  fontWeight: 600
                }}
              >
                Publicaciones cargadas
              </Typography>

              {/* Aca deberia llamar a las publicaciones */}
              <MicroList busqueda={""} />
            </Box>
          )}
        </div>

        <section>
          <Outlet />
        </section>
      </Box>
    </section>
  )
}

export default DashboardMicro