import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material'
import getRubros from '../../api/rubros/getRubrosStatistics'
import getMicroStatistics from '../../api/rubros/getMicroStatistics';

function DashboardAdmin() {

  const [rubros, setRubros] = useState([]);
  const [micro, setMicro] = useState([]);

  useEffect(() => {
    const obtenerRubros = async () => {
      try {
        const rubrosData = await getRubros();
        const microData = await getMicroStatistics();

        setRubros(rubrosData);
        setMicro(microData.body);

        console.log(microData.body)

      } catch (error) {
        console.error('Error al obtener los rubros:', error);
      }
    };

    obtenerRubros();
  }, []);

  return (
    <main>

      {/* Estadisticas */}
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
      </section>

      <section>
        <div style={{
          width: '328px',
          maxHeight: '64px',
          backgroundColor: '#093C59',
          margin: 'auto',
          borderRadius: '8px',
          padding: '8px 16px'
        }}>

          <div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '288px',
                height: '56px',
              }}
            >

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#FDFDFE',
                  lineHeight: '25px'
                }}
              >
                Nuevos Microemprendimientos
              </Typography>


              <div
                style={{
                  with: '21px',
                  height: '25px',
                }}
              >
                {micro.map((item, index) => (
                  <div key={index}>
                    <Typography
                      key={index}
                      sx={{
                        color: '#fff',
                        fontSize: '22px',
                        fontWeight: 700,
                        paddingTop: '16px',
                      }}
                    >
                      {item.total}
                    </Typography>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </section>

      <section style={{ marginTop: '16px' }}>
        <div style={{ width: '328px', margin: 'auto', borderRadius: '8px', }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            {/* Primer div */}
            <div style={{ width: '152px', minHeight: '72px', border: '2px solid #1D9129', borderRadius: '8px' }}>
              <div style={{ padding: '8px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 400, color: '#090909' }}>
                  Gestionados
                </Typography>
                <Divider sx={{ width: '48px', border: '1px solid #1D9129' }} />
                {micro.map((item, index) => (
                  <Typography key={index} sx={{ color: '#090909', fontSize: '20px', fontWeight: 700 }}>
                    {item.gestionadas}
                  </Typography>
                ))}
              </div>
            </div>

            {/* Segundo div */}
            <div style={{ width: '152px', minHeight: '72px', border: '2px solid #B86B11', borderRadius: '8px', marginLeft: '16px' }}>
              <div style={{ padding: '8px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 400, color: '#090909' }}>
                  No gestionados
                </Typography>
                <Divider sx={{ width: '48px', border: '1px solid #B86B11' }} />
                {micro.map((item, index) => (
                  <Typography key={index} sx={{ color: '#090909', fontSize: '20px', fontWeight: 700 }}>
                    {item.noGestionadas}
                  </Typography>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Estadisticas */}

      {/* Micro por Categoria */}
      <section style={{ marginTop: '32px' }}>
        <div style={{
          width: '328px',
          height: 'auto',
          backgroundColor: '#EAEAEA',
          margin: 'auto',
          borderRadius: '8px',
          padding: '8px 16px'
        }}>

          <div>
            <Typography
              variant="h3"
              color='primary'
              sx={{
                fontSize: '1.25rem',
                textAlign: 'center',
                fontWeight: 600,
                lineHeight: '35px',
                paddingY: '8px',
                lineHeight: '25px'
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
                margin: '0',
              }}
            />
          </div>

          <div
            style={{
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            {/* Verificar si rubros está vacío */}
            {rubros.length === 0 ? (
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  textAlign: 'center'
                }}
              >
                Cargando categorías...
              </Typography>
            ) : (
              // Renderizar los rubros si no está vacío
              rubros
                .sort((a, b) => a.id - b.id)
                .map(rubro => (
                  <div key={rubro.id}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '288px',
                        height: '56px',
                      }}
                    >
                      <div style={{
                        width: '235px'
                      }}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            height: '50px',
                            fontWeight: 400
                          }}
                        >
                          {rubro.nombre}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          width: '50px',
                          height: '100%',
                          paddingRight: '16px',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '1.125rem',
                            fontWeight: 700,
                          }}
                        >
                          {rubro.cantidadMicroemprendimientos}
                        </Typography>
                      </div>
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
                ))
            )}
            {/* End Micro. por categoría */}

          </div>

        </div>
      </section>
      {/* End Micro por Categoria */}

      {/* Visualizaciones por Publicacion */}
      <section
        style={{
          paddingTop: '32px'
        }}
      >

        <Typography
          variant="h3"
          color='black'
          sx={{
            fontSize: '1.25rem',
            textAlign: 'center',
            fontWeight: 600,
            lineHeight: '35px',
            paddingBottom: '23px'
          }}
        >
          Visualizaciones por Publicación
        </Typography>

        <div style={{
          width: '328px',
          minHeight: '80px',
          backgroundColor: '#EAEAEA',
          margin: 'auto',
          borderRadius: '8px',
          border: '1px solid #093C59',
          padding: '8px 16px'
        }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >

            <div style={{
              width: '231px',
              height: '64px',
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
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  paddingTop: '8px'
                }}
              >
                17/04/2023
              </Typography>
            </div>

            <div
              style={{
                width: '64px',
                height: '24px',
                marginTop: '16px'
              }}
            >
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

          </div>
        </div>

      </section>
      {/* End Visualizaciones por Publicacion */}

      <section style={{ marginTop: '250px' }}>

      </section>

    </main >
  )
}

export default DashboardAdmin