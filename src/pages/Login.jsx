import { Box, Container, Typography, styled } from "@mui/material"
import { GoogleButton } from "../components/Login/GoogleButton"
import theme from "../theme/theme"

const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.titles,
    textAlign: 'center',
}));

export const Login = () => {

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'url("/img/login-bg.jpeg")',
                backgroundRepeat: 'none',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
            maxWidth='none'
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    width: 1,
                    pt: 4,
                    pb: 6,
                    bgcolor: 'common.white',
                    maxWidth: '500px'
                }}
                borderRadius={theme.shape.borderRadiusSmall}
            >
                <Title px={4} variant="h1">Ingreso Administrador</Title>
                <img style={{ marginTop: 24, marginBottom: 64 }} className="" src="/img/logo.svg" alt="" />
                <GoogleButton />
            </Box>
        </Container>
    )
}