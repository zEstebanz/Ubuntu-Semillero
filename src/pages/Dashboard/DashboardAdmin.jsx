import React from 'react'
import AdminDashboard from '../../components/Dashboard/AdminDashboard'
import { Box, Divider, Typography } from '@mui/material'

function DashboardAdmin() {
  return (
    <main>

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
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.75rem',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Dashboard Administrador
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.25rem',
              textAlign: 'center',
              fontWeight: 600,
              lineHeight: '35px',
              py: '16px',
            }}
          >
            Estadísticas mensuales
          </Typography>
        </Box>

        <div
          style={{
            width: '328px',
            height: '64px',
            backgroundColor: '#093C59',
            borderRadius: '8px',
            padding: '8px 16px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 700,
              margin: '0',
            }}
          >
            Nuevos Microemprendimientos
          </h2>
          <h3 style={{ margin: '0' }}>100</h3>
        </div>

        <div
          style={{
            width: '328px',
            height: '64px',
            backgroundColor: '#B86B11',
            borderRadius: '8px',
            padding: '8px 16px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 700,
              margin: '0',
            }}
          >
            Gestionados
          </h2>
          <h3 style={{ margin: '0' }}>80</h3>
        </div>

        <div
          style={{
            width: '328px',
            height: '64px',
            backgroundColor: '#1D9129',
            borderRadius: '8px',
            padding: '8px 16px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 700,
              margin: '0',
            }}
          >
            No gestionados
          </h2>
          <h3 style={{ margin: '0' }}>20</h3>
        </div>

      </section>

      {/* End Estadisticas */}

      {/* Micro por Categoria */}
      <section>
        <div
          style={{
            width: '328px',
            minHeight: '353px',
            height: 'auto',
            backgroundColor: '#EAEAEA',
            borderRadius: '8px',
            marginTop: '32px',
            padding: '8px 16px',
            margin: '0 auto',
          }}
        >
          <Typography
            variant="h3"
            color='primary'
            sx={{
              fontSize: '1.25rem',
              textAlign: 'center',
              fontWeight: 600,
              lineHeight: '35px',
              paddingTop: '32px'
            }}
          >
            Microemprendimientos por categoría
          </Typography>

          <Divider
            sx={{
              backgroundColor: '#226516',
              borderColor: '#226516',
              height: '2px',
              width: '100%',
              margin: '0'
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0 auto',
            }}
          >
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 400
              }}
            >
              Economía social/Desarrollo local/ Inclusión financiera
            </Typography>

            <Typography
              sx={{
                fontSize: '1.125rem',
                fontWeight: 700,
                paddingTop: '8px'
              }}
            >
              40
            </Typography>
          </div>
          <Divider
            sx={{
              backgroundColor: '#226516',
              borderColor: '#226516',
              height: '1px',
              width: '100%',
              margin: '0'
            }}
          />
        </div>


      </section>

      {/* Visualizaciones por Publicacion */}
      <section>

        <Typography
          variant="h3"
          color='black'
          sx={{
            fontSize: '1.25rem',
            textAlign: 'center',
            fontWeight: 600,
            lineHeight: '35px',
            paddingTop: '32px',
            paddingBottom: '23px'
          }}
        >
          Visualizaciones por Publicación
        </Typography>

        <div
          style={{
            width: '328px',
            height: '80px',
            margin: '0 auto',
            border: '1px solid #093C59',
            padding: '8px',
            borderRadius: '8px'
          }}
        >

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0 auto',
            }}
          >
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Inversiones Éticas: Más que ganacias
            </Typography>


            <Typography
              color="primary"
              sx={{
                fontSize: '1.125rem',
                fontWeight: 700,
                paddingTop: '8px',
              }}
            >
              <img src="../../../public/img/view.png" alt="view" width={"22px"} height={"15px"} style={{ marginRight: '8px' }} />
              50
            </Typography>
          </div>

          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            17/04/2023
          </Typography>

        </div>


      </section>


    </main>
  )
}

export default DashboardAdmin