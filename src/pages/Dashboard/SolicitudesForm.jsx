import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { TextField, Grid, Typography, Box, styled, MenuItem, FormControl, InputLabel, Select, Tab, Tabs } from "@mui/material";
import updateGestionado from "../../api/message/updateGestionado";
import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material/styles';
import CustomModal from "../../components/modalCustom";

const Subtitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitles,
  }));
  
  const Formulario = () => {
    const location = useLocation();
    const message = location.state.message;
    const [gestionado, setGestionado] = useState(message.gestionado);
    const [estadoGestion, setEstadoGestion] = useState(gestionado ? "Gestionado" : "No Gestionado");
    const [modalOpen, setModalOpen] = useState(false); 
  
    const handleChangeEstadoGestion = async (event) => {
      const newValue = event.target.value;
      await updateGestionado(message.id, newValue === "Gestionado");
      setGestionado(newValue === "Gestionado");
      setEstadoGestion(newValue);
      setModalOpen(true); 
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    const theme = useTheme();
  
    return (
      <div>
        <CustomModal 
          open={modalOpen}
          onClose={handleCloseModal}
          title="Estado modificado con éxito"
          buttons={[
            { text: "Aceptar", onClick: handleCloseModal },
          ]}
          icon="check" 
        />
        <Box margin={2} padding={2}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              margin={2}>
              Solicitudes de Contacto
            </Typography>
          </Box>
  
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderColor: 'divider',
              width: "100%",
              borderBottom: '1px solid black',
              marginBottom: 5,
            }}
          >
            <Tabs
              value={gestionado ? 1 : 0}
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                  height: 3,
                  marginLeft: 0,
                  borderRadius: 0,
                },
              }}
            >
              <Tab label={<Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'none' }}>No Gestionadas</Typography>} />
              <Tab label={<Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'none' }}>Gestionadas</Typography>} />
            </Tabs>
          </Box>

          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}>
            <CircleIcon sx={{ color: gestionado ? '#008000' : 'orange', marginRight: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: "1.2rem" }}>{gestionado ? "Gestionada" : "No gestionada"}</Typography>
          </Box>
  
          <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 3,
            marginBottom: 3,
          }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gestionado ? "Gestionado" : "No Gestionado"}
                label="Estado de Gestión"
                onChange={handleChangeEstadoGestion}
              >
                <MenuItem value={"Gestionado"}>Gestionada</MenuItem>
                <MenuItem value={"No Gestionado"}>No Gestionada</MenuItem>
              </Select>
            </FormControl>
          </Box>
  
          
  
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center"
          }}>
            <Subtitle
              variant="h4"
              color='primary.main'
              sx={{
                fontWeight: 600,

                marginBottom: 2,
              }}
            >
              {message.microemprendimiento.nombre}
            </Subtitle>
            <Typography sx={{
              marginBottom: 2,
            }}>Fecha de Gestion: {message.fechaCreacion}</Typography>
          </Box>
  
          <Box>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField id="apellidoYNombre" label="Nombre y Apellido" value={message.apellidoYNombre} variant="outlined" fullWidth InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="email" label="Correo Electronico" value={message.email} variant="outlined" fullWidth InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="telefono" label="Teléfono" value={message.telefono} variant="outlined" fullWidth InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="texto"
                    label="Texto"
                    value={message.texto}
                    variant="outlined"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    multiline
                    minRows={1}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </div>
    );
  };
  
  export default Formulario;