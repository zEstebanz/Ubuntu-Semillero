import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ children, onClick, fullWidth, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: 20,
        boxShadow: 0,
        p: "6px 24px 6px 24px",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "600",
        marginTop: 1,
        width: fullWidth ? '100%' : 'auto' 
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
