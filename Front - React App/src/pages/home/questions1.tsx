import { useAccount, useApi, useAlert, TemplateAlertOptions } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { decodeAddress, HexString, ProgramMetadata } from '@gear-js/api';
import { Box, Link, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, ModalFooter, Flex, Text, HStack, Tag, TagLabel} from '@chakra-ui/react';
import { useState, useEffect, useContext, CSSProperties } from 'react';
import { IndividualQuestion } from './individualQuestion1';
import imgEnemy from './nft/enemy.png';
import btnTitulo from './btn-titulo.svg';
import dialogueBubble from './dialogueBubble.svg';
import { useContractUtils, useVoucherUtils, } from '@/app/hooks';
import { sponsorName,sponsorMnemonic} from '@/app/consts';
import { CONTRACT } from '@/app/consts';
import { useNavigate } from "react-router-dom";

import { renewVoucher, addTokensToVoucher } from "@/app/utils";
import { useSailsCalls } from "@/app/hooks";
import { Codec, CodecClass, Signer } from '@polkadot/types/types';

type Question = {
  id: string;
  text: string;
};

type CorrectAnswers = {
  idquestion:       number;
  idcorrectanswer:  number;
};

function GeneralQuestion() {
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = "linear-gradient(to right, #000828 69%, black 31%)";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  // const {
  //   sendMessageWithVoucher
  // } = useContractUtils();
  // const { 
  //   generateNewVoucher,
  //   checkVoucherForUpdates,
  //   vouchersInContract
  // } = useVoucherUtils(sponsorName, sponsorMnemonic);

  const sails = useSailsCalls();
  const navigate = useNavigate();
 
  const numberModule = 1
  const { isOpen: isOpenFirstModal, onOpen: onOpenFirstModal, onClose: onCloseFirstModal } = useDisclosure();
  const { isOpen: isOpenSecondModal, onOpen: onOpenSecondModal, onClose: onCloseSecondModal } = useDisclosure();
  const { isOpen: isOpenThirdModal, onOpen: onOpenThirdModal, onClose: onCloseThirdModal } = useDisclosure();

  const handleCloseFirstAndReload = () => {
    onCloseFirstModal(); // Cierra el modal usando la función onClose proporcionada por useDisclosure
  };

  const handleCloseSecondAndReload = () => {
    onCloseSecondModal(); // Cierra el modal usando la función onClose proporcionada por useDisclosure
    window.location.reload(); // Recarga la página
  };

  const handleCloseThirdAndReload = () => {
    onCloseThirdModal(); // Cierra el modal usando la función onClose proporcionada por useDisclosure
    window.location.reload(); // Recarga la página
  };

  const correctanswers: CorrectAnswers[] = [
    { idquestion: 1, idcorrectanswer: 2 },
    { idquestion: 2, idcorrectanswer: 2 },
    { idquestion: 3, idcorrectanswer: 2 },
    { idquestion: 4, idcorrectanswer: 3 },
    { idquestion: 5, idcorrectanswer: 2 },
    { idquestion: 6, idcorrectanswer: 2 },
    { idquestion: 7, idcorrectanswer: 2 },
    { idquestion: 8, idcorrectanswer: 2 },
    { idquestion: 9, idcorrectanswer: 2 },
    { idquestion: 10, idcorrectanswer: 2 },
    { idquestion: 11, idcorrectanswer: 3 },
    { idquestion: 12, idcorrectanswer: 2 },
    { idquestion: 13, idcorrectanswer: 2 },
    { idquestion: 14, idcorrectanswer: 2 },
    { idquestion: 15, idcorrectanswer: 2 },
  ];

  const questions: Question[] = [
    { id: '1', text: '¿Qué es una blockchain?' },
    { id: '2', text: '¿Cuál es el propósito principal de la tecnología blockchain?' },
    { id: '3', text: 'Menciona un ejemplo de uso de la blockchain aparte de las criptomonedas.' },
    { id: '4', text: '¿Qué es una criptomoneda?' },
    { id: '5', text: 'Nombra una criptomoneda que no sea Bitcoin.' },
    { id: '6', text: '¿Cómo se realizan las transacciones con criptomonedas?' },
    { id: '7', text: '¿Cuál es la diferencia entre una blockchain pública y una privada?' },
    { id: '8', text: '¿Quién puede unirse a una blockchain pública?' },
    { id: '9', text: '¿En qué situaciones se podría preferir usar una blockchain privada?' },
    { id: '10', text: '¿Qué hace seguras a las transacciones en blockchain?' },
    { id: '11', text: '¿Qué es la encriptación en el contexto de blockchain?' },
    { id: '12', text: '¿Cómo contribuye la descentralización a la seguridad de la blockchain?' },
    { id: '13', text: 'Principios Básicos de las Transacciones en Blockchain' },
    { id: '14', text: '¿Cómo se añade un nuevo bloque a la blockchain?' },
    { id: '15', text: '¿Qué es un "hash" en blockchain y por qué es importante?' },
  ];

  function getQuestionsByNumberModule(): Question[] {
    const maxQuestions = numberModule * 3;
    const minQuestions = Math.max(0, maxQuestions - 3); // Límite inferior nunca puede ser menor que 0
  
    return questions.slice(minQuestions, Math.min(maxQuestions, questions.length));
  }

  const finalQuestions = getQuestionsByNumberModule();

  const [currentQuestion, setCurrentQuestion]   = useState(0);
  const [selectedOptions, setSelectedOptions]   = useState<Record<string, string>>({});
  const [time, setTime]                         = useState(0);
  const [time2, setTime2]                       = useState(0);
  const [minutes, setMinutes]                   = useState(0);
  const [flag, setStart]                        = useState(false);
  const { accounts, account }                   = useAccount();
  const { api }                                 = useApi();
  const alert                                   = useAlert();


  const signer = async (puntos: number) => {
    if (!sails) {
      alert.error('SailsCalls no esta listo');
      return;
    }

    if (!account) {
      alert.error('Cuenta no esta lista');
      return;
    }

    let moduloname;

    if (numberModule >= 1 && numberModule <= 3) {
      moduloname = "First";
    } else if (numberModule >= 4 && numberModule <= 6) {
      moduloname = "Second";
    } else if (numberModule >= 7 && numberModule <= 9) {
      moduloname = "Third";
    } else if (numberModule >= 10 && numberModule <= 12) {
      moduloname = "Fourth";
    } else if (numberModule >= 13 && numberModule <= 15) {
      moduloname = "Fifth";
    }

    let voucherIdToUse1 = await sails.vouchersInContract(
      account.decodedAddress
    )

    if (voucherIdToUse1.length === 0) {
      try {
        const voucherId = await sails.createVoucher(
          account.decodedAddress,
          2, // 2 tokens
          1_200, // Una hora (1200 bloques)
          {
            onLoad() { alert.info('Se creara un voucher') },
            onError() { alert.error('Error al crear el voucher') },
            onSuccess() { alert.success('Se creo un voucher!') }
          }
        );
  
        voucherIdToUse1.push(voucherId);
      } catch (e) {
        console.error(e);
        return;
      }
      
    }

    console.log('Vouchers: ', voucherIdToUse1);

    try {
      await renewVoucher(
        sails,
        account.decodedAddress,
        voucherIdToUse1[0],
        1_200, // Se renueva por otra hora
        {
          onLoad() { alert.info('Se renovara el voucher') },
          onError() { alert.error('Error al renovar el voucher') },
          onSuccess() { alert.success('Se renovo el voucher!') }
        }
      );
    } catch(e) {
      console.error(e);
      console.log('Error al renovar el voucher');
      return;
    }

    try {
      await addTokensToVoucher(
        sails,
        account.decodedAddress,
        voucherIdToUse1[0],
        1, // Agregar un token
        2, // Tokens minimo que debe de tener el contrato
        {
          onLoad() { alert.info('Se agregaran tokens al voucher') },
          onError() { alert.error('Error al agregar tokens al voucher') },
          onSuccess() { alert.success('Se agregaron tokens al voucher') }
        }
      )
    } catch (e) {
      console.error(e);
      console.log('Error al agregar tokens al voucher');
      return;
    }


    // const y: CSSProperties = {
    //   color: 'white',
    //   // backgroundColor: 'white'
    // };
    // const x: TemplateAlertOptions = {
    //   style: y
    // }
    // if (!account) {
    //   alert.error("Accounts not ready!");
    //   return;
    // }

    // let voucherIdToUse;

    // const vouchersForAddress = await voucherIdOfActualPolkadotAccount(CONTRACT.programId);

    // if (vouchersForAddress.length === 0) {
    //   voucherIdToUse = await createVoucherForCurrentPolkadotAccount(CONTRACT.programId);
    // } else {
    //   voucherIdToUse = vouchersForAddress[0];
    //   await manageVoucherId(voucherIdToUse);
    // }

    const { signer: signer2 } = await web3FromSource(account.meta.source);

    try {
      const response = await sails.command(
        'Ping/Ping',
        {
          userAddress: account.decodedAddress,
          signer: (signer2 as CodecClass<Codec, any[]>) as Signer
        },
        {
          voucherId: voucherIdToUse1[0],
          callbacks: {
            onLoad() { alert.info('Se mandara un mensaje con voucher') },
            onSuccess() { alert.success('Se mando un mensaje con voucher!') },
            onBlock(blockHash) { console.log('Mnesaje en bloque: ', blockHash) },
            onError() { alert.error('Error al mandar un mensaje con voucher') }
          }
        }
      );

      console.log('Response: ', response);

        // await sendMessageWithVoucher(
        //     account.decodedAddress,
        //     voucherIdToUse,
        //     account.meta.source,
        //     CONTRACT.programId,
        //     CONTRACT.metadata,
        //     { AddNewProgress: [
        //       "Begginer", moduloname, puntos
        //       ]
        //     },
        //     0,
        //     () => {
        //       alert.success('Message send with voucher!', x);
        //       navigate('/');
        //     },
        //     () => alert.error('Failed while sending message with voucher', x),
        //     () => alert.info('Message is in blocks', x),
        //     () => alert.info('Will send message', x)
        // );


    } catch (e) {
        alert.error('Error while sending message');
    }

  };






  // const voucherIdOfActualPolkadotAccount = async (contractId: HexString): Promise<HexString[]> => {
  //   return new Promise(async (resolve, reject) => {
  //       if (!account) {
  //           alert.error('Account is not ready');
  //           reject('Account is not ready');
  //           return;
  //       }

  //       const vouchersId = await vouchersInContract(
  //           contractId,
  //           account.decodedAddress
  //       );

  //       resolve(vouchersId);
  //   });
  // }

  // const manageVoucherId = async (voucherId: HexString): Promise<void> => {
  //     return new Promise(async (resolve, reject) => {
  //         if (!account) {
  //             alert.error('Account is not ready');
  //             reject('Account is not ready');
  //             return;
  //         }

  //         const y: CSSProperties = {
  //           color: 'white',
  //           // backgroundColor: 'white'
  //         };
  //         const x: TemplateAlertOptions = {
  //           style: y
  //         }

  //         try {
  //             await checkVoucherForUpdates(
  //                 account.decodedAddress, 
  //                 voucherId,
  //                 1, // add one token to voucher if needed
  //                 1_200, // new expiration time (One hour )
  //                 2, // Minimum balance that the voucher must have
  //                 () => alert.success('Voucher updated!', x),
  //                 () => alert.error('Error while checking voucher', x),
  //                 () => alert.info('Will check for updates in voucher', x)
  //             )
  //             resolve();
  //         } catch (e) {
  //             alert.error('Error while check voucher');
  //         }
  //     });
  // }

  // const createVoucherForCurrentPolkadotAccount = async (contractId: HexString): Promise<HexString> => {
  //     return new Promise(async (resolve, reject) => {
  //         if (!account) {
  //             alert.error('Account is not ready');
  //             reject('Account is not ready');
  //             return;
  //         }

  //         const y: CSSProperties = {
  //           color: 'white',
  //           // backgroundColor: 'white'
  //         };
  //         const x: TemplateAlertOptions = {
  //           style: y
  //         }

  //         const voucherIdCreated = await generateNewVoucher(
  //             [contractId], // An array to bind the voucher to one or more contracts
  //             account.decodedAddress,
  //             2, // 2 tokens
  //             30, // one minute
  //             () => alert.success('Voucher created!', x),
  //             () => alert.error('Error while creating voucher', x),
  //             () => alert.info('Will create voucher for current polkadot address!', x),
  //         );

  //         // if (setCurrentVoucherId) setCurrentVoucherId(voucherIdCreated);

  //         resolve(voucherIdCreated);
  //     });
  // }










  const handleStart = (flag1: boolean) => {
    setStart(flag1)
    setTime2(0);
    setMinutes(0);
  }

  const onStopTimer = (minutes: number, seconds: number) => {
    const totalSeconds = String(minutes * 60 + seconds);
    setTime(parseFloat(totalSeconds))
    setStart(false)
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    if (flag) {
      interval = setInterval(() => {
        setTime2((prevTime) => prevTime + 1);
      }, 1000);
    }
  
    if(time2 >= 60){
      setMinutes((prevTime) => prevTime + 1);
      setTime2(0);
    }
    // Limpiar el intervalo cuando el componente se desmonte o cuando flag cambie a falso
    return () => clearInterval(interval);
  
  }, [flag, time2]);
  
  const handleSubmit = (minutes: number, seconds: number) => {
    const totalSeconds = String(minutes * 60 + seconds);
    let totalTime = parseFloat(totalSeconds)
    setTime(parseFloat(totalSeconds))

    let correctCount = 0;
    if(Object.keys(selectedOptions).length < 3){
      onOpenFirstModal();
    }else{
      setStart(false)
      Object.keys(selectedOptions).forEach((questionId) => {
        const selectedAnswer = selectedOptions[questionId];
        const parsedId = parseInt(questionId, 10);
        const correctAnswer = correctanswers.find((answer) => answer.idquestion === parsedId);

        if (correctAnswer && selectedAnswer === String(correctAnswer.idcorrectanswer)) {
          correctCount += 1;
        }
      });

      let points = 0;

      console.log(correctCount)

      if (correctCount === 1) {
        onOpenSecondModal();
      } else if (correctCount === 2) {
        if (totalTime <= 2) {
          onOpenThirdModal();
          points = 66;
          signer(points);
        } else {
          onOpenSecondModal();
        }
      } else if (correctCount === 3) {
        if (totalTime === 3) {
          onOpenThirdModal();
          points = 100;
          signer(points);
        } else if (totalTime > 3) {
          points = 100 - ((totalTime - 1) * 10);
          console.log(points)
          if (points < 60) {
            points = 0;
            onOpenSecondModal();
          }else{
            onOpenThirdModal();
            points = 66;
            signer(points);
          }
        } else if(totalTime < 3) {
          console.log(totalTime)
          onOpenThirdModal();
          points = 100;
          signer(points);
        }
      } else {
        onOpenSecondModal();
      }
    }
  };

  const updateAnswer = (questionId: string, answer: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < finalQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log(minutes,time2)
      handleSubmit(minutes,time2);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const postToTwitter = () => {
    // Lógica para publicar en Twitter (simulada)
    console.log("Publicando en Twitter...");
    handleCloseThirdAndReload(); // Cerrar modal después de la publicación simulada
  };

  const currentQues = finalQuestions[currentQuestion];

  return (
    <>
      <Modal isOpen={isOpenFirstModal} onClose={handleCloseFirstAndReload} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Questions to be answered</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Please answer all questions before submitting.
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenSecondModal} onClose={handleCloseSecondAndReload} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red">More success next time</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Remember that you can review the topics in: <br/>
            <Link href="https://wiki.gear-tech.io/" isExternal color="blue.500">
              https://wiki.gear-tech.io/
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenThirdModal} onClose={handleCloseThirdAndReload} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.300">Congrats, you won the points, post your result on twitter</ModalHeader>
          <ModalBody>
            <p>Share your result on Twitter, Remember that you can review the topics in:</p>
            <Link href="https://wiki.gear-tech.io/" isExternal color="blue.500">
              https://wiki.gear-tech.io/
            </Link>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={postToTwitter}>
              Publicar
            </Button>
            <Button onClick={handleCloseThirdAndReload}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* ... Tu código de HeaderGame y Box */}
      <Flex>
        <Box w="69%" mt="3vh">
          <Box as="header" py="4" px="6" borderBottom="1px" borderColor="white" backgroundColor={"#434F74"}>
            <Flex justify="space-between" align="center">
                <Flex display="flex" alignItems="center">
                <Text color='white' mr="2vh">Select the correct option and use the next button to advance.</Text>
                </Flex>
                <Flex align="center">
                    <Button backgroundColor="#FD03E6" mr="2vh" w="12vh" borderRadius="0" fontFamily={"Nasalization"} fontSize={"20px"} color="white" sx={{
                        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                        '&:hover': {
                          backgroundColor: '#d456f7'
                        }
                      }}
                    >
                      Help
                    </Button>
                    <HStack spacing={4}>
                      <Tag backgroundColor='#00F598' w="12vh" h="3.5vh" borderRadius="0" justifyContent={"center"} sx={{
                        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}>
                          <TagLabel textAlign={"center"}>
                            Time: {minutes < 10 ? `0${minutes}` : minutes}:
                            {time2 < 10 ? `0${time2}` : time2}
                          </TagLabel>
                      </Tag>
                    </HStack>
                </Flex>
            </Flex>
          </Box>
          {currentQues && (
          <IndividualQuestion
            key={currentQues.id}
            text={currentQues.text}
            questionId={currentQues.id}
            updateAnswer={updateAnswer}
            selectedAnswer={selectedOptions[currentQues.id] || ''} // Proporcionar la opción seleccionada
          />
          )}
          {!flag ? (
            <Box display="flex" justifyContent="center">
            <Button w="25vh" h="5vh" borderRadius="0" fontFamily={"Nasalization"} 
              fontSize={"35px"} color="black" backgroundColor='#00f598'
              sx={{
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  '&:hover': {
                    backgroundColor: '#00FF4C', color: 'black'
                  }
                }}
              onClick={() => handleStart(true)}
            >
              START
            </Button>
          </Box>
          ):(
          <Box display="flex" justifyContent="flex-end">
            <Button
              disabled={currentQuestion === 0}
              mr="1vh" w="14vh" h="5vh" borderRadius="0" fontFamily={"Nasalization"} 
              fontSize={"18px"} color="black" backgroundColor='#ff6bc2'
              sx={{
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                '&:hover': {
                  backgroundColor: '#ff6bc2', color: 'white'
                }
              }}
              onClick={handlePrevious}
            >
              Previous
            </Button>

            <Button
              mr="4vh" w="14vh" h="5vh" borderRadius="0" fontFamily={"Nasalization"} 
              fontSize={"18px"} color="black" backgroundColor='#ff6bc2'
              sx={{
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                '&:hover': {
                  backgroundColor: '#ff6bc2', color: 'white'
                }
              }}
              onClick={handleNext}
            >
              {currentQuestion === finalQuestions.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
          )}
        </Box>
        <Box display="flex" w="31%" h="100vh" justifyContent={"center"}
          flexDirection="column"
          alignItems="center"
          backgroundImage={`linear-gradient(to right, #000828 1%, transparent 1%), url(${imgEnemy})`}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          backgroundSize="cover"
        >
          <Box
            width="75%"
            height="8%"
            mt="3.5vh"
            ml="1vh"
            backgroundImage={`url(${btnTitulo})`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text mt="1vh" fontSize="3xl" color="white" fontFamily={"Nasalization"}>
              SCORE
            </Text>
          </Box>
          <Box
            width="70%"
            height="30%"
            mt="1.5vh"
            backgroundImage={`url(${dialogueBubble})`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            display="flex"
            justifyContent={"center"}
          >
            <Text fontSize="1.4vh" fontWeight={"bold"} color="black" mt="4vh" ml={"4vh"} mr={"4vh"} textAlign={"justify"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
            </Text>
          </Box>
          <Box height="66%">
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export { GeneralQuestion };