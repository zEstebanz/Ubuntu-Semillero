import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

function PostCard({ title, description, date }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className="post-card"
      sx={{ marginBottom: "2rem", borderRadius: "1rem" }}
    >
      <CardContent>
        <Typography
          variant="subtitle"
          fontWeight={600}
          component="div"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {date}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
          color="text.secondary"
          className={expanded ? "expanded" : "collapsed"} // Aplica una clase condicional para expandir o colapsar el texto
        >
          {description}
        </Typography>
        {!expanded && (
          <Button
            variant="text"
            sx={{ textTransform: "none" }}
            onClick={toggleExpand}
          >
            <Typography variant="body2" fontWeight={600} color="principal">
              {expanded ? "Ver menos" : "Ver más"}
            </Typography>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default PostCard;
