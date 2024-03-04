import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function PostCard({ title, description, date }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="post-card">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography>
          {date}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={expanded ? 'expanded' : 'collapsed'} // Aplica una clase condicional para expandir o colapsar el texto
        >
          {description}
        </Typography>
        <Button variant="outlined" onClick={toggleExpand}>
          {expanded ? 'Ver menos' : 'Ver más'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default PostCard;