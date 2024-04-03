import { useState } from "react";
import { Card, CardContent, Typography, Button, Grid, CardMedia, Container } from "@mui/material";

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function PostCard({ title, description, date, images }) {
  const [expanded, setExpanded] = useState(false);
  const descriptionLimit = 100;

  // console.log(images)

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
                <CardMedia component="img" height="128" width="304" image={imageUrl} alt={title} sx={{ borderRadius: "16px" }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
    } else if (images.length === 1) {
      return (
        <CardMedia component="img" height="128" width="304" image={images[0]} alt={title} sx={{ borderRadius: "16px" }} />
      );
    } else {
      return null;  //No hay imágenes disponibles
    }
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
            fontSize={'18px'}
          >
            {title}
          </Typography>
          
          {renderSwiper()}

          <Typography
            variant="body2"
            fontWeight={600}
            marginTop="1.8rem"
            marginBottom={0.6}
            color="common.black"
            fontSize={'14px'}
          >
            {date}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            color="common.black"
            className={expanded ? "expanded" : "collapsed"}
            fontSize={'16px'}
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
            <Typography variant="body2" fontWeight={600} color="principal" fontSize={'16px'}>
              {expanded ? "Ver menos" : "Ver más"}
            </Typography>
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PostCard;
