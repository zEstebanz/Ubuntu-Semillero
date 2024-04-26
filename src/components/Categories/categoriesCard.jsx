import React from 'react';
import { Card, CardContent, CardMedia, Typography, Divider } from '@mui/material';

function CategoriesCard({ imageUrl, altText, title, dividerColor, link }) {
  return (
    <Card sx={{
      borderRadius: "15px",
      maxWidth: 350,
      boxShadow: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      p: 1,
      paddingLeft: 2,
      paddingRight: 2,
      marginBottom: 2,
    }}>
      <CardMedia
        component="img"
        height="30"
        image={imageUrl}
        alt={altText}
        sx={{
          maxWidth: 30,
          borderRadius: '100px',
          marginRight: 0,
          border: '1px solid green',
          padding: '4px',
        }}
      />
      <CardContent sx={{
        '&:last-child': {
          p: 0,
              },
        marginLeft: 2,
      }}>
        <Typography 
        color="primary" 
        fontWeight="400" 
        fontSize={16} 
        marginBottom={.5}>
          <a href={link} 
                      style={{ 
            textDecoration: 'none', 
          color: 'inherit' }}>
            {title}
          </a>
        </Typography>
        <Divider sx={{
          bgcolor: dividerColor,
          m: 0,
          p: 0,
        }} />
      </CardContent>
    </Card>
  );
}

export default CategoriesCard;