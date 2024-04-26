import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, styled, Divider } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import CustomButton from "../buttonCustom";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import MicroResults from "../MicroResults";
import { ubuntuApi } from "../../utils/services/axiosConfig";

const InversionCalcResultado = () => {
  const { title, id } = useParams();
  const location = useLocation();
  const calculatedInvestmentData = location.state.calculatedInvestmentData;
  const navigate = useNavigate();

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
      return micro.nombre.toLowerCase().includes(search.toLowerCase());
    });
    setMicroFilterList(filteredMicroList);
  }, [search, microList]);

  const Subtitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitles,
  }));

  const TitleSmall = ({ text }) => (
    <Typography
        variant="1"
        gutterBottom
        sx={{
            fontFamily: 'Lato',
            lineHeight: '25px',
            letterSpacing: '0px',
        }}
    >
        {text}
    </Typography>
  );

  const Subtitle1 = ({ text, nivelRiesgo }) => {
    let color = '';
    if (nivelRiesgo === 'BAJO') {
      color = '#1D9129';
    } else if (nivelRiesgo === 'MEDIO') {
      color = '#B86B11';
    } else if (nivelRiesgo === 'ALTO') {
      color = '#BC1111';
    }

    return (
      <Typography
        variant="h6"
        gutterBottom
        color={color || "primary"} 
        sx={{
          fontFamily: 'Lato',
          fontSize: '18px',
          fontWeight: 700,
          lineHeight: '25px',
          letterSpacing: '0px',
        }}
      >
        {text} {nivelRiesgo} 
      </Typography>
    );
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleContactar = () => {
    navigate(`/contacto/${encodeURIComponent(title)}/${id}`); 
  };



  return (
    <div>
      <Box sx={{ display: "flex", mb: 1, pt:0 }}>
  <SearchBar
    busqueda={search}
    setBusqueda={setSearch}
    
  />
</Box>
      {search ? (
        <MicroResults microFilterList={microFilterList} />
      ) : (
        <Box sx={{ m: 2, p:0}}>
      <Box sx={{ mt: 12  }}>
      <Box sx={{ mt: 2, mb: 2  }}>
      <Typography variant="h5" gutterBottom sx={{fontSize: "1.3rem", textAlign: "center"}}>
        <strong>Resultados de la Inversión</strong>
      </Typography> </Box>
        {calculatedInvestmentData && (
          <Card sx={{boxShadow: "none", mb: 2}}>
            <CardContent>
            <Subtitle
          variant="h4"
          color='primary.main'
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            mt: 2,
          }}
        >
          {calculatedInvestmentData.nombreMicro}
        </Subtitle>
        <Divider
    sx={{
      backgroundColor: '#226516',
      margin: "0 auto",
      height: '.5px',
      m: 2 
    }}
  />




<Typography variant="1">Monto aportado: </Typography>
<Subtitle
          variant="h4"
          color='primary.main'
          sx={{
            fontWeight: 600,
            mb: 1,
            mt: 1,
          }}
        >
          $ {formatAmount(calculatedInvestmentData.montoAportado)}
        </Subtitle>


              <Typography variant="1">Costos de Gestión: </Typography>

              <Subtitle
          variant="h4"
          color='primary.main'
          sx={{
            fontWeight: 600,
            mb: 1,
            mt: 1,
          }}
        >
          $ {formatAmount(calculatedInvestmentData.costosGestion)}
        </Subtitle>


  

              <Typography variant="1">Total a aportar: </Typography>

              <Subtitle
          variant="h4"
          color='primary.main'
          sx={{
            fontWeight: 600,
            mb: 1,
            mt: 1,
          }}
        >
          $ {formatAmount(calculatedInvestmentData.totalAporte)}
        </Subtitle>

        <Typography variant="1">Cuotas: </Typography>

              <Subtitle
          variant="h4"
          color='primary.main'
          sx={{
            fontWeight: 600,
            mb: 1,
            mt: 1,
          }}
        >
          {calculatedInvestmentData.cuotas}
        </Subtitle>

        <Typography variant="1">Nivel de Riesgo: </Typography>

        <Subtitle1
          variant="h4"
          color='primary.main'
          sx={{
            fontWeight: 600,
            mb: 1,
            mt: 1,
          }}
        >
          {calculatedInvestmentData.nivelRiesgo}
        </Subtitle1>

        <Subtitle1 text="" nivelRiesgo={calculatedInvestmentData.nivelRiesgo} />

        <Typography variant="1">Retorno esperado: </Typography>
        
        <Subtitle
          variant="h4"
          color='#1d9129'
          sx={{
            fontWeight: 600,
            mb: 1,
            mt: 1,
          }}
        >
          $ {formatAmount(calculatedInvestmentData.retornoEsperado)}
        </Subtitle>

        <Box sx={{textAlign: "center", m: 2}}>

        <Typography variant="1">Ganancias totales: </Typography>

        <Subtitle
          variant="h4"
          color='#1d9129'
          sx={{
            fontWeight: 600,
            mb: 1,
            mt: 1,
          }}
        >
          $ {formatAmount(calculatedInvestmentData.gananciaTotal)}
        </Subtitle>

        <Typography variant="1">Monto a cobrar en cuotas: </Typography>
        <Subtitle
  variant="h4"
  sx={{
    fontWeight: 600,
    mb: 1,
    mt: 1,
  }}
>
  <span style={{ color: '#093c59' }}>{calculatedInvestmentData.cuotas}</span>{" "}
  <span style={{ fontSize: "1rem" }}>cuotas de</span>{" "}
  <span style={{ color: '#1d9129', fontWeight: 600 }}>
    ${formatAmount(parseFloat(calculatedInvestmentData.montoCuota).toFixed(2))}
  </span>
</Subtitle>


        </Box>

        <Typography variant="1">Nota: </Typography>

        <Subtitle
          variant="h4"
          color='primary.main'
          sx={{
            fontFamily: 'Lato',
                color: "#093C59",
                lineHeight: '25px',
                letterSpacing: '0px',
                fontSize: "16px",
          }}
        >
           {calculatedInvestmentData.notasAdicionales}
        </Subtitle>

              
            </CardContent>
          </Card>
          
        )}
      </Box>
      <Box>
      <CustomButton
      type="button" 
      fullWidth
      sx={{
        my: 1,
      }}
      onClick={handleGoBack}
    >
      Volver
    </CustomButton>
              <CustomButton
                type="button"
                fullWidth
                onClick={handleContactar} 
              >
                Contactar
              </CustomButton>
        </Box>
    </Box>
     )}
     </div>
   );
 };

export default InversionCalcResultado;
