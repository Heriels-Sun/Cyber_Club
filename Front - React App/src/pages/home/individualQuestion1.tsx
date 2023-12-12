import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Button,
  Grid,
  GridItem,
  Image
} from '@chakra-ui/react';

// Componente IndividualQuestion
type IndividualQuestionProps = {
  questionId: string;
  text: string;
  updateAnswer: (questionId: string, answer: string) => void;
  selectedAnswer: string; // Nueva prop para mantener la opción seleccionada
};

type AllAnswers = {
  id: string;
  textAnswer1: string;
  textAnswer2: string;
  textAnswer3: string;
  textAnswer4: string;
};

function IndividualQuestion({ questionId, text, updateAnswer, selectedAnswer }: IndividualQuestionProps) {
  const allAnswers: AllAnswers[] = [
    { id: '1', textAnswer1:'Un sistema de almacenamiento en la nube.', textAnswer2:'Un libro digital de registros distribuidos.', textAnswer3:'Una red social encriptada.', textAnswer4:'Una nueva tecnología de juegos en línea.'},
    { id: '2', textAnswer1:'Comunicaciones instantáneas.', textAnswer2:'Almacenar y transferir datos de manera segura y transparente.', textAnswer3:'Mejorar la velocidad de Internet.', textAnswer4:'Crear efectos visuales en películas.'},
    { id: '3', textAnswer1:'Streaming de música.', textAnswer2:'Creación de identidades digitales.', textAnswer3:'Juegos de realidad virtual.', textAnswer4:'Diseño de moda.Diseño de moda.'},
    { id: '4', textAnswer1:'Un programa de televisión sobre finanzas.', textAnswer2:'Un nuevo sistema operativo.', textAnswer3:'Dinero digital o virtual basado en la tecnología blockchain.', textAnswer4:'Un tipo de tarjeta de crédito.'},
    { id: '5', textAnswer1:'Google Coin.', textAnswer2:'Ethereum.', textAnswer3:'Amazon Pay.', textAnswer4:'iMoney.'},
    { id: '6', textAnswer1:'A través de mensajes de texto.', textAnswer2:'Usando una red blockchain para registrar y verificar operaciones.', textAnswer3:'Con tarjetas de crédito.', textAnswer4:'Mediante transferencias bancarias tradicionales.'},
    { id: '7', textAnswer1:'El color de la interfaz.El color de la interfaz.', textAnswer2:'Acceso abierto a todos versus acceso restringido.', textAnswer3:'Una es para negocios, la otra para uso personal.', textAnswer4:'La velocidad de las transacciones.'},
    { id: '8', textAnswer1:'Solo expertos en tecnología.', textAnswer2:'Cualquier persona interesada.', textAnswer3:'Solo miembros seleccionados.', textAnswer4:'Personas invitadas por otros miembros.'},
    { id: '9', textAnswer1:'Para chats de grupo.', textAnswer2:'En empresas para manejar datos sensibles internamente.', textAnswer3:'Para actividades recreativas en línea.', textAnswer4:'En redes sociales.'},
    { id: '10', textAnswer1:'Un equipo de seguridad virtual.', textAnswer2:'La encriptación y el sistema de consenso distribuido.', textAnswer3:'La supervisión de un administrador.', textAnswer4:'Una contraseña única para cada usuario.'},
    { id: '11', textAnswer1:'Una técnica de marketing.', textAnswer2:'Un proceso de digitalización de documentos.', textAnswer3:'La conversión de información en un código para prevenir accesos no autorizados.', textAnswer4:'Un método de análisis de datos.'},
    { id: '12', textAnswer1:'Mediante el uso de múltiples servidores.', textAnswer2:'Distribuyendo la información a través de numerosos nodos.', textAnswer3:'Usando diferentes lenguajes de programación.', textAnswer4:'A través de actualizaciones de software regulares.'},
    { id: '13', textAnswer1:'Un componente de hardware.', textAnswer2:' Una unidad de almacenamiento de datos que forma parte de una cadena.', textAnswer3:'Un tipo de archivo de texto.', textAnswer4:'Una herramienta de diseño gráfico.'},
    { id: '14', textAnswer1:'Por votación popular.', textAnswer2:'Después de que las transacciones son verificadas y consolidadas por el proceso de minería o consenso.', textAnswer3:'Mediante un sorteo.', textAnswer4:'Con autorización del creador de la blockchain.'},
    { id: '15', textAnswer1:'Un tipo de código de barras.', textAnswer2:'Una función criptográfica que convierte datos en un valor alfanumérico único.', textAnswer3:'Una marca de agua digital.', textAnswer4:'Un término de programación para errores'},
  ];

  const handleSelectAnswer = (answer: string) => {
    updateAnswer(questionId, answer);
  };

  const insertLineBreaks = (text1: string, maxCharacters: number) => {
    const words = text1.split(' ');
    let currentLine = '';
    let result = '';
  
    words.forEach((word: string) => {
      if ((currentLine + word).length > maxCharacters) {
        result += `${currentLine.trim()}\n${word} `;
        result += ''
        currentLine = '';
      } else {
        currentLine += `${word} `;
      }
    });
  
    if (currentLine.length > 0) {
      result += currentLine.trim();
    }
  
    return result;
  };

  return (
    <Box p="4" borderRadius="md" my="4" overflowX="auto" minW="0" maxW="100%">
      <FormControl as="fieldset">

        <HStack spacing="27vh" alignItems="center" w="100%">
          <Box color="#A3A9B9" paddingLeft="3vh" w="58vh" h="14vh" fontSize="30px" textAlign="justify">{text}</Box>
          <Image w="34vh" h="20vh" src="https://online.stanford.edu/sites/default/files/inline-images/1600X900-How-does-blockchain-work.jpg" alt="Descripción de la imagen"/>
        </HStack>

        <RadioGroup defaultValue="" mt="2vh" color="white">
          <HStack spacing="50px" mb="2vh">
            <Button whiteSpace="pre-line"
              backgroundColor={selectedAnswer === 'Option 1' ? '#2C7A7B' : '#4A5B91'}
              w="63.9vh"
              h="11vh"
              borderRadius="md"
              textAlign="center"
              paddingLeft="20px"
              fontSize="16px"
              color={selectedAnswer === 'Option 1' ? '#CCC' : 'white'}
              _hover={{ backgroundColor: '#2C7A7B', color: '#CCC' }}
              onClick={() => handleSelectAnswer('Option 1')}
            >
              {insertLineBreaks(allAnswers[parseInt(questionId, 10) - 1].textAnswer1, 50)}
            </Button>
            <Button whiteSpace="pre-line"
              backgroundColor={selectedAnswer === 'Option 2' ? '#2C7A7B' : '#4A5B91'}
              w="63.9vh"
              h="11vh"
              borderRadius="md"
              textAlign="center"
              paddingLeft="20px"
              fontSize="16px"
              color={selectedAnswer === 'Option 2' ? '#CCC' : 'white'}
              _hover={{ backgroundColor: '#2C7A7B', color: '#CCC' }}
              onClick={() => handleSelectAnswer('Option 2')}
            >
              {insertLineBreaks(allAnswers[parseInt(questionId, 10) - 1].textAnswer2, 50)}
            </Button>
          </HStack>
          <HStack spacing="50px">
            <Button whiteSpace="pre-line"
              backgroundColor={selectedAnswer === 'Option 3' ? '#2C7A7B' : '#4A5B91'}
              w="63.9vh"
              h="11vh"
              borderRadius="md"
              textAlign="center"
              paddingLeft="20px"
              fontSize="16px"
              color={selectedAnswer === 'Option 3' ? '#CCC' : 'white'}
              _hover={{ backgroundColor: '#2C7A7B', color: '#CCC' }}
              onClick={() => handleSelectAnswer('Option 3')}
            >
              {insertLineBreaks(allAnswers[parseInt(questionId, 10) - 1].textAnswer3, 50)}
            </Button>
            <Button whiteSpace="pre-line"
              backgroundColor={selectedAnswer === 'Option 4' ? '#2C7A7B' : '#4A5B91'}
              w="63.9vh"
              h="11vh"
              borderRadius="md"
              textAlign="center"
              paddingLeft="20px"
              fontSize="16px"
              color={selectedAnswer === 'Option 4' ? '#CCC' : 'white'}
              _hover={{ backgroundColor: '#2C7A7B', color: '#CCC' }}
              onClick={() => handleSelectAnswer('Option 4')}
            >
              {insertLineBreaks(allAnswers[parseInt(questionId, 10) - 1].textAnswer4, 50)}
            </Button>
            </HStack>
          {/* ...Otras opciones */}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export {IndividualQuestion}