import { Box, Typography } from "@mui/material"

export const MessageText = ({ counter = 0 }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}
    >
        <Typography color='common.black' variant="p">Máximo 2000 caracteres</Typography>
        <Typography color='common.black' variant="p">{counter}/2000</Typography>
    </Box>
)