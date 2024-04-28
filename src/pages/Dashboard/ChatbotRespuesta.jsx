import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  Input
} from '@mui/material';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import CustomButton from '../../components/buttonCustom';
import CustomModal from '../../components/modalCustom';
import { ubuntuApi } from '../../utils/services/axiosConfig';
import { getAccessToken } from '../../utils/helpers/localStorage';

const validationSchema = Yup.object().shape({
  respuesta: Yup.string().required('Debe escribir una respuesta para la pregunta seleccionada.'),
});

export const ChatbotRespuesta = () => {
  const { id, microId, title, microemprendimiento } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    icon: '',
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answerList, setAnswerList] = useState([]);

  const formik = useFormik({
    initialValues: {
      pregunta: '',
      seleccionada: '',
      respuesta: '',
      esRepregunta: false, // Agregar este campo al initialValues
      type: 'INITIAL', // Agregar este campo al initialValues
      id_answer: 1,
    },
    validationSchema: validationSchema,
  });

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setShowResponse(true);
    formik.setFieldValue('seleccionada', event.target.value);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    let formattedValue = value;

    if (id === 'apellidoYNombre') {
      if (!value.includes(',')) {
        formattedValue = value.replace(/^(\w+)\s+(\w+)$/, '$1, $2');
      }
    }

    if (id === 'respuesta') {
      if (value.length <= 300) {
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

  const handleChange = (event) => {
    const { id, checked } = event.target;

    formik.setFieldValue(id, checked);

    const newTypeValue = checked ? 'SECONDARY' : 'INITIAL';
    formik.setFieldValue('type', newTypeValue);
  };

  const habldeSubmitInitialQuestion = async () => {
    const preguntaValue = formik.values.pregunta;

    if (isSubmitting) {
      return; // Evitar múltiples envíos si ya se está procesando una solicitud
    }

    setIsSubmitting(true);

    const typeValue = formik.values.esRepregunta ? 'SECONDARY' : 'INITIAL';

    // Obtener el ID de la pregunta inicial del formulario
    const initialQuestionId = formik.values.seleccionada;

    // Determinar el endpoint basado en el tipo de pregunta
    let endpoint = '/question/initial';
    if (typeValue === 'SECONDARY') {
      endpoint = '/question/secondary';
    }

    const requestData = {
      text: preguntaValue,
      type: typeValue,
      answer_id: initialQuestionId
    };

    try {
      const question = await ubuntuApi.post(endpoint, requestData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        },
      });

      console.log('Pregunta enviada', question.data);
      // habilitar esto cuando se arregle lo de las url protegidas: (permite recargar la pagina cuando se cargue un dato nuevo)
      window.location.reload();
    } catch (error) {
      console.log('Error al enviar la pregunta:', error);
    } finally {
      setIsSubmitting(false); // Habilitar nuevamente el botón de envío
    }
  };

  const habldeSubmitReply = async () => {
    const preguntaValue = formik.values.pregunta;

    const requestData = {
      text: formik.values.respuesta,
      id_question: selectedOption
    };

    try {
      const question = await ubuntuApi.post('/answer/create', requestData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        },
      });

      console.log('Pregunta enviada', question.data);
      // habilitar esto cuando se arregle lo de las url protegidas: (permite recargar la pagina cuando se cargue un dato nuevo)
      window.location.reload();
    } catch (error) {
      console.log('Error al enviar la pregunta:', error);
    }
  };

  const handleSubmitQuestion = (event, formik) => {
    formik.setFieldValue('pregunta', event.target.value)
  }

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const response = await ubuntuApi.get('/question/questionsNotActive', {
          headers: {
            Authorization: 'Bearer ' + getAccessToken(),
          },
        });
        setTimeout(() => {
          setQuestionList(response.data);
        }, 3000);

        console.log('Lista de preguntas no activas:', response.data);
      } catch (error) {
        console.error('Error al obtener la lista de preguntas:', error);
      }
    };
    fetchQuestionList();

    const fetchAnswerList = async () => {
      try {
        const response = await ubuntuApi.get('/answer/answersNotFull', {
          headers: {
            Authorization: 'Bearer ' + getAccessToken(),
          },
        });
        setTimeout(() => {
          setAnswerList(response.data);
        }, 3000);

        console.log('Lista de respuestas no activas:', response.data);
      } catch (error) {
        console.error('Error al obtener la lista de respuestas:', error);
      }
    }
    fetchAnswerList();
  }, [])

  return (
    <div>

      <div className="contact-section">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 5,
            px: 3,
            mx: 'auto',
          }}
          maxWidth="sm"
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.375rem',
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            Gestionador de Preguntas
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              width: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              id="pregunta"
              label="Texto de la Pregunta"
              fullWidth
              multiline
              rows={7}
              sx={{
                mt: 2,
              }}
              {...formik.getFieldProps('pregunta')}
              onChange={(event) => handleSubmitQuestion(event, formik)}
            />

            <Box>
              <Checkbox
                id="esRepregunta"
                checked={formik.values.esRepregunta}

                onChange={handleChange}
              />
              <label htmlFor="esRepregunta">Es repregunta</label>
            </Box>

            <FormControl fullWidth disabled={!formik.values.esRepregunta}>
              <InputLabel id="select-label">Seleccionar Respuesta</InputLabel>
              <Select
                labelId="select-label"
                id="seleccionada"
                value={selectedOption}
                onChange={handleSelectChange}
                label="Seleccionar respuesta"
              >
                {answerList !== undefined ? (
                  answerList.length > 0 ? (
                    answerList.map((answer, index) => (
                      <MenuItem key={index} value={answer.id}>
                        {answer.text}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value="">
                      Cargando respuestas...
                    </MenuItem>
                  )
                ) : (
                  <MenuItem disabled value="">
                    No se encontraron respuestas
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            <CustomButton
              type="submit"
              fullWidth
              sx={{
                my: 5,
              }}
              disabled={!formik.values.pregunta}
              onClick={habldeSubmitInitialQuestion}
            >
              Crear Pregunta
            </CustomButton>

          </Box>
        </Box>
      </div>

      {/* Formulario de Creacion de Respuesta*/}
      <div className="contact-section">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 5,
            px: 3,
            mx: 'auto',
          }}
          maxWidth="sm"
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.375rem',
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            Gestionador de Respuestas
          </Typography>
          <Typography
            variant="h4"
            color="primary.main"
            sx={{
              fontWeight: 600,
              mt: 4,
            }}
          >
            {title}
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              width: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="select-label">Seleccionar Pregunta</InputLabel>
              <Select
                labelId="select-label"
                id="seleccionada"
                value={selectedOption}
                onChange={handleSelectChange}
                label="Seleccionar pregunta"
              >
                {questionList !== undefined ? (
                  questionList.length > 0 ? (
                    questionList.map((question, index) => (
                      <MenuItem key={index} value={question.id}>
                        {question.text}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value="">
                      Cargando preguntas...
                    </MenuItem>
                  )
                ) : (
                  <MenuItem disabled value="">
                    No se encontraron preguntas
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              id="respuesta"
              label="Respuesta"
              fullWidth
              multiline
              rows={7}
              sx={{
                mt: 2,
              }}
              {...formik.getFieldProps('respuesta')}
              onChange={handleInputChange}
              error={formik.touched.respuesta && Boolean(formik.errors.respuesta)}
              helperText={formik.touched.respuesta && formik.errors.respuesta}
              disabled={!showResponse}
            />
            <CustomButton
              type="submit"
              fullWidth
              onClick={habldeSubmitReply}
              sx={{
                my: 5,
              }}
              disabled={!selectedOption || !formik.isValid || !showResponse || !formik.values.respuesta}
            >
              Enviar
            </CustomButton>
          </Box>
        </Box>
      </div>
      {/* End Formulario de Creacion de Respuesta*/}

      <CustomModal
        open={modalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
        icon={modalContent.icon}
        buttons={
          modalContent.icon === 'check'
            ? [{ text: 'Aceptar', onClick: handleCloseModal }]
            : [
              { text: 'Cancelar', onClick: handleCloseModal },
              { text: 'Intentar nuevamente', onClick: handleRetry },
            ]
        }
      />
    </div>
  );
};
