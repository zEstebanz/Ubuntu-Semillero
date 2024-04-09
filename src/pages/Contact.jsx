import { Box, FormControl, TextField, Typography, styled, useFormControl } from "@mui/material"
import { Banner } from "../components/Banner"
import { MessageHelperText } from "../components/Contact/MessageHelperText";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import CustomButton from "../components/buttonCustom";
import SearchBar from "../components/SearchBar";
import MicroResults from "../components/MicroResults";
import axios from "axios";
import { ubuntuApi } from "../utils/services/axiosConfig";
import CustomModal from "../components/modalCustom";
import { useParams } from 'react-router-dom';
import { sendMessage, validationSchema } from "../api/message/sendMessage";

const Subtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitles,
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  ...theme.typography.paragraphs,
  fontSize: "1rem",
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
      border: `1px solid ${theme.palette.common.black}`,
    },
    "&.Mui-focused label": {
      color: theme.palette.primary.main,
    },
  },
}));

export const Contact = () => {
  const [counter, setCounter] = useState(0);
    const { id, microId, title, microemprendimiento } = useParams();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        icon: ''
    });

    const formik = useFormik({
      initialValues: {
          apellidoYNombre: "",
          email: "",
          telefono: "",
          texto: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
          const modalContent = await sendMessage(values, id);
          setModalContent(modalContent);
          setModalOpen(true);
      },
  });

  const handleInputChange = (event) => {
      const { id, value } = event.target;
      let formattedValue = value;

      if (id === "apellidoYNombre") {
          if (!value.includes(",")) {
              formattedValue = value.replace(/^(\w+)\s+(\w+)$/, "$1, $2");
          }
      }

      if (id === "texto") {
          if (value.length <= 300) {
              setCounter(value.length);
              formik.setFieldValue(id, value);
          }
      } else {
          formik.setFieldValue(id, formattedValue);
      }
  };

  const handleRetry = () => {
      formik.handleSubmit();
      setModalOpen(false);
  };

  const handleCloseModal = () => {
      setModalOpen(false);
  };

  const [search, setSearch] = useState("");
  const [microList, setMicroList] = useState([]);
  const [microFilterList, setMicroFilterList] = useState([]);

  useEffect(() => {
    const fetchMicroList = async () => {
      try {
        const response = await ubuntuApi.get("/microemprendimientos/findAll");
        setMicroList(response.data.body);
      } catch (error) {
        console.error(
          "Error al obtener la lista de microemprendimientos:",
          error
        );
      }
    };

    fetchMicroList();
  }, []);

  useEffect(() => {
    const filteredMicroList = microList?.filter((micro) => {
      return micro.nombre.toLowerCase().includes(search);
    });
    setMicroFilterList(filteredMicroList);
  }, [search, microList]);

    return (
        <div>
          <SearchBar busqueda={search} setBusqueda={setSearch} />
      {search ? (
        <MicroResults microFilterList={microFilterList} />
      ) : (
        <div className="contact-section">
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
                    Por favor, completá el formulario. Nos comunicaremos en breve.
                </Typography>
                <Subtitle
                    variant="h4"
                    color='primary.main'
                    sx={{
                        fontWeight: 600,
                        mt: 4,
                    }}
                >
                    {title}
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
                    onSubmit={formik.handleSubmit}
                    sx={{
                        width: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Input
                        id="apellidoYNombre"
                        label="Apellido y Nombre"
                        fullWidth
                        sx={{
                            mt: 3,
                        }}
                        {...formik.getFieldProps('apellidoYNombre')}
                        value={formik.values.apellidoYNombre}
                        onChange={handleInputChange}

                        error={formik.touched.apellidoYNombre && Boolean(formik.errors.apellidoYNombre)}
                        helperText={formik.touched.apellidoYNombre && formik.errors.apellidoYNombre}
                    />
                    <Input
                        id="email"
                        label="Correo electrónico"
                        fullWidth
                        sx={{
                            mt: 2,
                        }}
                        {...formik.getFieldProps('email')}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Input
                        id="telefono"
                        label="Teléfono"
                        fullWidth
                        sx={{
                            mt: 2,
                        }}
                        {...formik.getFieldProps('telefono')}
                        error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                        helperText={formik.touched.telefono && formik.errors.telefono}
                    />
                    <Input
                        id="texto"
                        label="Mensaje"
                        fullWidth
                        multiline
                        rows={7}
                        sx={{
                            mt: 2,
                        }}
                        {...formik.getFieldProps('texto')}
                        onChange={handleInputChange}
                        error={formik.touched.texto && Boolean(formik.errors.texto)}
                        helperText={(formik.touched.texto && formik.errors.texto) || <MessageHelperText counter={counter} />}
                    />
                    <CustomButton
                        type="submit"
                        fullWidth
                        sx={{
                            my: 5,
                        }}
                        disabled={!formik.dirty || !formik.isValid}
                    >
                        Enviar
                    </CustomButton>
                </Box>
            </Box>

            <CustomModal
                open={modalOpen}
                onClose={handleCloseModal}
                title={modalContent.title}
                message={modalContent.message}
                icon={modalContent.icon}
                buttons={modalContent.icon === 'check' ? [{ text: 'Aceptar', onClick: handleCloseModal }] : [{ text: 'Cancelar', onClick: handleCloseModal }, { text: 'Intentar nuevamente', onClick: handleRetry }]}
            />
            
        </div>
    )
}    </div>
  );
};