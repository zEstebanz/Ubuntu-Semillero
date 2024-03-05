import React from 'react';
import { TextField, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchMicro = ({ search, setSearch }) => {
  return (
    <Grid
      container
      justifyContent="center"
      className="search-bar"
    >
      <TextField
        label="Buscar Microemprendimientos"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Grid>
  );
};

export default SearchMicro;