import { Box, FormControl, TextField, Typography, styled, useFormControl } from "@mui/material"
import { Banner } from "../components/Banner"
import { MessageHelperText } from "../components/Contact/MessageHelperText";
import { useState } from "react";
import CustomButton from "../components/buttonCustom";

const Subtitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitles,
}));

const Paragraph = styled(Typography)(({ theme }) => ({
    ...theme.typography.paragraphs,
    fontSize: '1rem',
    fontWeight: 400,
}));

const Input = styled(TextField)(({ theme }) => ({
    "& label": {
        color: theme.palette.common.black,
    },
    "&.MuiInputLabel-shrink label": {
        color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: `1px solid ${theme.palette.common.black}`,
        },
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.palette.common.black}`
        },
        "&.Mui-focused label": {
            color: theme.palette.primary.main,
        },
    },
}));

export const Contact = () => {
    const [counter, setCounter] = useState(0);
    const messageDefaultValue = `Hola, me gustaría recibir más información sobre cómo invertir en el Microemprendimiento.

Aguardo su contacto.

Gracias.
`;

    return (
        <div>
            <Banner
                sectionTitle="contacto"
                title="Contactanos para obtener información detallada sobre cómo podés invertir en un futuro más sostenible"
                imageURL="/img/contact-hero-bg.jpeg"
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 5,
                    px: 2,
                    mx: 'auto',
                }}
                maxWidth='sm'
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: '1.375rem',
                        textAlign: 'center',
                        fontWeight: 500
                    }}
                >
                    Por favor, completá el formulario.
                    Nos comunicaremos en breve.
                </Typography>
                <Subtitle
                    variant="h4"
                    color='primary.main'
                    sx={{
                        fontWeight: 600,
                        mt: 4,
                    }}
                >
                    EcoSenda
                </Subtitle>
                <Paragraph
                    sx={{
                        textAlign: 'center',
                        mt: 2,
                    }}
                >
                    Vas a contactar a Ubuntu para recibir más información acerca del Microemprendimiento seleccionado.
                </Paragraph>
                <Box
                    component='form'
                    sx={{
                        width: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Input
                        type="text"
                        required
                        id="full-name"
                        label="Nombre y Apellido"
                        fullWidth
                        sx={{
                            mt: 3,
                        }}
                    />
                    <Input
                        type="text"
                        required
                        id="email"
                        label="Correo electrónico"
                        fullWidth
                        sx={{
                            mt: 2,
                        }}
                    />
                    <Input
                        type="text"
                        required
                        id="phone"
                        label="Teléfono"
                        helperText={<Typography color='common.black' variant="p">Con el siguiente formato +54 9 261 002 002</Typography>}
                        fullWidth
                        sx={{
                            mt: 2,
                        }}
                    />
                    <Input
                        required
                        type="text"
                        id="message"
                        label="Mensaje"
                        helperText={<MessageHelperText counter={counter} />}
                        fullWidth
                        multiline
                        rows={7}
                        defaultValue={messageDefaultValue}
                        sx={{
                            mt: 2,
                        }}
                        onChange={(event) => setCounter(event.target.value.length)}
                    />
                    <CustomButton
                        fullWidth
                        sx={{
                            my: 5,
                        }}
                    >
                        Enviar
                    </CustomButton>
                </Box>
            </Box>
        </div>
    )
}