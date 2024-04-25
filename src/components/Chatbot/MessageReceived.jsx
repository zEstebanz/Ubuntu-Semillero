import React from 'react';
import { Box } from '@mui/material';

const MessageReceived = ({ text }) => {
  const bubbleStyle = {
    maxWidth: '80%',
    wordWrap: 'break-word',
    marginBottom: '12px',
    lineHeight: '24px',
    position: 'relative',
    padding: '10px 20px',
    borderRadius: '20px',
    alignSelf: 'flex-start', 
    color: 'black',
    backgroundColor: '#ededed',
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      height: '25px',
      width: '20px',
      backgroundColor: '#ededed',
      left: '-7px',
      right: 'auto',
      borderBottomRightRadius: '16px 14px',
      borderBottomLeftRadius: '0',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      height: '25px',
      width: '26px',
      backgroundColor: 'common.white',
      left: '-26px',
      right: 'auto',
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '0',
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
      <Box sx={bubbleStyle}>
        {text}
      </Box>
    </div>
  );
};

export default MessageReceived;
