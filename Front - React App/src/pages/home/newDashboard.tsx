import { useEffect, useState } from 'react';
import { ProgramMetadata } from "@gear-js/api";
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Heading, Center, Text, Button } from '@chakra-ui/react';
import fondo0 from './fondo00.png';
import fondo1 from './fondo01.png';
import fondo2 from './fondo02.png';
import fondo3 from './fondo03.png';
import { useAccount, useAlert, useApi } from '@gear-js/react-hooks';
import { GeneralQuestion } from './questions1'

import { useSailsCalls } from '@/app/hooks';

import { CONTRACT } from '@/app/consts';
import { web3FromSource } from '@polkadot/extension-dapp';
import { Codec, CodecClass, Signer } from '@polkadot/types/types';

function NewDashboard() {
    document.body.style.backgroundColor     = "";
    document.body.style.backgroundImage     = "linear-gradient(to bottom, black 60%, #0E0E53 100%)";
    document.body.style.backgroundRepeat    = "no-repeat";
    document.body.style.backgroundSize      = "cover";

    const [getStateCalled, setGetStateCalled] = useState(false);
    const { accounts, account } = useAccount();
    const { api } = useApi();
    const alert = useAlert();
    const [componenteActual, setComponenteActual] = useState<React.ReactNode | null>(null);
    const [fullState, setFullState] = useState<any | undefined>(0);
    let navigate = useNavigate();  // Obtén el hook useNavigate
    const sails = useSailsCalls();

    const goToMain = () => {
        navigate('/registeruser');  // Función para navegar a la ruta '/main'
    };

    const newAccount = () => {
        navigate('/registeruser');  // Función para navegar a la ruta '/main'
    };

    const goSelectActivity = () => {
        navigate('/activity');  // Función para navegar a la ruta '/main'
    };

    const goToQuestions = () => {
        navigate(`/generalquestion?vLevel=1`);
    };

    const programIDFT = CONTRACT.programId;

    // Add your metadata.txt
    const meta = CONTRACT.metadata;

    const metadata = ProgramMetadata.from(meta);

    useEffect(() => {
        if (!getStateCalled) {
            const getState = () => {
                if (!api) return;
                api.programState
                .read({ programId: programIDFT, payload: '' }, metadata)
                .then((result) => {
                    setFullState(result.toJSON());
                    const playerState = result.toJSON()
                    let register1: boolean = true;
                    const targetAddress = account?.decodedAddress;
                    if (playerState && typeof playerState === 'object' && 'players' in playerState) {
                        const players = playerState.players as any[];
                        console.log(players)
                        if (players.length === 0)
                            newAccount();

                        let findAccount = false;

                        for (let i = 0; i < players.length; i += 1) {
                            const [address, playerData] = players[i];
                            if (address === targetAddress) {
                                if(playerData.fullRegistered === true){
                                    console.log(playerData)
                                    console.log("Esta Registrado Full")
                                    findAccount = true;
                                    break
                                }
                                else{
                                    newAccount();
                                }
                            }else{
                                console.log("Entra aqui")
                            }
                        }
                        
                        if (!findAccount) newAccount();
                    }
                })
                .catch(({ message }: Error) => alert.error(message))
                .finally(() => {
                    setGetStateCalled(true);
                });
            };
            getState();
        }
    }, [api?.programState, metadata, setFullState, alert, getStateCalled, fullState, account]);

    return (
        <>
            <Center>
                <Heading as="h1" size="xl" color="yellow" mb="4" fontWeight="normal" fontFamily="Nasalization">
                    CHOOSE YOUR LEARNING PATH.
                </Heading>
            </Center>

            <Flex h="50vh"> {/* Usa vh en lugar de un valor fijo */}
                <Box
                w="50%"
                borderRadius="md"
                mx="10px"
                backgroundImage={`url(${fondo0})`}  // Estableces la imagen como fondo
                backgroundSize="cover"  // Asegura que la imagen cubra completamente el espacio del Box
                backgroundRepeat="no-repeat"  // Evita que la imagen se repita
                backgroundPosition="center"  // Centra la imagen en el Box
                >
                    <Box ml="10%" mt="5%"> {/* Usa porcentaje en lugar de px */}
                        <Heading as="h1" size="4xl" color="white" mt="10%" mb="0.5rem" fontFamily="Trebuchet MS">
                            WEB3
                        </Heading>
                        <Text color="white" fontSize="2rem" fontFamily="body"> {/* Usa rem en lugar de xl */}
                            Basic Level
                        </Text>
                        <Box mt="5vh" w="30%">
                            <Button
                                colorScheme=''
                                fontSize="2.6rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                                color="black"
                                w="22vh"
                                h="7vh"
                                minH="3rem"
                                p="0.5rem"
                                mt="6vh"
                                fontFamily="Nasalization"
                                borderRadius="0"
                                backgroundColor="#f4f756"
                                onClick={goSelectActivity}
                                sx={{
                                    clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'
                                  }}
                            >
                                START
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box
                    w="50%"
                    borderRadius="md"
                    mx="10px"
                    backgroundImage={`url(${fondo1})`}  // Estableces la imagen como fondo
                    backgroundSize="cover"  // Asegura que la imagen cubra completamente el espacio del Box
                    backgroundRepeat="no-repeat"  // Evita que la imagen se repita
                    backgroundPosition="center"  // Centra la imagen en el Box
                    >
                    <Box ml="10%" mt="5%"> {/* Usa porcentaje en lugar de px */}
                        <Heading as="h1" size="4xl" color="white" mt="9%" mb="0.5rem" fontFamily="Trebuchet MS">
                            VARA NETWORK1
                        </Heading>
                        <Text color="white" fontSize="2rem" fontFamily="body"> {/* Usa rem en lugar de xl */}
                            Basic Level
                        </Text>
                        <Box mt="5vh" w="30%">
                            <Button
                                colorScheme=''
                                fontSize="2.6rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                                color="black"
                                w="22vh"
                                h="7vh"
                                minH="3rem"
                                p="0.5rem"
                                mt="6vh"
                                fontFamily="Nasalization"
                                borderRadius="0"
                                backgroundColor="#f4f756"
                                onClick={goToQuestions}
                                sx={{
                                    clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'
                                }}
                            >
                                START
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Flex>

            <Flex h="25vh" marginTop="10px">
                <Flex w="50%" justifyContent="center">
                    <Box 
                        w="48%" 
                        borderRadius="md" 
                        marginLeft="8px" 
                        marginRight="8px"
                        backgroundImage={`url(${fondo2})`}  // Estableces la imagen como fondo
                        backgroundSize="cover"  // Asegura que la imagen cubra completamente el espacio del Box
                        backgroundRepeat="no-repeat"  // Evita que la imagen se repita
                        backgroundPosition="center"
                        >
                        <Box ml="15%" mt="5%"> {/* Usa porcentaje en lugar de px */}
                            <Heading as="h1" size="lg" color="white" mt="12%" mb="0.5rem" fontFamily="Trebuchet MS">
                                VARA NETWORK
                            </Heading>
                            <Box mt="5vh" w="30%">
                                <Button
                                    colorScheme=''
                                    fontSize="1.3rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                                    color="black"
                                    w="13vh" // Ancho automático
                                    h="3vh"
                                    minH="3rem"
                                    p="0.5rem"
                                    mt="10%" // Margen superior ajustado a 'rem'
                                    fontFamily="Nasalization"
                                    borderRadius="0"
                                    backgroundColor="#f4f756"
                                    sx={{
                                    clipPath: 'polygon(13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%, 0 13px)'
                                }}
                                >
                                    START
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        w="48%" 
                        borderRadius="md" 
                        marginLeft="8px" 
                        marginRight="8px"
                        backgroundImage={`url(${fondo3})`}  // Estableces la imagen como fondo
                        backgroundSize="cover"  // Asegura que la imagen cubra completamente el espacio del Box
                        backgroundRepeat="no-repeat"  // Evita que la imagen se repita
                        backgroundPosition="center"
                        >
                        <Box ml="15%" mt="5%"> {/* Usa porcentaje en lugar de px */}
                            <Heading as="h1" size="lg" color="white" mt="12%" mb="0.5rem" fontFamily="Trebuchet MS">
                                VARA NETWORK
                            </Heading>
                            <Box mt="5vh" w="30%">
                                <Button
                                    colorScheme=''
                                    fontSize="1.3rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                                    color="black"
                                    w="13vh" // Ancho automático
                                    h="3vh"
                                    minH="3rem"
                                    p="0.5rem"
                                    mt="10%" // Margen superior ajustado a 'rem'
                                    fontFamily="Nasalization"
                                    borderRadius="0"
                                    backgroundColor="#f4f756"
                                    sx={{
                                    clipPath: 'polygon(13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%, 0 13px)'
                                }}
                                >
                                    START
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Flex>
                <Flex w="50%" justifyContent="center">
                    <Box
                        w="48%" 
                        borderRadius="md" 
                        marginLeft="8px" 
                        marginRight="8px"
                        backgroundImage={`url(${fondo2})`}  // Estableces la imagen como fondo
                        backgroundSize="cover"  // Asegura que la imagen cubra completamente el espacio del Box
                        backgroundRepeat="no-repeat"  // Evita que la imagen se repita
                        backgroundPosition="center"
                        >

                        {/* [TODO] */}
                        <Box ml="15%" mt="5%"> {/* Usa porcentaje en lugar de px */}
                            <Heading as="h1" size="lg" color="white" mt="12%" mb="0.5rem" fontFamily="Trebuchet MS">
                                VARA NETWORKT
                            </Heading>
                            <Box mt="5vh" w="30%">
                                <Button
                                    colorScheme=''
                                    fontSize="1.3rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                                    color="black"
                                    w="13vh" // Ancho automático
                                    h="3vh"
                                    minH="3rem"
                                    p="0.5rem"
                                    mt="10%" // Margen superior ajustado a 'rem'
                                    fontFamily="Nasalization"
                                    borderRadius="0"
                                    backgroundColor="#f4f756"
                                    sx={{
                                    clipPath: 'polygon(13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%, 0 13px)'
                                    
                                }}
                                onClick={async () => {
                                    if (!sails) {
                                        console.log("Sails no se a iniciado");
                                        return;
                                    }

                                    if (!account) {
                                        console.log("Account no esta listo");
                                        return;
                                    }

                                    const { signer } = await web3FromSource(account.meta.source);

                                    const response  = await sails.command(
                                        'Ping/Ping',
                                        {
                                            userAddress: account.decodedAddress,
                                            signer: (signer as CodecClass<Codec, any[]>) as Signer
                                        },
                                        {
                                            callArguments: [

                                            ],
                                            callbacks: {
                                                onLoad() { alert.info('se cargara un mensaje') },
                                                onBlock(blockHash) { console.log('En bloque: ', blockHash) },
                                                onSuccess() { alert.success('Se mando el mensaje') },
                                                onError() { alert.error('Error al mandar el mensaje') }
                                            }
                                        }
                                    );

                                    console.log("Response: ", JSON.stringify(response));

                                    const state = await sails.query(
                                        'QueryService/LastWhoCall',
                                        {
                                            callArguments: [
                                                "primero estaba este",

                                            ]
                                        }
                                    );

                                    console.log('Estado:', JSON.stringify(state));
                                }}
                                >
                                    START
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        w="48%" 
                        borderRadius="md" 
                        marginLeft="8px" 
                        marginRight="8px"
                        backgroundImage={`url(${fondo3})`}  // Estableces la imagen como fondo
                        backgroundSize="cover"  // Asegura que la imagen cubra completamente el espacio del Box
                        backgroundRepeat="no-repeat"  // Evita que la imagen se repita
                        backgroundPosition="center"
                        >
                        <Box ml="15%" mt="5%"> {/* Usa porcentaje en lugar de px */}
                            <Heading as="h1" size="lg" color="white" mt="12%" mb="0.5rem" fontFamily="Trebuchet MS">
                                VARA NETWORK
                            </Heading>
                            <Box mt="5vh" w="30%">
                                <Button
                                    colorScheme=''
                                    fontSize="1.3rem" // Mayor tamaño de fuente para el segundo botón, también en 'rem'
                                    color="black"
                                    w="13vh" // Ancho automático
                                    h="3vh"
                                    minH="3rem"
                                    p="0.5rem"
                                    mt="10%" // Margen superior ajustado a 'rem'
                                    fontFamily="Nasalization"
                                    borderRadius="0"
                                    backgroundColor="#f4f756"
                                    sx={{
                                    clipPath: 'polygon(13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%, 0 13px)'
                                }}
                                >
                                    START
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}

export { NewDashboard };