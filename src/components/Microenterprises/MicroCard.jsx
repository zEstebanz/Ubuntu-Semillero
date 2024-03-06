import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function MicroCard({ title, entity, categori, location, imageUrl, link }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container justifyContent="center">

      <Card className="post-card" sx={{
        width: "328px",
        height: 'fit-content',
        top: "1200px",
        left: "16px",
        padding: '16px 0px 0px 0px',
        marginBottom: "16px",
        borderRadius: "16px",
        gap: "16px"
      }}>
        <CardContent sx={{
          width: 'hug',
          height: 'hug',
          gap: "8px"
        }}>
          <CardMedia
            component="img"
            height="144"
            width="304"
            image={imageUrl}
            alt={title}
            sx={{
              borderRadius: "16px",
              gap: "16px"
            }}
          />
          <CardContent sx={{ marginLeft: '-15px' }}>
            <Typography
              component="div"
              gutterBottom
              sx={{
                fontFamily: 'Lato',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '25px',
                letterSpacing: '0px',
                textAlign: 'left'
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                color: '#093C59',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '18px',
                letterSpacing: '0px',
                textAlign: 'left',
                width: '304px',
                height: '16px',
                top: '28px',
                marginBottom: '10px'
              }}
            >
              {entity}
            </Typography>

            <Typography
              sx={{
                width: '304px',
                height: '16px',
                top: '52px',
                fontFamily: 'Lato',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '18px',
                letterSpacing: '0px',
                textAlign: 'left',
                marginBottom: '16px'
              }}
            >
              {categori}
            </Typography>

            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center', // Alinea verticalmente el icono con el texto
                width: 'fit-content',
                fontFamily: 'Nunito',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                letterSpacing: '0px',
                textAlign: 'left',
              }}
            >
              <LocationOnIcon sx={{ marginRight: '4px', color: '#093C59' }} /> {/* Agrega un margen a la derecha del icono */}
              {location}
            </Typography>

            <IconButton onClick={toggleExpand}
              sx={{
                padding: "16px 0px 8px 0px",
                gap: "16px"
              }}
            >
              {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>

          </CardContent>
        </CardContent>
      </Card>
    </Grid>

  );
}

export default MicroCard;