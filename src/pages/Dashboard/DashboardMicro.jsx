import React from 'react'
import { Box, Typography } from '@mui/material'
import CustomButton from "../../components/buttonCustom";
import Micro from '../../components/Microenterprises/MicroDashboard';
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

              {/* Carga */}
              <Link to={"/dashboard-micro/form"}>
                <CustomButton
                  fullWidth
                  sx={{
                    my: '32px',
                  }}
                >
                  Cargar Microemprendimiento
                </CustomButton>
              </Link>
              {/* Aca deberia llamar a las publicaciones */}
              <div style={{marginTop: '16px'}}>
                <Micro busqueda={""} />
              </div>
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