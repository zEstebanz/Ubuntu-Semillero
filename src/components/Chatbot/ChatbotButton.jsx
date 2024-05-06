import React, { useEffect, useState } from 'react';
import { Drawer, IconButton, Fab, Box, Typography, Avatar, Badge } from '@mui/material';
import { Close as CloseIcon, Message as MessageIcon, SmartToy } from '@mui/icons-material';
import MessageOption from './MessageOption';
import MessageReceived from './MessageReceived';
import { getInitialQuestions } from '../../api/chatbot/getQuestions';
import { getAnswer } from '../../api/chatbot/getAnswer';

function ChatHeader({ onClose }) {
    return (
        <Box sx={{
            
            width: "100%",
            height: "100px",
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            background: 'linear-gradient(to right bottom, #1e709e, #093C59)',
            zIndex: 999,
        }}>

<Box>
  <Badge
    overlap="circular"
    variant="dot"
    color="success"
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
  >
    <Avatar alt="Chatbot avatar" sx={{ ml: 1, bgcolor: "#fff", color: "#1e709e" }}>
      <SmartToy />
    </Avatar>
  </Badge>
</Box>
            <Typography variant="h7" sx={{ color: "common.white", ml: 1, fontWeight: 700 }}>Ubuntu ChatBot</Typography>
            <IconButton onClick={onClose} sx={{ color: "common.white", marginLeft: 'auto', p: 0, mr: 1}}>
                <CloseIcon />
            </IconButton>
        </Box>
    );
}

function ChatMessages() {
    const [messages, setMessages] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getInitialQuestions()
            .then(data => setQuestions(data))
    }, [])

    const handleSelectQuestion = async (idQuestion, questionAsMessage) => {

        const { text, secondaryQuestions } = await getAnswer(idQuestion);

        const answer = {
            text,
            isAnswer: true,
        }

        const newMessages = [questionAsMessage, answer];
        
        if (secondaryQuestions.length === 0) {
            const initialQuestions = await getInitialQuestions();
            
            newMessages.push({
                text: '¡Has llegado al final de las preguntas relacionadas con tu consulta! ¿Necesitas más ayuda? Si tienes otras preguntas, no dudes en explorar las preguntas iniciales.',
                isAnswer: true,
            })
            setMessages([...messages, ...newMessages]);
            setQuestions(initialQuestions);
            return;
        }
        
        setMessages([...messages, ...newMessages]);
        setQuestions(secondaryQuestions);

    }

    return (
        <Box sx={{ p: 1,  overflowY: "auto", maxHeight: "80vh", maxWidth: "800px", margin: "auto", paddingTop: "120px"}}>
            <MessageReceived text="¡Hola! 👋 Soy el Chatbot de Ubuntu. ¿En qué puedo ayudarte hoy?" />
            {
                messages?.map(({ text, isAnswer }, index) => {
                    const Component = isAnswer ? MessageReceived : MessageOption;
                    const props = {}

                    if (!isAnswer) props.isMessage = true;

                    return (
                        <Component key={index} text={text} {...props} />
                    )
                })
            }
            {
                questions?.map(({ id, text }, index) => (
                    <MessageOption key={id} text={text} onSelected={() => handleSelectQuestion(id, { text, isAnswer: false })} />
                ))
            }
            {/* <MessageOption text="¿Que es Ubuntu? 🍃" />
            <MessageOption text="Contacto ✉️" />
            <MessageOption text="Finalizar chat ❌" />
            <MessageReceived message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." /> */}
        </Box>
    );
}

function ChatbotButton() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setOpen(open);
    };

    return (
        <div>
            <Fab size="medium" onClick={toggleDrawer(true)} style={{ position: 'fixed', bottom: 16, right: 16 }} color="primary" aria-label="chat">
                <MessageIcon />
            </Fab>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                ModalProps={{ fullScreen: true }}
                PaperProps={{ style: { overflow: 'hidden' } }}
            >
                <Box style={{ height: '100vh', backgroundColor: 'white' }}>
                    <ChatHeader onClose={toggleDrawer(false)} />
                    <ChatMessages />
                </Box>
            </Drawer>
        </div>
    );
}

export default ChatbotButton;
