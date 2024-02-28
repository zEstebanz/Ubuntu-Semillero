import './assets/styles/App.scss'
import { Button, Paper, Box, Typography, Container } from '@mui/material'


function App() {

  return (
    <div>
      <Container>
        <h1 className="title">Frontend</h1>
        <Button variant='contained'>Button1</Button>
        <Paper />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128,
            },
          }}
        >
          <Paper elevation={0} />
          <Paper />
          <Paper elevation={3} />
        </Box>

        <Button color='error' variant='contained'>Error</Button>
        <Button color='success' variant='contained'>Error</Button>
        <Button color='warning' variant='contained'>Error</Button>

        <Typography variant="h6">
          Texto
        </Typography>
      </Container>

    </div>
  )
}

export default App