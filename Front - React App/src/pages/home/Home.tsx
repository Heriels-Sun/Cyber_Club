import React, { useEffect, useState } from 'react';
import { Flex, Button, Image, Box } from '@chakra-ui/react';
import { ReadState } from 'pages/conection/ReadState';
import { ButtonPlay } from './buttonPlay';
import { ChargingPage } from './ChargingPage';

function Home() {
  const [showWindow, setShowContent] = useState(true);
  document.body.style.backgroundColor = "#01031C";

  const handleButtonClick = (newValue: boolean) => {
    setShowContent(newValue); // Cambiar el estado para ocultar el contenido
  };

  return (
    <>
    {/* <ReadState/> */}
    {showWindow && (
    <Flex position="relative" alignItems="center">
      <Image
        ml="40vh"
        w="60%"
        h="50%"
        display="block"
        src="fondo1.png"
        alt="Descripción de la imagen"
      />
      <ButtonPlay handleButtonClick={handleButtonClick}/>
    </Flex>
    )}
    {showWindow && (
    <Box
      ml="40.2vh"
      w="59.6%"
      h="40vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start" // Para centrar vertical y horizontalmente
      bottom="0"
      fontWeight="semibold"
      backgroundColor="#010930"
      color="white"
    >
      <h1 style={{ fontSize: '2.2rem' }}><br/>WHY CYBER CLUB.</h1>
      <p><br/><br/>After several wars and the arrival of plagues, only a third of the global population survived. Humanity is forced <br/> to take refuge in fortified cities around the world. After decades of intense conflict, these cities are united under <br/>a single government, driven by technological advances and apparent peace, a new danger emerges from within. <br/>Be part of the resistance and fight for decentralization and freedom.</p>
    </Box>
    )}
    {!showWindow && (<ChargingPage />)}
    </>
  );
}

export { Home };
