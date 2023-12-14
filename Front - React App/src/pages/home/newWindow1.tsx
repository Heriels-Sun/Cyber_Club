import { useState, useEffect } from 'react';
import { ProgramMetadata } from "@gear-js/api";
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { Flex, Box, Button, Image, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import { HamburgerIcon, ChevronRightIcon } from '@chakra-ui/icons';
import myImage from './PoweredByVara.svg';
import P from './banner.png';
import { NewAccount } from './newAccount';
import { Questions } from './questions';
import { MapProgress } from './mapProgress';

function NewWindow1() {
    document.body.style.backgroundImage = "";
    const [componenteActual, setComponenteActual] = useState<React.ReactNode | null>(null);
    const [getStateCalled, setGetStateCalled] = useState(false);
    const [register, setRegister] = useState(false);
    const { api } = useApi();
    const alert = useAlert();
    const [fullState, setFullState] = useState<any | undefined>(0);
    const [module, setModule] = useState("")
    const { accounts, account } = useAccount();

    const programIDFT =
    "0xe69727180e6a43860f5195c7023052766baad4938400f44e6be709a89e5f087f";

    // Add your metadata.txt
    const meta =
    "00010000000100000000010600000000000000010800000041114c000808696f3843796265724d657373616765496e000120284164644e657755736572000000384d6f64696679557365726e616d650400040118537472696e670001003c4d6f64696679557365724c6576656c04000801144c6576656c000200404d6f64696679557365724d6f64756c6504000c01184d6f64756c65000300404d6f6469667955736572506f696e7473040010010c7536340004004046756c6c5265676973746572557365720400040118537472696e67000500444d6f6469667955736572417474656d707304001401087538000600384164644e657750726f67726573730c000801144c6576656c00000c01184d6f64756c650000140108753800070000040000050200080808696f144c6576656c00010c2042656767696e657200000030496e7465726d65646961746500010020416476616e636564000200000c0808696f184d6f64756c65000114144669727374000000185365636f6e6400010014546869726400020018466f7572746800030014466966746800040000100000050600140000050300180808696f3c43796265724d6573736167654f75740001202c557365724372656174656400000040557365726e616d654d6f64696669656400010044557365724c6576656c4d6f64696669656400020048557365724d6f64756c654d6f6469666965640003004855736572506f696e74734d6f646966696564000400485573657246756c6c526567697374657265640005004c55736572417474656d70736d6f646966696564000600404e657750726f6772657373416464656404001c0110626f6f6c000700001c0000050000200808696f30496f43796265725374617465000008011c706c617965727324016c5665633c284163746f7249642c204379626572506c61796572293e00012073706f6e736f72734001745665633c284163746f7249642c20437962657253706f6e736f7273293e000024000002280028000004082c34002c10106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004003001205b75383b2033325d000030000003200000001400340808696f2c4379626572506c6179657200001c01106e616d65040118537472696e6700013c66756c6c5f726567697374657265641c0110626f6f6c000118706f696e747310010c75363400013463757272656e745f6c6576656c0801144c6576656c00013863757272656e745f6d6f64756c650c01184d6f64756c65000128737461646973746963733801505665633c4379626572537461646973746963733e00012c7472795f666f725f64617914010875380000380000023c003c0808696f3c43796265725374616469737469637300000c01146c6576656c0801144c6576656c0001186d6f64756c650c01184d6f64756c6500011473636f72651401087538000040000002440044000004082c4800480808696f34437962657253706f6e736f72730000080108696414010875380001106e616d65040118537472696e670000";

    const metadata = ProgramMetadata.from(meta);
    console.log(account?.meta?.name)

    useEffect(() => {
        if (!getStateCalled) {
            const getState = () => {
                api.programState
                .read({ programId: programIDFT, payload: '' }, metadata)
                .then((result) => {
                    setFullState(result.toJSON());
                    const playerState = result.toJSON()
                    let register1: boolean = true;
                    const targetAddress = account?.decodedAddress;
                    if (playerState && typeof playerState === 'object' && 'players' in playerState) {
                        const players = playerState.players as any[];
                        if (players.length === 0)
                            setComponenteActual(<NewAccount state={account?.meta?.name || 'Jugador 1'} />);
                        for (let i = 0; i < players.length; i += 1) {
                            const [address, playerData] = players[i];
                            if (address === targetAddress) {
                                console.log(playerData)
                                if(playerData.fullRegistered === true){
                                    setRegister(true)
                                    setModule(playerData.currentModule)
                                    sessionStorage.setItem('miClave', String(playerData.points));
                                    register1 = false
                                    setComponenteActual(<MapProgress status="city.jpg" cardinal={playerData.currentModule}/>);
                                }
                                else{
                                    console.log("xd")
                                    setComponenteActual(<NewAccount state={account?.meta?.name || 'Jugador 1'}/>);
                                }
                            }else{
                                console.log("medio xd")
                                if(register1){
                                    console.log("doble xd")
                                    setComponenteActual(<NewAccount state={account?.meta?.name || 'Jugador 1'} />);
                                }
                            }
                        }
                    }
                })
                .catch(({ message }: Error) => alert.error(message))
                .finally(() => {
                    setGetStateCalled(true);
                });
            };
    
            getState();
        }
    }, [api.programState, metadata, setFullState, alert, getStateCalled, fullState, account]);

    const handleClick = (texto: string) => {
        switch (texto) {
            case 'Inicio':
                if (register)
                    setComponenteActual(<MapProgress status="city.jpg" cardinal={module}/>);
                else
                    setComponenteActual(<NewAccount state={account?.meta?.name || 'Jugador 1'} />);
                break;
            case 'Perfil':
                break;
            case 'Puntos':
                setComponenteActual(null);
                break;
            case 'Marketplace':
                    setComponenteActual(null);
                break;
            case 'Ajustes':
                    setComponenteActual(null);
                break;
            case 'BasicModule1':
                setComponenteActual(<Questions module="Nivel: Básico, Módulo 1" numberModule={1}/>);
            break;
            case 'BasicModule2':
                setComponenteActual(<Questions module="Nivel: Básico, Módulo 2" numberModule={2}/>);
            break;
            case 'BasicModule3':
                setComponenteActual(<Questions module="Nivel: Básico, Módulo 3" numberModule={3}/>);
            break;
            case 'BasicModule4':
                setComponenteActual(<Questions module="Nivel: Básico, Módulo 4" numberModule={4}/>);
            break;
            case 'BasicModule5':
                setComponenteActual(<Questions module="Nivel: Básico, Módulo 5" numberModule={5}/>);
            break;
            default:
                setComponenteActual(null);
                break;
        }
      };

    return (
        <>
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
                        <Accordion allowToggle border="#021243" mt="3vh">
                            <AccordionItem>
                                <h2>
                                    <AccordionButton ml="1vh" width="27.5vh" sx={{
                                        "&:hover": {
                                        // Estilos al pasar el cursor sobre el botón
                                        borderBottom: "2px solid white",
                                        // Agrega cualquier otro estilo hover deseado
                                        },
                                    }}>
                                        <Box as="span" flex='1' textAlign='left' color="white" fontSize="1.1rem" fontWeight="semibold">
                                            1. Basic
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block" onClick={() => handleClick('BasicModule1')}>
                                        - Module 1
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block" onClick={() => handleClick('BasicModule2')}>
                                        - Module 2
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block" onClick={() => handleClick('BasicModule3')}>
                                        - Module 3
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block" onClick={() => handleClick('BasicModule4')}>
                                        - Module 4
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block" onClick={() => handleClick('BasicModule5')}>
                                        - Module 5
                                    </Button>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton ml="1vh" width="27.5vh" sx={{
                                        "&:hover": {
                                        // Estilos al pasar el cursor sobre el botón
                                        borderBottom: "2px solid white",
                                        // Agrega cualquier otro estilo hover deseado
                                        },
                                    }}>
                                        <Box as="span" flex='1' textAlign='left' color="white" fontSize="1.1rem" fontWeight="semibold">
                                            2. Intermediate
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 1
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 2
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 3
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 4
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 5
                                    </Button>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton ml="1vh" width="27.5vh" sx={{
                                        "&:hover": {
                                        // Estilos al pasar el cursor sobre el botón
                                        borderBottom: "2px solid white",
                                        // Agrega cualquier otro estilo hover deseado
                                        },
                                    }}>
                                        <Box as="span" flex='1' textAlign='left' color="white" fontSize="1.1rem" fontWeight="semibold">
                                            3. Advanced
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 1
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 2
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 3
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 4
                                    </Button>
                                    <Button variant="link" mb="2" color="white" ml="1vh" textAlign="left" w="100%" display="block">
                                        - Module 5
                                    </Button>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        <Button colorScheme='teal' color="#CCC" variant='solid' w="96%" h="4vh" marginLeft="2%" marginTop="30px" backgroundColor="#4A5B91">
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
                    <Image src={myImage} style={{ opacity: 0.85 }} alt="Desarrollado Por Equipo Reve" marginLeft="6vh" marginTop="0.5" width="160px" height="180px" />
                    <Image src={P} alt="Desarrollado Por Equipo Reve" marginLeft="7vh" width="100%" height="100%" />
                </Box>
                
                {/* Nuevo Flex 2 */}
                <Box w="15%" h="20vh" backgroundColor="#021243" borderRadius="md" marginTop="10px" />
            </Flex>
        </>
    );
}

export { NewWindow1 };