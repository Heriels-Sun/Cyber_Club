import { useState, useEffect } from 'react';
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { Flex, Box, Button, Image } from '@chakra-ui/react';
import { HamburgerIcon, ChevronRightIcon } from '@chakra-ui/icons';
import myImage from './desarrollado_por.jpg';
import { NewAccount } from './newAccount';
import { Perfil } from './perfil';
import { Questions } from './questions';
import { ReadStates } from '../conection/readStates';
import { ReadState } from '../conection/ReadState';

function NewWindow1() {
    document.body.style.backgroundImage = "";
    const [componenteActual, setComponenteActual] = useState<React.ReactNode | null>(null);

    const handleClick = (texto: string) => {
        switch (texto) {
          case 'Inicio':
                setComponenteActual(<NewAccount state="BENITO" />);
            break;
          case 'Perfil':
                setComponenteActual(<Perfil state="asdf" />);
            break;
          case 'Puntos':
                setComponenteActual(<Questions/>);
            break;
          case 'Marketplace':
                setComponenteActual(null);
            break;
          case 'Ajustes':
                setComponenteActual(null);
            break;
          default:
                setComponenteActual(null);
            break;
        }
      };

    return (
        <>
            {/* <ReadState/> */}
            <Flex>
                {/* Lado izquierdo */}
                <Box w="15%" h="65vh" backgroundColor="#021243" borderRadius="md" overflowX="auto" minW="0" maxW="100%">
                    {/* Menú con 5 opciones */}
                    <Flex direction="column" mt="6" alignItems="flex-start">
                        <Button variant="link" mb="10" color="white" ml="40px" leftIcon={<HamburgerIcon />} onClick={() => handleClick('Inicio')}>
                            Inicio
                        </Button>
                        <Button variant="link" mb="10" color="white" ml="40px" leftIcon={<ChevronRightIcon />} onClick={() => handleClick('Perfil')}>
                            Perfil
                        </Button>
                        <Button variant="link" mb="10" color="white" ml="40px" leftIcon={<ChevronRightIcon />} onClick={() => handleClick('Puntos')}>
                            Puntos
                        </Button>
                        <Button variant="link" mb="10" color="white" ml="40px" leftIcon={<ChevronRightIcon />} onClick={() => handleClick('Marketplace')}>
                            Marketplace
                        </Button>
                        <Button variant="link" mb="10" color="white" ml="40px" leftIcon={<ChevronRightIcon />} onClick={() => handleClick('Ajustes')}>
                            Ajustes
                        </Button>
                    </Flex>
                </Box>

                {/* Centro */}
                <Box w="70%" h="65vh" backgroundColor="#021243" borderRadius="md" marginLeft="10px" marginRight="10px" overflowY="auto" minH="0" maxH="100%">
                    {componenteActual}
                </Box>

                {/* Lado derecho */}
                <Box w="15%" h="65vh" backgroundColor="#021243" borderRadius="md" overflowX="auto" minW="0" maxW="100%">
                    {/* Menú con más botones */}
                    <Flex direction="column" mt="2" alignItems="flex-start">
                        <Box backgroundColor="#4A5B91" as="span" w="100%" h="5vh" borderRadius="md" textAlign='left' paddingLeft="20px" fontSize="22px" color="#CCC">
                            BLOCKCHAIN
                        </Box>
                        <Button variant="link" mb="10" color="white" ml="40px" marginTop="40px">
                            1. Basic
                        </Button>
                        <Button variant="link" mb="10" ml="40px" color="white">
                            2. Intermedio
                        </Button>
                        <Button variant="link" mb="10" ml="40px" color="white">
                            3. Avanzado
                        </Button>
                        <Button colorScheme='teal' color="#CCC" variant='solid' w="96%" h="4vh" marginLeft="2%" marginTop="10px" backgroundColor="#4A5B91">
                            VARA NETWORK
                        </Button>
                        <Button colorScheme='teal' color="#CCC" variant='solid' w="96%" h="4vh" marginLeft="2%" marginTop="20px" backgroundColor="#4A5B91">
                            MARKETING WEB3
                        </Button>
                        <Button colorScheme='teal' color="#CCC" variant='solid' w="96%" h="4vh" marginLeft="2%" marginTop="20px" backgroundColor="#4A5B91">
                            INTELIGENCIA ARTIFICIAL
                        </Button>
                    </Flex>
                </Box>
            </Flex>
            <Flex>
                {/* Nuevo Flex 1 */}
                <Box w="85%" h="20vh" alignItems="center" backgroundColor="#021243" borderRadius="md" marginTop="10px" display="flex" marginRight="10px" overflowX="auto" minW="0" maxW="100%">
                    <Image src={myImage} alt="Desarrollado Por Equipo Reve" marginLeft="6vh" marginTop="0.5" width="160px" height="180px" />
                </Box>
            
                {/* Nuevo Flex 2 */}
                <Box w="15%" h="20vh" backgroundColor="#021243" borderRadius="md" marginTop="10px" />
            </Flex>
        </>
    );
}

export { NewWindow1 };