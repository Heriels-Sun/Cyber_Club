import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from '@gear-js/api';
import { Box, Link, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { useState } from 'react';
import { HeaderGame } from './HeaderGame';
import { IndividualQuestion } from './individualQuestion1';

type Question = {
  id: string;
  text: string;
};

type CorrectAnswers = {
  idquestion:       number;
  idcorrectanswer:  number;
};

type GeneralProps= {
  numberModule: number;
};

function GeneralQuestion({numberModule}:GeneralProps) {
  const { isOpen: isOpenFirstModal, onOpen: onOpenFirstModal, onClose: onCloseFirstModal } = useDisclosure();
  const { isOpen: isOpenSecondModal, onOpen: onOpenSecondModal, onClose: onCloseSecondModal } = useDisclosure();
  const { isOpen: isOpenThirdModal, onOpen: onOpenThirdModal, onClose: onCloseThirdModal } = useDisclosure();
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const { accounts, account } = useAccount();
  const { api } = useApi();
  const alert = useAlert();

  const signer = async (puntos: number) => {
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

    // Add your programID
    const programIDFT =
    "0xe69727180e6a43860f5195c7023052766baad4938400f44e6be709a89e5f087f";

    // Add your metadata.txt
    const meta =
    "00010000000100000000010600000000000000010800000041114c000808696f3843796265724d657373616765496e000120284164644e657755736572000000384d6f64696679557365726e616d650400040118537472696e670001003c4d6f64696679557365724c6576656c04000801144c6576656c000200404d6f64696679557365724d6f64756c6504000c01184d6f64756c65000300404d6f6469667955736572506f696e7473040010010c7536340004004046756c6c5265676973746572557365720400040118537472696e67000500444d6f6469667955736572417474656d707304001401087538000600384164644e657750726f67726573730c000801144c6576656c00000c01184d6f64756c650000140108753800070000040000050200080808696f144c6576656c00010c2042656767696e657200000030496e7465726d65646961746500010020416476616e636564000200000c0808696f184d6f64756c65000114144669727374000000185365636f6e6400010014546869726400020018466f7572746800030014466966746800040000100000050600140000050300180808696f3c43796265724d6573736167654f75740001202c557365724372656174656400000040557365726e616d654d6f64696669656400010044557365724c6576656c4d6f64696669656400020048557365724d6f64756c654d6f6469666965640003004855736572506f696e74734d6f646966696564000400485573657246756c6c526567697374657265640005004c55736572417474656d70736d6f646966696564000600404e657750726f6772657373416464656404001c0110626f6f6c000700001c0000050000200808696f30496f43796265725374617465000008011c706c617965727324016c5665633c284163746f7249642c204379626572506c61796572293e00012073706f6e736f72734001745665633c284163746f7249642c20437962657253706f6e736f7273293e000024000002280028000004082c34002c10106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004003001205b75383b2033325d000030000003200000001400340808696f2c4379626572506c6179657200001c01106e616d65040118537472696e6700013c66756c6c5f726567697374657265641c0110626f6f6c000118706f696e747310010c75363400013463757272656e745f6c6576656c0801144c6576656c00013863757272656e745f6d6f64756c650c01184d6f64756c65000128737461646973746963733801505665633c4379626572537461646973746963733e00012c7472795f666f725f64617914010875380000380000023c003c0808696f3c43796265725374616469737469637300000c01146c6576656c0801144c6576656c0001186d6f64756c650c01184d6f64756c6500011473636f72651401087538000040000002440044000004082c4800480808696f34437962657253706f6e736f72730000080108696414010875380001106e616d65040118537472696e670000";

    const metadata = ProgramMetadata.from(meta);

    const message: any = {
      destination: programIDFT, // programId
      payload: { AddNewProgress: [
        "Begginer", moduloname, puntos
      ]},
      gasLimit: 899819245,
      value: 0,
    };

    const localaccount = account?.address;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount) {
      // Create a message extrinsic
      const transferExtrinsic = await api.message.send(message, metadata);

      const injector = await web3FromSource(accounts[0].meta.source);

      transferExtrinsic
        .signAndSend(
          account?.address ?? alert.error("No account"),
          { signer: injector.signer },
          ({ status }) => {
            if (status.isInBlock) {
              alert.success(status.asInBlock.toString());
            } else {
              console.log("-")
              if (status.type === "Finalized") {
                console.log(status)
                alert.success(status.type);
              }
            }
          }
        )
        .catch((error: any) => {
          console.log(":( transaction failed", error);
        });
    } else {
      alert.error("Account not available to sign");
    }
  };

  const stopTimer = () => {
    setTimerRunning(false); // Detener el temporizador
  };

  const handleStopTimer = (currentTime: { minutes: number; seconds: number }) => {
    const totalSeconds = String(currentTime.minutes * 60 + currentTime.seconds);
    setTime(parseFloat(totalSeconds))
  };
  
  const handleSubmit = () => {
    let correctCount = 0;
    if(Object.keys(selectedOptions).length < 3){
      onOpenFirstModal();
    }else{
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
        if (time <= 2) {
          onOpenThirdModal();
          points = 66;
          signer(points);
        } else {
          onOpenSecondModal();
        }
      } else if (correctCount === 3) {
        if (time === 3) {
          onOpenThirdModal();
          points = 100;
          signer(points);
        } else if (time > 3) {
          points = 100 - ((time - 3) * 10);
          if (points < 60) {
            points = 0;
            onOpenSecondModal();
          }else{
            onOpenThirdModal();
            points = 66;
            signer(points);
          }
        } else {
          onOpenThirdModal();
          points = 100;
          signer(points);
        }
      } else {
        onOpenSecondModal();
      }
      stopTimer();
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
      handleSubmit();
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
    onCloseThirdModal(); // Cerrar modal después de la publicación simulada
  };

  const currentQues = finalQuestions[currentQuestion];

  return (
    <>
      {/* ... Tu código de HeaderGame y Box */}
      <Box>
        <HeaderGame helpText="Select the correct option and use the next button to advance." start={timerRunning} stopTimer={stopTimer} onStopTimer={handleStopTimer}/>

        <Modal isOpen={isOpenFirstModal} onClose={onCloseFirstModal} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Questions to be answered</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Please answer all questions before submitting.
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenSecondModal} onClose={onCloseSecondModal} isCentered>
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

        <Modal isOpen={isOpenThirdModal} onClose={onCloseThirdModal} isCentered>
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
              <Button onClick={onCloseThirdModal}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {currentQues && (
        <IndividualQuestion
          key={currentQues.id}
          text={currentQues.text}
          questionId={currentQues.id}
          updateAnswer={updateAnswer}
          selectedAnswer={selectedOptions[currentQues.id] || ''} // Proporcionar la opción seleccionada
        />
      )}

        <Box display="flex" justifyContent="right" mt="-1%">
          <Button
            disabled={currentQuestion === 0}
            mr="1vh"
            onClick={handlePrevious}
            colorScheme="blue"
          >
            Previous
          </Button>

          <Button
            mr="4vh"
            onClick={handleNext}
            colorScheme="blue"
          >
            {currentQuestion === finalQuestions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export { GeneralQuestion };