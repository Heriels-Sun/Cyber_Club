import { useState, useContext } from 'react';
import { decodeAddress, ProgramMetadata } from '@gear-js/api';
import { web3FromSource } from "@polkadot/extension-dapp";
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { Box, FormControl, FormLabel, Input, Button, Center, VStack, Heading, Flex } from '@chakra-ui/react';
import { 
  useContractUtils,
  useVoucherUtils
} from 'hooks';
import { dAppContext } from 'context/dappContext';
import { SPONSOR_MNEMONIC, SPONSOR_NAME, MAIN_CONTRACT } from 'consts';

import nft1 from './nft/1.jpg';
import nft2 from './nft/2.jpg';
import nft3 from './nft/3.jpg';
import nft4 from './nft/4.jpg';
import nft5 from './nft/5.jpg';
import nft6 from './nft/6.jpg';
import nft7 from './nft/7.jpg';
import nft8 from './nft/8.jpg';
import nft9 from './nft/9.jpg';
import nft10 from './nft/10.jpg';
import nft11 from './nft/11.jpg';
import nft12 from './nft/12.jpg';
import nft13 from './nft/13.jpg';
import nft14 from './nft/14.jpg';
import nft15 from './nft/15.jpg';
import nft16 from './nft/16.jpg';
import nft17 from './nft/17.jpg';
import nft18 from './nft/18.jpg';
import nft19 from './nft/19.jpg';
import nft20 from './nft/20.jpg';
import stadistics from './stadistics.png';

type URLItem = {
  id: string;
  url: string;
};

type UrlProps= {
  id_nft: string;
  url_nft: string;
};

function chunkArray(array: URLItem[], chunkSize: number): URLItem[][] {
  let result: URLItem[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function InformationGeneral({id_nft,url_nft}:UrlProps) {
  document.body.style.backgroundColor     = "";
  document.body.style.backgroundImage     = "linear-gradient(to bottom, black 60%, #0E0E53 100%)";
  document.body.style.backgroundRepeat    = "no-repeat";
  document.body.style.backgroundSize      = "cover";

  const { accounts, account }             = useAccount();
  const { api }                           = useApi();
  const alert                             = useAlert();
  const [username, setUsername]           = useState('');
  const [twitter, setTwitter]             = useState('');
  const [selectedItem, setSelectedItem]   = useState<URLItem>({ id: id_nft, url:url_nft}); 

  const { signlessAccount, currentVoucherId } = useContext(dAppContext);
  const {
    sendMessageWithSignlessAccount
  } = useContractUtils();
  const {
    checkVoucherForUpdates
  } = useVoucherUtils(SPONSOR_NAME, SPONSOR_MNEMONIC);

  const listaDeUrls = [
    { id: '1', url: nft1 },
    { id: '2', url: nft2 },
    { id: '3', url: nft3 },
    { id: '4', url: nft4 },
    { id: '5', url: nft5 },
    { id: '6', url: nft6 },
    { id: '7', url: nft7 },
    { id: '8', url: nft8 },
    { id: '9', url: nft9 },
    { id: '10', url: nft10 },
    { id: '11', url: nft11 },
    { id: '12', url: nft12 },
    { id: '13', url: nft13 },
    { id: '14', url: nft14 },
    { id: '15', url: nft15 },
    { id: '16', url: nft16 },
    { id: '17', url: nft17 },
    { id: '18', url: nft18 },
    { id: '19', url: nft19 },
    { id: '20', url: nft20 },
    { id: '21', url: nft1 },
    { id: '22', url: nft2 },
    { id: '23', url: nft3 },
    { id: '24', url: nft4 },
    { id: '25', url: nft5 },
    { id: '26', url: nft6 },
    { id: '27', url: nft7 },
    { id: '28', url: nft8 },
    { id: '29', url: nft9 },
    { id: '30', url: nft1 },
    { id: '31', url: nft1 },
    { id: '32', url: nft2 },
    { id: '33', url: nft3 },
    { id: '34', url: nft4 },
    { id: '35', url: nft5 },
    { id: '36', url: nft6 },
    { id: '37', url: nft7 },
    { id: '38', url: nft8 },
    { id: '39', url: nft9 },
  ];

  const groupedUrls = chunkArray(listaDeUrls, 8);
  
  // Add your programID
  const programIDFT =
  "0xe69727180e6a43860f5195c7023052766baad4938400f44e6be709a89e5f087f";

  // Add your metadata.txt
  const meta =
  "00010000000100000000010600000000000000010800000041114c000808696f3843796265724d657373616765496e000120284164644e657755736572000000384d6f64696679557365726e616d650400040118537472696e670001003c4d6f64696679557365724c6576656c04000801144c6576656c000200404d6f64696679557365724d6f64756c6504000c01184d6f64756c65000300404d6f6469667955736572506f696e7473040010010c7536340004004046756c6c5265676973746572557365720400040118537472696e67000500444d6f6469667955736572417474656d707304001401087538000600384164644e657750726f67726573730c000801144c6576656c00000c01184d6f64756c650000140108753800070000040000050200080808696f144c6576656c00010c2042656767696e657200000030496e7465726d65646961746500010020416476616e636564000200000c0808696f184d6f64756c65000114144669727374000000185365636f6e6400010014546869726400020018466f7572746800030014466966746800040000100000050600140000050300180808696f3c43796265724d6573736167654f75740001202c557365724372656174656400000040557365726e616d654d6f64696669656400010044557365724c6576656c4d6f64696669656400020048557365724d6f64756c654d6f6469666965640003004855736572506f696e74734d6f646966696564000400485573657246756c6c526567697374657265640005004c55736572417474656d70736d6f646966696564000600404e657750726f6772657373416464656404001c0110626f6f6c000700001c0000050000200808696f30496f43796265725374617465000008011c706c617965727324016c5665633c284163746f7249642c204379626572506c61796572293e00012073706f6e736f72734001745665633c284163746f7249642c20437962657253706f6e736f7273293e000024000002280028000004082c34002c10106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004003001205b75383b2033325d000030000003200000001400340808696f2c4379626572506c6179657200001c01106e616d65040118537472696e6700013c66756c6c5f726567697374657265641c0110626f6f6c000118706f696e747310010c75363400013463757272656e745f6c6576656c0801144c6576656c00013863757272656e745f6d6f64756c650c01184d6f64756c65000128737461646973746963733801505665633c4379626572537461646973746963733e00012c7472795f666f725f64617914010875380000380000023c003c0808696f3c43796265725374616469737469637300000c01146c6576656c0801144c6576656c0001186d6f64756c650c01184d6f64756c6500011473636f72651401087538000040000002440044000004082c4800480808696f34437962657253706f6e736f72730000080108696414010875380001106e616d65040118537472696e670000";

  const metadata = ProgramMetadata.from(meta);

  const signer = async (username:string) => {
    if (!accounts) return;
    if (!api) return;

      const message: any = {
        destination: programIDFT, // programId
        payload: {FullRegisterUser: username},
        gasLimit: 9999999999,
        value: 0,
      };
  
      const localaccount = account?.address;
      const isVisibleAccount = accounts.some(
        (visibleAccount) => visibleAccount.address === localaccount
      );
  
      if (isVisibleAccount) {

        if (!signlessAccount || !currentVoucherId) return;

        try {
          await checkVoucherForUpdates(
            decodeAddress(signlessAccount.address),
            currentVoucherId,
            2, // dos varas
            1_200, // una hora
            2,
            () => alert.success('Voucher updated'),
            () => alert.error('Error updating voucher'),
            () => alert.info('Check for voucher uptdates')
          );
        } catch (e) {
          alert.error('Error while chicking voucher');
          return;
        }
  
        try {
          await sendMessageWithSignlessAccount(
            signlessAccount,
            MAIN_CONTRACT.programId,
            currentVoucherId,
            MAIN_CONTRACT.metadata,
            {

            },
            0,
            () => alert.success('Message was send'),
            () => alert.error('Error while sending message'),
            () => alert.info('Message is in block'),
            () => alert.info('Will send a message')
          );
        } catch (e) {
          alert.error('Error sending message');
        }


        // Create a message extrinsic
        // const transferExtrinsic = await api.message.send(message, metadata);
  
        // const injector = await web3FromSource(accounts[0].meta.source);
  
        // transferExtrinsic
        //   .signAndSend(
        //     account?.address ?? alert.error("No account"),
        //     { signer: injector.signer },
        //     ({ status }) => {
        //       if (status.isInBlock) {
        //         alert.success(status.asInBlock.toString());
        //       } else {
        //         console.log("-")
        //         if (status.type === "Finalized") {
        //           alert.success(status.type);
        //           window.location.reload();
        //         }
        //       }
        //     }
        //   )
        //   .catch((error: any) => {
        //     console.log(":( transaction failed", error);
        //   });
      } else {
        alert.error("Account not available to sign");
      }
  };

  const handleConfirm = () => {
      console.log('Username:', username);
      console.log('Twitter:', twitter);

      signer(username);
  };

  const changeVariaty = (item: URLItem) => {
    setSelectedItem(item);
  };

  return (
      <>
          <Center>
              <Heading as="h1" size="lg" color="yellow" mb="4" fontWeight="normal" fontFamily={"Nasalization"}>
                  PERSONALIZED YOUR CYBER PROFILE.
              </Heading>
          </Center>

          <Flex h="65vh" mt={"10vh"}>
            <Box w="35%" h="100%" overflowY={"auto"} 
              css={{
                // Estilo de barra de desplazamiento para navegadores basados en Webkit
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
                // Estilo de barra de desplazamiento para Firefox
                scrollbarWidth: 'thin',
                scrollbarColor: '#888 #f1f1f1',
              }}
            >
              {groupedUrls.map((group, index) => (
                <Flex key={index} h="auto" flexWrap="wrap">
                  {group.map(item => ( 
                    <Box
                      key={item.id}
                      flex="1 0 21%"  // flex-grow, flex-shrink, flex-basis
                      maxW="21%"
                      backgroundColor="#021243" 
                      sx={{
                        clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)'
                      }}
                      m="8px"
                      onClick={() => changeVariaty(item)}
                      backgroundImage={`url(${item.url})`}
                      backgroundSize="cover"
                      backgroundRepeat="no-repeat"
                      backgroundPosition="center"
                      cursor="pointer"
                      h="15vh"  // Ajusta la altura de cada Box según sea necesario
                    />
                  ))}
                </Flex>
              ))}
            </Box>
            <Box w="40%" h="100%">
              <img src={selectedItem.url} id="img_select" data-img_info={selectedItem.id} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxHeight: '100%', clipPath: 'polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px)'}} />
            </Box>
            <Box w="25%" h="100%" borderRadius="md" mx="10px" background={"#18273F"}
              sx={{
                clipPath: 'polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px)'
              }}>
              <Flex direction="column" align="center" justify="center" h="100%">
                <img src={stadistics} alt="Stadistics" style={{ maxHeight: '75%' }} />
                <Button
                  mt="4vh"
                  w="28vh"
                  h="5vh"
                  borderRadius="0"
                  fontFamily={"Nasalization"}
                  fontSize={"2xl"}
                  backgroundColor="#f4f756"
                  sx={{
                    clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                    '&:hover': {
                      backgroundColor: '#d456f7'
                    }
                  }}
                  onClick={handleConfirm}
                >
                  CONFIRM
                </Button>
              </Flex>
            </Box>
          </Flex>
      </>
  );
}

export { InformationGeneral };