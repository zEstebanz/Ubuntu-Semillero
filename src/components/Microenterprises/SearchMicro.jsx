import React from 'react';
import { TextField, Grid } from '@mui/material';

const SearchMicro = ({ search, setSearch }) => {
  return (
    <Grid
      container
      justifyContent="center"
      className="search-bar"
    >
      <TextField
        label="Search Microenterprises"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Grid>
  );
};

export default SearchMicro;