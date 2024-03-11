import React from 'react';
import { TextField, Grid, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const SearchMicro = ({ search, setSearch }) => {
  return (
    <Grid
      container
      justifyContent="center"
      className="search-bar"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '8px'
        }}
      >
        <SearchIcon color='black'/>
        <TextField
          name="message"
          label=""
          placeholder="Buscar Microemprendimientos"
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 0
            },
            "& fieldset": {
              border: 'none'
            },
          }}
        />
      </Box>
    </Grid>


  );
};

export default SearchMicro;