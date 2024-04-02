import React, { useState } from "react";
import { TextField, Grid, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ busqueda, setBusqueda }) => {
  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  return (
    <Grid
      container
      className="search-bar"
      position="absolute"
      zIndex="1"
      width="91%"
      margin="1.5rem 1rem"
      sx={{ backgroundColor: `${busqueda ? "#EAEAEA" : ""}` }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <SearchIcon color="black" />
        <TextField
          name="message"
          label=""
          placeholder="Buscar Microemprendimientos"
          variant="outlined"
          fullWidth
          value={busqueda}
          onChange={handleBusquedaChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
            },
            "& fieldset": {
              border: "none",
            },
          }}
        />
      </Box>
    </Grid>
  );
};

export default SearchBar;
