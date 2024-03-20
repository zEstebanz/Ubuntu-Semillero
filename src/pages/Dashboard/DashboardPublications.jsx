import React from 'react'
import { Box, Typography } from '@mui/material'
import CustomButton from "../../components/buttonCustom";
import PublicacionList from '../../components/Publications/PublicationList';
import { Outlet, useLocation, Link } from 'react-router-dom'; // Importar useLocation


function DashboardPublications() {

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

          {pathname !== '/dashboard-publications/form' && (

            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: '1.75rem',
                  textAlign: 'center',
                  fontWeight: 500
                }}
              >
                Publicaciones
              </Typography>

              <Link to={"/dashboard-publications/form"}>
                <CustomButton
                  fullWidth
                  sx={{
                    my: 5,
                  }}
                >
                  Crear Publicación
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
              <PublicacionList busqueda={""} />
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

export default DashboardPublications