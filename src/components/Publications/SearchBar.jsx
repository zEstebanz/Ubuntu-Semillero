import React from 'react';
import { TextField, Grid } from '@mui/material';

const SearchBar = ({ busqueda, setBusqueda }) => {
  return (
    <Grid
      container
      justifyContent="center"
      className="search-bar"
    >
      <TextField
        label="Buscar Microemprendimientos"
        className="search-input"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </Grid>
  );
};

export default SearchBar;