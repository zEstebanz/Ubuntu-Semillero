import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material'
import getRubros from '../../api/statistics/getRubrosStatistics'
import getMicroStatistics from '../../api/statistics/getMicroStatistics';
import getMesajes from '../../api/statistics/getMesajes';
import getPostView from '../../api/statistics/getPostViews';

function DashboardAdmin() {

  const [rubros, setRubros] = useState([]);
  const [micro, setMicro] = useState([]);
  const [mensaje, setMensaje] = useState([]);
  const [postView, setPostView] = useState([]);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const rubrosData = await getRubros();
        const microData = await getMicroStatistics();
        const mensajeData = await getMesajes();
        const postViewData = await getPostView();

        setRubros(rubrosData);
        setMicro(microData.body);
        setMensaje(mensajeData);
        setPostView(postViewData);

      } catch (error) {
        console.error('Error al obtener las Estadisticas:', error);
      }
    };

    getStatistics();
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
          height: '64px',
          backgroundColor: '#093C59',
          margin: 'auto',
          borderRadius: '8px'
        }}>

          <Box
            sx={{
              width: '225px',
              height: '48px',
              padding: '8px 16px'
            }}
          >

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

              {micro.map((item, index) => (
                <div key={index}>
                  <Typography
                    key={index}
                    sx={{
                      color: '#fff',
                      fontSize: '22px',
                      fontWeight: 700,
                      paddingTop: '8px'
                    }}
                  >
                    {item.total}
                  </Typography>
                </div>
              ))}

            </div>

          </Box>

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

                <Typography sx={{ color: '#090909', fontSize: '20px', fontWeight: 700 }}>
                  {mensaje.cantGestionados}
                </Typography>

              </div>
            </div>

            {/* Segundo div */}
            <div style={{ width: '152px', minHeight: '72px', border: '2px solid #B86B11', borderRadius: '8px', marginLeft: '16px' }}>
              <div style={{ padding: '8px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 400, color: '#090909' }}>
                  No gestionados
                </Typography>
                <Divider sx={{ width: '48px', border: '1px solid #B86B11' }} />
                <Typography sx={{ color: '#090909', fontSize: '20px', fontWeight: 700 }}>
                  {mensaje.cantNoGestionados}
                </Typography>
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

          <Box
            style={{
              borderRadius: '8px',
              padding: '8px 16px'
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
                        alignItems: 'center'
                      }}
                    >

                      <Box style={{
                        height: '50px',
                        width: '235px'
                      }}>

                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 400
                          }}
                        >
                          {rubro.nombre}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          paddingRight: '8px',
                          width: '25px'
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
                      </Box>
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

          </Box>

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

        {postView.map((postView, index) =>
          <div style={{
            width: '328px',
            minHeight: '80px',
            margin: 'auto',
            borderRadius: '8px',
            border: '1px solid #093C59',
            marginBottom: '16px'
          }}>


            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Box style={{
                width: '231px',
                height: '64px',
                padding: '8px 16px'
              }}
              >

                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  {postView.titulo}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  {postView.fechaCreacion}
                </Typography>
              </Box>

              <Box
                style={{
                  width: '64px',
                  height: '24px',
                  paddingRight: '8px',
                  marginTop: '25px'
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 700
                  }}
                >
                  <img src="../../../public/img/view.png" alt="view" width={"22px"} height={"15px"} style={{ marginRight: '8px' }} />
                  {postView.cantVistas}
                </Typography>
              </Box>

            </div>

          </div>
        )}

      </section>
      {/* End Visualizaciones por Publicacion */}

      <section style={{ marginTop: '250px' }}>

      </section>

    </main >
  )
}

export default DashboardAdmin