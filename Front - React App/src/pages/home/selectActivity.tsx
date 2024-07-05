import { useState } from 'react';
import { ProgramMetadata } from '@gear-js/api';
import { web3FromSource } from "@polkadot/extension-dapp";
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { Box, Text, Heading, Flex, Button } from '@chakra-ui/react';

function SelectActivity() {
  document.body.style.backgroundImage             = "url('fondo02.jpg')";
  document.body.style.backgroundAttachment        = "fixed";
  document.body.style.backgroundSize              = "cover";

  const { accounts, account } = useAccount();
  const { api } = useApi();
  const alert = useAlert();

  return (
      <>
          <Box w="100%" textAlign="left" mt="18vh" ml="14vh">
            <Heading fontSize="150px" color="white" mb="4" fontFamily={"PixelSplitter"}>
              WEB 3
            </Heading>
            <Text fontSize="95px" color="white" fontFamily={"Trebuchet MS"} mt="-5vh" ml={"1vh"}>
              Basic Level
            </Text>
          </Box>

          <Flex h="65vh" mt={"10vh"}>
            <Box w="33%" h="100%" display="flex" justifyContent={"center"}>
              <Button
                colorScheme=''
                fontSize="2.6rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                color="black"
                w="auto"
                h="8vh"
                minH="3rem"
                p="2.8rem 2rem"
                mt="6vh"
                fontFamily="Nasalization"
                borderRadius="0"
                backgroundColor="#FD00FF"
                sx={{
                    clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)'
                  }}
              >
                VIEW STORY
              </Button>
            </Box>
            <Box w="33%" h="100%" display="flex" justifyContent={"center"}>
              <Button
                colorScheme=''
                fontSize="2.6rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                color="black"
                w="auto"
                h="8vh"
                minH="3rem"
                p="2.8rem 2rem"
                mt="6vh"
                fontFamily="Nasalization"
                borderRadius="0"
                backgroundColor="white"
                sx={{
                    clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)'
                  }}
              >
                START COURSE
              </Button>
            </Box>
            <Box w="33%" h="100%" display="flex" justifyContent={"center"}>
              <Button
                colorScheme=''
                fontSize="2.6rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                color="black"
                w="auto"
                h="8vh"
                minH="3rem"
                p="2.8rem 2rem"
                mt="6vh"
                fontFamily="Nasalization"
                borderRadius="0"
                backgroundColor="#F5FF03"
                sx={{
                    clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)'
                  }}
              >
                START GAME
              </Button>
            </Box>
          </Flex>
      </>
  );
}

export { SelectActivity };