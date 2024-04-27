import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CustomButton from '../buttonCustom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import getInversion from '../../api/inversiones/getInversion'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { getAccessToken } from '../../utils/helpers/localStorage';
import CircleIcon from '@mui/icons-material/Circle';
import CustomModal from '../modalCustom';

const InversionesGestor = ({ idMicro }) => {
    const { nombre, id } = useParams();
    const { session } = useSession();
    const [inversiones, setInversiones] = useState([]); 
    const [anchorEl, setAnchorEl] = useState(null);
    const [inversion, setInversion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inactivo, setInactivo] = useState(true); 
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('success');
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ubuntuApi.get(`/gestionInversion/admin/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + getAccessToken(),
                    },
                });

                console.log('Data received:', res.data);
                setInversion(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [idMicro]);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleActivarDesactivarClick = async () => {
        try {
            const updatedInactivo = !inactivo;
            console.log('Updated Inactivo:', updatedInactivo);

            const res = await ubuntuApi.put(`/gestionInversion/admin/edit`, { ...inversion, inactivo: updatedInactivo }, {
                headers: {
                    Authorization: 'Bearer ' + getAccessToken(),
                },
            });
            console.log('Response from Backend:', res.data);

            setInversion({ ...inversion, inactivo: updatedInactivo });

            // Abrir modal de éxito
            const modalMessage = updatedInactivo ?  'Gestionador desactivado con éxito.' : 'Gestionador activado con éxito.';
        setModalType('success');
        setModalOpen(true);
        setModalMessage(modalMessage);
        } catch (error) {
            console.error('Error saving changes to the database:', error);

            // Abrir modal de error
            setModalType('error');
            setModalOpen(true);
        }
    };

    
    // Effect to update the 'inactivo' state based on the 'inversion' state
    useEffect(() => {
        if (inversion) {
            setInactivo(inversion.inactivo);
        }
    }, [inversion]);
    

    const TitleSmall = ({ text }) => (
        <Typography
            variant="1"
            gutterBottom
            sx={{
                fontFamily: 'Lato',
                lineHeight: '25px',
                letterSpacing: '0px',
            }}
        >
            {text}
        </Typography>
    );

    const Subtitle1 = ({ text }) => (
        <Typography
            variant="h5"
            gutterBottom
            sx={{
                fontFamily: 'Lato',
                color: "#093C59",
                lineHeight: '25px',
                letterSpacing: '0px',
                fontSize: "16px",
            }}
        >
            {text}
        </Typography>
    );

    const Subtitle = ({ text, nivelRiesgo }) => {
        let color = '';
        if (nivelRiesgo === 'BAJO') {
            color = '#1D9129';
        } else if (nivelRiesgo === 'MEDIO') {
            color = '#B86B11';
        } else if (nivelRiesgo === 'ALTO') {
            color = '#BC1111';
        }
    
        return (
            <Typography
                variant="h6"
                gutterBottom
                color={color || "primary"} // Default color if not matched
                sx={{
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontWeight: 700,
                    lineHeight: '25px',
                    letterSpacing: '0px',
                    mb: 2,
                }}
            >
                {text} {nivelRiesgo} {/* Concatenate text and nivelRiesgo */}
            </Typography>
        );
    };
    

    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    

    return (
        <Box m={2} p={2} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
            <Typography
                variant="h3"
                sx={{
                    fontSize: '1.75rem',
                    textAlign: 'center',
                    fontWeight: 500
                }}
            >
                Gestor de Inversiones
            </Typography>

            <Typography
                variant="h6"
                gutterBottom
                color="primary"
                sx={{
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontWeight: 700,
                    lineHeight: '25px',
                    letterSpacing: '0px',
                    textAlign: 'center',
                    m: 2,
                }}
            >
                {nombre}
            </Typography>
            <Divider
    sx={{
      backgroundColor: '#226516',
      width: "80%",
      margin: "0 auto",
      height: '1px', // Ajusta el grosor del Divider según tus necesidades
    }}
  />
            {!inversion && (
                <Link to={`/inversiones/crear/${nombre}/${id}`}>
                    <CustomButton
                        fullWidth
                        sx={{
                            my: 2,
                        }}
                    >
                        Generar Gestionador de Inversiones
                    </CustomButton>
                </Link>
            )}

            {inversion && (
                <Card sx={{ marginTop: 2, boxShadow: "none" }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ marginRight: 1 }}>
                                <CircleIcon sx={{ color: inactivo ? '#B86B11' : '#1D9129' }} />
                            </Box>
                            <Typography
                                variant="h6"
                                gutterBottom
                                color="primary"
                                sx={{
                                    fontFamily: 'Lato',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    lineHeight: '25px',
                                    letterSpacing: '0px',
                                    textAlign: 'center',
                                    
                                }}
                            >
                                Gestionador de Inversion
                            </Typography>
                            <IconButton
                                aria-label="Opciones"
                                aria-controls="menu"
                                aria-haspopup="true"
                                onClick={handleMenuClick}
                                sx={{ marginLeft: 'auto' }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to={`/inversiones/editar/${nombre}/${id}`}>Editar</MenuItem>
                                <MenuItem onClick={handleActivarDesactivarClick}>{inactivo ? 'Activar' : 'Desactivar'}</MenuItem>
                            </Menu>
                        </Box>

                        <Divider
    sx={{
      backgroundColor: '#226516',
      margin: "0 auto",
      height: '.5px',
      mb: 2 // Ajusta el grosor del Divider según tus necesidades
    }}
  />



                        <Box sx={{ textAlign: "left" }}>

                            <TitleSmall text="Minimo:" />
                            <Subtitle text={`$${formatAmount(inversion.min)}`} />

                            <TitleSmall text="Máximo:" />
                            <Subtitle text={`$${formatAmount(inversion.max)}`} />

                            <TitleSmall text="Costo de Gestion:" />
                            <Subtitle text={`$${formatAmount(inversion.costosGestion)}`} />

                            <TitleSmall text="Cuotas (Máximo):" />
                            <Subtitle text={inversion.cuotas} /> 

                            <TitleSmall text="Nivel de Riesgo:" />
                            <Subtitle text="" nivelRiesgo={inversion.nivelRiesgo} />

                            <TitleSmall text="Tasa de Retorno:" />
                            <Subtitle text={`x${inversion.tasaRetorno}`} />

                            <TitleSmall text="Nota Adicional:" />
                            <Subtitle1 text={inversion.notasAdicionales} />
                        </Box>
                    </CardContent>
                </Card>
            )}



<Box>
<CustomModal
  open={modalOpen && (modalType === 'success' || modalType === 'error')}
  onClose={() => setModalOpen(false)}
  title={modalType === 'success' ? modalMessage : 'No se pudo desactivar el gestionador.'}
  buttons={[{ text: 'Aceptar', onClick: () => setModalOpen(false) }]}
  icon={modalType === 'success' ? 'check' : 'error'}
/>

<CustomModal
  open={modalOpen && modalType === 'error'}
  onClose={() => setModalOpen(false)}
  title={modalType === 'success' ? modalMessage : 'No se pudo desactivar el gestionador.'}
  message={modalType === 'error' ? modalMessage : 'Intentar nuevamente'}
  buttons={[
    { text: 'Cerrar', onClick: () => setModalOpen(false) },
    {
      text: 'Intentar nuevamente',
      onClick: () => {
        setModalOpen(false);
        formik.handleSubmit();
      }
    }
  ]}
  icon="error"
/>

</Box>

        </Box>



    );

    
};

export default InversionesGestor;
