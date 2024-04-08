/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function MicroCard({
  key,
  title,
  subcategory,
  category,
  location,
  description,
  images,
  moreInfo,
}) {
  console.log(images);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderSwiper = () => {
    if (images.length > 1) {
      return (
        <div style={{ position: "relative" }}>
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="swiper"
          >
            {images.map((imageUrl, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <CardMedia
                  component="img"
                  height="128"
                  width="304"
                  image={imageUrl}
                  alt={title}
                  sx={{ borderRadius: "16px" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
    } else if (images.length === 1) {
      return (
        <CardMedia
          component="img"
          height="128"
          width="304"
          image={images[0]}
          alt={title}
          sx={{ borderRadius: "16px" }}
        />
      );
    } else {
      return null; // No hay imágenes disponibles
    }
  };

  return (
    <Grid container justifyContent="center">
      <Card
        sx={{
          width: "328px",
          height: "fit-content",
          marginBottom: "16px",
          borderRadius: "16px",
          gap: "16px",
        }}
      >
        <CardContent>
          <div style={{ position: "relative" }}>
            <Swiper
              cssMode={true}
              navigation={images.length > 1 ? true : false}
              pagination={images.length > 1 ? true : false}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="swiper"
            >
              {images.map((image) => (
                <SwiperSlide key={key} className="swiper-slide">
                  <CardMedia
                    component="img"
                    height="128"
                    width="304"
                    image={image}
                    alt={title}
                    sx={{ borderRadius: "16px" }}
                  />
                </SwiperSlide>
              ))}
              {/* <SwiperSlide className="swiper-slide">
                <CardMedia
                  component="img"
                  height="128"
                  width="304"
                  image={images[0]}
                  alt={title}
                  sx={{ borderRadius: "16px" }}
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <CardMedia
                  component="img"
                  height="128"
                  width="304"
                  image={images[1]}
                  alt={title}
                  sx={{ borderRadius: "16px" }}
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <CardMedia
                  component="img"
                  height="128"
                  width="304"
                  image={images[2]}
                  alt={title}
                  sx={{ borderRadius: "16px" }}
                />
              </SwiperSlide> */}
            </Swiper>
          </div>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontFamily: "Lato",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "25px",
              letterSpacing: "0px",
              textAlign: "left",
              marginTop: "16px",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "#093C59",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "18px",
              letterSpacing: "0px",
              textAlign: "left",
              width: "100%",
            }}
          >
            {subcategory}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "18px",
              letterSpacing: "0px",
              textAlign: "left",
              marginTop: "8px",
              marginBottom: "16px",
            }}
          >
            {category}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Nunito",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              letterSpacing: "0px",
              textAlign: "left",
            }}
          >
            <LocationOnIcon sx={{ marginRight: "4px", color: "#093C59" }} />
            {location}
          </Typography>

          {expanded && (
            <>
              <Typography
                color="primary"
                sx={{
                  marginTop: "16px",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                Descripción del Microemprendimiento
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                {description}
              </Typography>

              <Divider
                sx={{
                  width: "296px",
                  margin: "auto",
                  marginBottom: "16px",
                  height: "4px",
                  borderBottom: "1px solid #090909",
                }}
              />

              <Typography
                color="primary"
                sx={{ fontWeight: "600", marginBottom: "5px" }}
              >
                Más información de interés
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                {moreInfo}
              </Typography>

              <div style={{ textAlign: "center" }}>
                <Link
                  to={"/contacto"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "100px",
                      padding: "10px 24px",
                      textTransform: "none",
                    }}
                  >
                    <Typography sx={{ fontSize: "16px", lineHeight: "20px" }}>
                      Contactar
                    </Typography>
                  </Button>
                </Link>
              </div>
            </>
          )}

          <div style={{ textAlign: "center" }}>
            <IconButton
              onClick={toggleExpand}
              color="primary"
              sx={{
                padding: "16px 0px 8px 0px",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MicroCard;
