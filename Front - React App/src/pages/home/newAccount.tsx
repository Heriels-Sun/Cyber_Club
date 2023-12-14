import { Box, Text, Input, InputGroup, InputLeftAddon, InputRightElement, InputRightAddon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { ChangeEvent, useState } from 'react';
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from '@gear-js/api';
import { HeaderGeneral } from './HeaderGeneral';
import { IconoNFT } from './icononft';

type Props = {
  state: string;
};

function NewAccount({ state }: Props) {

  const [inputValue, setInputValue] = useState('');
  const { accounts, account } = useAccount();
  const { api } = useApi();
  const alert = useAlert();

  const listaDeUrls = [
    { id: '1', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '2', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '3', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '4', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '5', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '6', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
    { id: '7', url: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' },
  ];

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
    }
  };

  const isOverLimit = inputValue.length >= 0 && inputValue.length < 10;

  // Add your programID
  const programIDFT =
  "0x692fa95bc6ff5c739abd18f7218de9dd67b7c60a50ba7e6d0b001b6a0e83b2d9";

  // Add your metadata.txt
  const meta =
    "00010000000100000000010600000000000000010800000075104c000808696f3843796265724d657373616765496e00011c284164644e657755736572000000384d6f64696679557365726e616d650400040118537472696e670001003c4d6f64696679557365724c6576656c04000801144c6576656c000200404d6f64696679557365724d6f64756c6504000c01184d6f64756c65000300404d6f6469667955736572506f696e7473040010010c7536340004004046756c6c5265676973746572557365720400040118537472696e67000500384164644e657750726f67726573730c000801144c6576656c00000c01184d6f64756c650000140108753800060000040000050200080808696f144c6576656c00010c2042656767696e657200000030496e7465726d65646961746500010020416476616e636564000200000c0808696f184d6f64756c65000114144669727374000000185365636f6e6400010014546869726400020018466f7572746800030014466966746800040000100000050600140000050300180808696f3c43796265724d6573736167654f757400011c2c557365724372656174656400000040557365726e616d654d6f64696669656400010044557365724c6576656c4d6f64696669656400020048557365724d6f64756c654d6f6469666965640003004855736572506f696e74734d6f646966696564000400485573657246756c6c52656769737465726564000500404e657750726f6772657373416464656404001c0110626f6f6c000600001c0000050000200808696f30496f43796265725374617465000008011c706c617965727324016c5665633c284163746f7249642c204379626572506c61796572293e00012073706f6e736f72734001745665633c284163746f7249642c20437962657253706f6e736f7273293e000024000002280028000004082c34002c10106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004003001205b75383b2033325d000030000003200000001400340808696f2c4379626572506c6179657200001c01106e616d65040118537472696e6700013c66756c6c5f726567697374657265641c0110626f6f6c000118706f696e747310010c75363400013463757272656e745f6c6576656c0801144c6576656c00013863757272656e745f6d6f64756c650c01184d6f64756c65000128737461646973746963733801505665633c4379626572537461646973746963733e00012c7472795f666f725f64617914010875380000380000023c003c0808696f3c43796265725374616469737469637300000c01146c6576656c0801144c6576656c0001186d6f64756c650c01184d6f64756c6500011473636f72651401087538000040000002440044000004082c4800480808696f34437962657253706f6e736f72730000080108696414010875380001106e616d65040118537472696e670000";

  const metadata = ProgramMetadata.from(meta);


  const signer = async (username:string) => {
    const message: any = {
      destination: programIDFT, // programId
      payload: {FullRegisterUser: username},
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

  const onChooseNFT = (_Key: string) => {
    signer("inden65");
    console.log(_Key); // Cambiar el estado para ocultar el contenido
  };

  return (
    <>
      <Box
        w="100vh"
        h="auto"
        backgroundColor="#4A5B91"
        color="white"
        borderRadius="md"
        marginTop="4vh"
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
          <Text fontFamily="Comic Sans MS" fontSize="20px" mt="10px">
            Enter your username and choose an avatar to start your journey through the CyberClub.
          </Text>
        </Box>
      </Box>
      <InputGroup>
        <InputLeftAddon ml="1%" mt="1%" color="white" backgroundColor="#021243">Username:</InputLeftAddon>
        <Input
          color="white"
          placeholder=""
          size="md"
          mt="1%"
          variant="outline"
          width="90%"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        {isOverLimit ? (
          <InputRightElement mt="1%" mr="2%">
            <CheckIcon color="green.500" />
          </InputRightElement>
        ) : (
          <InputRightAddon mt="1%" color="red" backgroundColor="#021243">Max 10 Characters</InputRightAddon>
        )}
      </InputGroup>
      <Box
        w="100%"
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
              _key={url}
              onChooseNFT={onChooseNFT}
            />
          </Box>
        ))}
      </Box>
    </>
  );
}

export { NewAccount };