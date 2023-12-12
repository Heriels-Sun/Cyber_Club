import { Box, Flex, Text, Button, Tag, TagLabel, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {HeaderGeneral} from './HeaderGeneral';
import {IconoNFT} from './icononft';

type Props = {
  state: string;
};

function NewAccount({ state }: Props) {
  const listaDeUrls = [
    { id: '1', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '2', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '3', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '4', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '5', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    // { id: '6', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' }, 
  ];
  
  return (
    <>
      <HeaderGeneral helpText="Welcome" />

      <Box
      w="100vh"
      h="auto"
      backgroundColor="#4A5B91"
      color="white"
      borderRadius="md"
      marginTop="2vh"
      overflowX="auto"
      display="flex"
      flexWrap="nowrap"
      minW="100%"
      maxW="100%"
      justifyContent="center" /* Centrar contenido horizontalmente */
      alignItems="center" /* Centrar contenido verticalmente */
      textAlign="center" /* Centrar texto */
      >
        <Box
          w="100%" /* Ajustar ancho para el contenido dentro del contenedor */
          px="20px" /* Añadir relleno horizontal */
          py="20px" /* Añadir relleno vertical */
        >
          <Text fontFamily="Comic Sans MS" fontSize="xl" fontWeight="bold">
            WELCOME {state}
          </Text>
          <Text fontFamily="Comic Sans MS" fontSize="md" mt="10px">
            CHOOSE AN AVATAR TO START YOUR CYBERCLUB JOURNEY
          </Text>
        </Box>
      </Box>

      <Box
        w="100vh"
        h="auto"
        backgroundColor="#4A5B91"
        borderRadius="md"
        marginTop="2vh"
        overflowX="auto"
        justifyContent="center"
        display="flex" /* Para que los elementos hijos se coloquen en línea */
        flexWrap="nowrap" /* Evita que los elementos se envuelvan */
        minW="100%"
        maxW="100%"
      >
        {listaDeUrls.map(({ id, url }) => (
        <Box
          key={id} // Usando un identificador único asociado a la URL
          w="20%"
          h="33.5vh"
          borderRadius="md"
          marginTop="8vh"
          justifyContent="center"
          alignItems="center"
          flexShrink="0" /* Evita que el contenedor se encoja más */
        >
          <IconoNFT
            imageUrl={url}
            onChooseNFT={() => {
              // Lógica para manejar la selección del NFT
              console.log('NFT seleccionado');
            }}
          />
        </Box>
      ))}
      </Box>
    </>
  );
}

export { NewAccount };