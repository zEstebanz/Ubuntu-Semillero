import { useState } from "react";
import { Card, CardContent, Typography, Button, Grid, CardMedia } from "@mui/material";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";

function PostCard({ title, description, date, imageUrl }) {
  const [expanded, setExpanded] = useState(false);
  const images = [imageUrl, imageUrl, imageUrl];
  const [currentSlide, setCurrentSlide] = useState(0);
  const descriptionLimit = 100; // Limite de caracteres para la descripción inicial

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container justifyContent="center" paddingTop={"16px"}>
      <Card
        className="post-card"
        sx={{
          width: "328px",
          height: 'fit-content',
          borderRadius: "16px",
          gap: "16px"
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "0.8rem !important",
          }}
        >
          <Typography
            variant="subtitles"
            fontWeight={600}
            component="div"
            gutterBottom
            alignSelf="center"
            marginBottom={2.5}
          >
            {title}
          </Typography>

          <CardMedia
            component="img"
            height="128"
            width="304"
            image={imageUrl}
            alt={title}
            sx={{
              borderRadius: "16px",
            }}
          />
          <Typography
            variant="body2"
            fontWeight={600}
            marginTop="1.8rem"
            marginBottom={0.6}
            color="common.black"
          >
            {date}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            color="common.black"
            className={expanded ? "expanded" : "collapsed"} // Aplica una clase condicional para expandir o colapsar el texto
          >
            {expanded ? description : description.slice(0, descriptionLimit) + (description.length > descriptionLimit ? '...' : '')}
          </Typography>
          <Button
            variant="text"
            sx={{
              textTransform: "none",
              alignSelf: "center",
              marginTop: "0.8rem",
            }}
            onClick={toggleExpand}
          >
            <Typography variant="body2" fontWeight={600} color="principal">
              {expanded ? "Ver menos" : "Ver más"}
            </Typography>
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PostCard;
