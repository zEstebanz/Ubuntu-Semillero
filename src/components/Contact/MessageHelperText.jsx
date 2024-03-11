import { Box, Typography } from "@mui/material"

export const MessageHelperText = ({ counter = 0 }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}
    >
        <Typography color='common.black' variant="p">Máximo 300 caracteres</Typography>
        <Typography color='common.black' variant="p">{counter}/300</Typography>
    </Box>
)