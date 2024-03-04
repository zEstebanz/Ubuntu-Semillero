import React from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material';

function MicroCard({title, description, date}) {

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
                {!expanded && (
                    <Button variant="outlined" onClick={toggleExpand}>
                        Ver más
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

export default MicroCard