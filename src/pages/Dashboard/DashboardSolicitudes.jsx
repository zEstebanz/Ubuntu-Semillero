import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Box, Card, CardContent, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getAllMensajes from "../../api/message/getMessage";
import updateGestionado from "../../api/message/updateGestionado";
import { useTheme } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const DashboardSolicitudes = () => {
    const [messages, setMessages] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            const messagesData = await getAllMensajes();
            setMessages(messagesData);
        };

        fetchMessages();
    }, []);

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const theme = useTheme();

    const handleGestionadoChange = async (id) => {
        const messageToUpdate = messages.find(message => message.id === id);
        const newValue = !messageToUpdate.gestionado;
        await updateGestionado(id, newValue);
        const updatedMessagesData = await getAllMensajes();
        setMessages(updatedMessagesData);
    };

    const handleMessageClick = (message) => {
        navigate(`/formulario/${message.id}`, { state: { message } });
    };

    const getIconColor = (gestionado) => {
        return gestionado ? '#008000' : 'orange'; 
    };

    return (
        <div>
            <Box margin={2} padding={2} marginBottom={0}>
                <Box sx={{textAlign: "center"}}>
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
                    }}
                >
                    <Tabs
                        value={selectedTab}
                        onChange={handleChangeTab}
                        aria-label="Tabs de Mensajes"
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
            </Box>

            <TabPanel value={selectedTab} index={0}>
    {messages.filter(message => !message.gestionado).length === 0 ? (
        <Box sx={{textAlign: "center", margin: "auto", pt: 1}}>
        <Typography variant="h6" >No tiene mensajes para gestionar.</Typography>
        </Box>
    ) : (
        messages.filter(message => !message.gestionado).map((message) => (
            <MessageCard 
                key={message.id} 
                message={message} 
                handleGestionadoChange={handleGestionadoChange} 
                handleMessageClick={handleMessageClick} 
                iconColor={getIconColor(message.gestionado)}
            />
        ))
    )}
</TabPanel>
<TabPanel value={selectedTab} index={1}>
    {messages.filter(message => message.gestionado).length === 0 ? (
        <Box sx={{textAlign: "center", margin: "auto", pt: 1}}>
        <Typography variant="h6" >No tiene mensajes para gestionar.</Typography>
        </Box>
    ) : (
        messages.filter(message => message.gestionado).map((message) => (
            <MessageCard 
                key={message.id} 
                message={message} 
                handleGestionadoChange={handleGestionadoChange} 
                handleMessageClick={handleMessageClick} 
                iconColor={getIconColor(message.gestionado)} 
            />
        ))
    )}
</TabPanel>
        </div>
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const MessageCard = ({ iconColor, message, handleGestionadoChange, handleMessageClick }) => {
    const handleCardClick = () => {
        handleMessageClick(message);
    };
    const theme = useTheme();

    return (
        <Box
            onClick={handleCardClick}
            sx={{

                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                    
                },
            }}
        >
            <Card sx={{ display: "flex", width: "100%", marginTop: 2, boxShadow: "none", textAlign: "left", borderRadius: 3}}>
                <CardContent sx={{width: "100%"}}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FiberManualRecordIcon sx={{ color: iconColor, marginRight: 1 }} /> 
                        <Typography variant="h5" sx={{fontSize: "1.2rem",fontWeight: "bold",color: theme.palette.primary.main}}>
                            {message.microemprendimiento.nombre}
                        </Typography>
                    </div>
                    <Divider sx={{marginTop: 1, marginBottom: 1, bgcolor: theme.palette.primary.main}} />
                    <Typography variant="subtitle1" color="textSecondary" sx={{fontWeight: "bold"}}>
                        {message.fechaCreacion}
                    </Typography>
                </CardContent>
                <CardContent sx={{margin: "auto"}}>
                    <KeyboardArrowRightIcon sx={{ color: theme.palette.black.main }} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default DashboardSolicitudes;
