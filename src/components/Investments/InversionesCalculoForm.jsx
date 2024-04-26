import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, styled, MenuItem } from "@mui/material";
import { Banner } from "../Banner";
import { MessageHelperText } from "../Contact/MessageHelperText";
import { useFormik } from "formik";
import * as Yup from 'yup';
import CustomButton from "../buttonCustom";
import SearchBar from "../SearchBar";
import MicroResults from "../MicroResults";
import axios from "axios";
import { ubuntuApi } from "../../utils/services/axiosConfig";
import CustomModal from "../modalCustom";
import { useParams } from "react-router-dom";
import { sendMessage, } from "../../api/message/sendMessage";
import createInversion from "../../api/inversiones/createInversion";
import InputAdornment from '@mui/material/InputAdornment';
import { calcInversion } from "../../api/inversiones/calcInversion";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  montoAporte: Yup.number().typeError('Ingrese un monto válido').required('El máximo es requerido'),
  cuotas: Yup.string().required('Seleccione el número de cuotas'),
});


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

const InversionesCalculoForm = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const { id, microId, idMicro, title, microemprendimiento } = useParams();
  const [calculatedInvestmentData, setCalculatedInvestmentData] = useState(null);
  const [investmentData, setInvestmentData] = useState(true);
  const [Inversion, setInversion] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    icon: "",
  });

  const formik = useFormik({
    initialValues: {
      montoAporte: '',
      cuotas: '3',
      id: id,
      idMicro: id,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const inversionData = await calcInversion(values, id);
      console.log("Datos de inversión calculados:", inversionData);
      if (inversionData !== null) {
        setCalculatedInvestmentData(inversionData);
        navigate(`/InversionCalcResultado/${encodeURIComponent(title)}/${id}`, { state: { calculatedInvestmentData: inversionData } });
      } else {
        setModalContent({
          title: "Lo sentimos, no se pudieron realizar los calculos.",
          message: "Por favor, volvé a intentarlo.",
          icon: "error",
        });
        setModalOpen(true);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ubuntuApi.get(`/gestionInversion/${id}`, {
          
        });
        console.log('Data received:', res.data);
        setInversion(res.data);
        setInvestmentData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [idMicro]);

  const currencies = [
    { value: '3', label: '3 Cuotas' },
    { value: '6', label: '6 Cuotas' },
    { value: '9', label: '9 Cuotas' },
    { value: '12', label: '12 Cuotas' },
  ];

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
            sectionTitle="Inversiones"
            title="Utilizá esta herramienta para conocer tus decisiones financieras en un futuro más sostenible"
            imageURL="/img/investment-bg.jpg"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 5,
              px: 2,
              mx: "auto",
            }}
            maxWidth="sm"
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.375rem",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Por favor, ingrese un monto.
              Calcularemos el aporte por ti.
            </Typography>
            <Subtitle
              variant="h4"
              color="primary.main"
              sx={{
                fontWeight: 600,
                mt: 4,
              }}
            >
              {title}
            </Subtitle>
            <Paragraph
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Ingresá un monto para conocer el aporte sobre el Microemprendimiento seleccionado.
            </Paragraph>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                width: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >

              <Input
                id="montoAporte"
                name="montoAporte"
                label="Monto a Aportar"
                placeholder='Ingrese el valor en pesos'
                fullWidth
                value={formik.values.montoAporte}
                onChange={formik.handleChange}
                {...formik.getFieldProps('montoAporte')}
                error={formik.touched.montoAporte && Boolean(formik.errors.montoAporte)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                sx={{ mt: 3 }}
                multiline
                InputLabelProps={{
                  shrink: true,
                }}
                FormHelperTextProps={{
                  sx: { whiteSpace: 'pre-line' },
                }}
                helperText={(
                  <Typography variant="1" sx={{ whiteSpace: 'pre-line' }}>
                    {formik.touched.montoAporte && formik.errors.montoAporte ? formik.errors.montoAporte : `Usá punto para separar decimales \nDivisa: Peso Argentino (ARS)\nMin ${investmentData.min} ARS\nMax ${investmentData.max} ARS`}
                  </Typography>
                )}
              />

              <Input
                id="cuotas"
                name="cuotas"
                select
                label="Cuotas"
                fullWidth
                value={formik.values.cuotas}
                onChange={formik.handleChange}
                error={formik.touched.cuotas && Boolean(formik.errors.cuotas)}
                sx={{ mt: 3 }}
                FormHelperTextProps={{
                  sx: { whiteSpace: 'pre-line' },
                }}
                helperText={(
                  <Typography variant="1" sx={{ whiteSpace: 'pre-line' }}>
                    {formik.touched.cuotas && formik.errors.cuotas ? formik.errors.cuotas : 'Seleccione en cuantas cuotas desea realizar la inversion.'}
                  </Typography>
                )}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Input>

              <CustomButton
                type="submit"
                fullWidth
                sx={{
                  my: 5,
                }}
                disabled={!formik.dirty || !formik.isValid}
              >
                Calcular Inversión
              </CustomButton>
            </Box>

            <div>
              {calculatedInvestmentData && (
                <div>
                  <Typography variant="h4">Resultado del cálculo de inversión:</Typography>
                  {Object.entries(calculatedInvestmentData).map(([key, value]) => (
                    <Typography key={key}>{`${key}: ${value}`}</Typography>
                  ))}
                </div>
              )}
            </div>
          </Box>

          <CustomModal
            open={modalOpen}
            onClose={handleCloseModal}
            title={modalContent.title}
            message={modalContent.message}
            icon={modalContent.icon}
            buttons={
              modalContent.icon === "check"
                ? [{ text: "Aceptar", onClick: handleCloseModal }]
                : [
                  { text: "Cancelar", onClick: handleCloseModal },
                  { text: "Intentar nuevamente", onClick: handleRetry },
                ]
            }
          />
        </div>
      )}
    </div>
  );
};

export default InversionesCalculoForm;