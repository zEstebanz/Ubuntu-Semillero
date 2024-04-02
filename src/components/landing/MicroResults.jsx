/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import MicroCard from "../Microenterprises/MicroCard";

function MicroResults({ microFilterList }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      paddingTop="9rem"
      alignItems="center"
    >
      <Typography marginBottom="2.5rem" variant="titles">
        Resultados de tu búsqueda
      </Typography>
      {microFilterList ? (
        microFilterList.map((micro) => (
          <MicroCard
            key={micro.id}
            title={micro.title}
            entity={micro.entity}
            categori={micro.categori}
            location={micro.location}
            imageUrl={micro.imageUrl}
            imageUrl2={micro.imageUrl2}
            imageUrl3={micro.imageUrl3}
            link={micro.link}
          />
        ))
      ) : (
        <Paper
          elevation={0}
          sx={{
            width: "92%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5.5rem",
          }}
        >
          <SearchOffIcon
            color="primary"
            sx={{ fontSize: "3.5rem", marginTop: "1.7rem" }}
          />
          <Typography
            align="center"
            marginTop="1rem"
            variant="subtitles"
            color="primary"
            fontWeight={600}
          >
            No se encontraron resultados para tu búsqueda
          </Typography>
          <Typography
            marginTop="1rem"
            marginBottom="1.5rem"
            sx={{ fontSize: "1.1rem", fontWeight: "600", color: "#090909" }}
          >
            Intentá nuevamente con otra consulta
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default MicroResults;
