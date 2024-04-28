import React, { useState } from 'react';
import Box from '@mui/material/Box';

const MessageOption = ({ text, sx, isMessage, onSelected = () => {} }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    onSelected()
    setClicked(!clicked);
  };

  return (
    <Box
      sx={{
        backgroundColor: isMessage ? '#093C59' : 'white',
        border: '3px solid #093C59', // Borde constante
        borderColor: isMessage ? 'transparent' : '#093C59', // Color transparente cuando no está clicado
        marginBottom: '12px',
        maxWidth: "70%",
        padding: '10px 20px',
        borderRadius: '20px',
        color: isMessage ? 'common.white' : 'black',
        display: "flex",
        justifyContent: "flex-end",
        marginLeft: isMessage ? 'auto' : "auto", // Alinea hacia la derecha
        width: 'fit-content', // Ocupa solo el espacio necesario
        cursor: isMessage ? 'auto' : 'pointer',
        ...sx,
      }}
      onClick={handleClick}
    >
      {text}
    </Box>
  );
};

export default MessageOption;
