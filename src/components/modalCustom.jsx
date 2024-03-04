import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomModal({ open, onClose, title, message, buttons, icon }) {
  const renderIcon = () => {
    switch (icon) {
      case 'check':
        return <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 50 }} />;
      case 'error':
        return <CloseIcon sx={{ color: 'error.main', fontSize: 50 }} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          marginRight: 2,
          marginLeft: 2,
          padding: 2,
          maxWidth: 600,
          bgcolor: 'background.paper',
          borderRadius: 10,
        }}
      >
        {renderIcon()}
        <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={400} m={1}>
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 0 }}>
          {message}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              color="primary"
              onClick={button.onClick}
              sx={{ m: 0, p:0, fontSize: 16, fontWeight: 600, textTransform: "none" }}
            >
              {button.text}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
