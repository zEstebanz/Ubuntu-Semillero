import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";

function PostCard({ title, description, date, imageUrl }) {
  const [expanded, setExpanded] = useState(false);
  const images = [imageUrl, imageUrl, imageUrl];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className="post-card"
      sx={{
        marginBottom: "2rem",
        borderRadius: "1rem",
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
        <div className="post-image">
          <div className="carousel">
            <button className="left-arrow">
              <img src={leftArrow} alt="left-arrow" />
            </button>
            <div className="slides">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? "active" : ""}`}
                >
                  <img src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </div>
            <button className="right-arrow">
              <img src={rightArrow} alt="right-arrow" />
            </button>
          </div>
          <div className="controls">
            {images.map((image, index) => (
              <button
                key={index}
                className={`button-group ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>

        {/*         <div className="post-card-image">
          <img src={imageUrl} />
        </div> */}
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
          {description}
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
  );
}

export default PostCard;
