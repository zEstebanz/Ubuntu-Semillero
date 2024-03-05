import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

function MicroCard({ title, entity, categori, location, imageUrl, link }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="post-card" sx={{
      width: "328px",
      height: 'fit-content',
      top: "1200px",
      left: "16px",
      padding: '0px 0px 8px 0px',
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
        <CardContent>
          <Typography
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
              top: '28px'
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
            }}
          >
            {categori}
          </Typography>

          <Typography
            sx={{
              width: '187px',
              height: '20px',
              fontFamily: 'Nunito',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '0px',
              textAlign: 'left',
            }}
          >
            {location}
          </Typography>

        </CardContent>
      </CardContent>
    </Card>
  );
}

export default MicroCard;