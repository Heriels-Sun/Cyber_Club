import { useState, useContext, CSSProperties } from 'react';
import { decodeAddress, HexString, ProgramMetadata } from '@gear-js/api';
import { web3FromSource } from "@polkadot/extension-dapp";
import { useAccount, useApi, useAlert, TemplateAlertOptions } from "@gear-js/react-hooks";
import { Box, FormControl, FormLabel, Input, Button, Center, VStack, Heading, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useContractUtils, useVoucherUtils, } from '@/app/hooks';

import { sponsorName,sponsorMnemonic} from '@/app/consts';
import { CONTRACT } from '@/app/consts';

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
//   document.body.style.backgroundColor     = "";
//   document.body.style.backgroundImage     = "linear-gradient(to bottom, black 60%, #0E0E53 100%)";
//   document.body.style.backgroundRepeat    = "no-repeat";
//   document.body.style.backgroundSize      = "cover";

//   const { accounts, account }             = useAccount();
//   const { api }                           = useApi();
//   const alert                             = useAlert();
//   const [username, setUsername]           = useState('');
//   const [twitter, setTwitter]             = useState('');
//   const [selectedItem, setSelectedItem]   = useState<URLItem>({ id: id_nft, url:url_nft});

//   const navigate = useNavigate();

//   const {
//     sendMessageWithVoucher
//   } = useContractUtils();
//   const { 
//     generateNewVoucher,
//     checkVoucherForUpdates,
//     vouchersInContract
//   } = useVoucherUtils(sponsorName, sponsorMnemonic);

//   let variableUrl = url_nft.split("01.png")[0]
//   let nameImg     = url_nft.split("cyberclub/01/")[1]
//   const listaDeUrls = [
//     { id: '1', url: url_nft },
//     { id: '2', url: variableUrl+"02.png"},
//     { id: '3', url: variableUrl+"03.png" },
//     { id: '4', url: variableUrl+"04.png" },
//     { id: '5', url: variableUrl+"05.png" },
//     { id: '6', url: variableUrl+"06.png" },
//     { id: '7', url: variableUrl+"07.png" },
//     { id: '8', url: variableUrl+"08.png" },
//     { id: '9', url: variableUrl+"09.png" },
//   ];

//   const groupedUrls = chunkArray(listaDeUrls, 8);

//   const signer = async (username:string) => {
//     const y: CSSProperties = {
//       color: 'white',
//       // backgroundColor: 'white'
//     };
//     const x: TemplateAlertOptions = {
//       style: y
//     }
//     if (!account) {
//       alert.error("Accounts not ready!");
//       return;
//     }

//     let voucherIdToUse;

//     const vouchersForAddress = await voucherIdOfActualPolkadotAccount(CONTRACT.programId);

//     if (vouchersForAddress.length === 0) {
//       voucherIdToUse = await createVoucherForCurrentPolkadotAccount(CONTRACT.programId);
//     } else {
//       voucherIdToUse = vouchersForAddress[0];
//       await manageVoucherId(voucherIdToUse);
//     }

//     try {
//         await sendMessageWithVoucher(
//             account.decodedAddress,
//             voucherIdToUse,
//             account.meta.source,
//             CONTRACT.programId,
//             CONTRACT.metadata,
//             {
//               FullRegisterUser: username
//             },
//             0,
//             () => {
//               alert.success('Message send with voucher!', x);
//               navigate('/');
//             },
//             () => alert.error('Failed while sending message with voucher', x),
//             () => alert.info('Message is in blocks', x),
//             () => alert.info('Will send message', x)
//         );


//     } catch (e) {
//         alert.error('Error while sending message');
//     }
//   };


//   const signerNFT = async () => {
//     const y: CSSProperties = {
//       color: 'white',
//       // backgroundColor: 'white'
//     };
//     const x: TemplateAlertOptions = {
//       style: y
//     }
//     if (!account) {
//       alert.error("Accounts not ready!");
//       return;
//     }

//     let voucherIdToUse;

//     const vouchersForAddress = await voucherIdOfActualPolkadotAccount(CONTRACT_NFT.programId);

//     if (vouchersForAddress.length === 0) {
//       voucherIdToUse = await createVoucherForCurrentPolkadotAccount(CONTRACT_NFT.programId);
//     } else {
//       voucherIdToUse = vouchersForAddress[0];
//       await manageVoucherId(voucherIdToUse);
//     }

//     try {
//         await sendMessageWithVoucher(
//             account.decodedAddress,
//             voucherIdToUse,
//             account.meta.source,
//             CONTRACT_NFT.programId,
//             CONTRACT_NFT.metadata,
//             {
//               FullRegisterUser: username
//             },
//             0,
//             () => {
//               alert.success('Message send with voucher!', x);
//               navigate('/');
//             },
//             () => alert.error('Failed while sending message with voucher', x),
//             () => alert.info('Message is in blocks', x),
//             () => alert.info('Will send message', x)
//         );


//     } catch (e) {
//         alert.error('Error while sending message');
//     }
//   }



//   const handleConfirm = async () => {
//       console.log('Username:', username);
//       console.log('Twitter:', twitter);

//       await signer(username);
//   };

//   const changeVariaty = (item: URLItem) => {
//     setSelectedItem(item);
//   };







//   const voucherIdOfActualPolkadotAccount = async (contractId: HexString): Promise<HexString[]> => {
//     return new Promise(async (resolve, reject) => {
//         if (!account) {
//             alert.error('Account is not ready');
//             reject('Account is not ready');
//             return;
//         }

//         const vouchersId = await vouchersInContract(
//             contractId,
//             account.decodedAddress
//         );

//         resolve(vouchersId);
//     });
//   }

//   const manageVoucherId = async (voucherId: HexString): Promise<void> => {
//       return new Promise(async (resolve, reject) => {
//           if (!account) {
//               alert.error('Account is not ready');
//               reject('Account is not ready');
//               return;
//           }

//           const y: CSSProperties = {
//             color: 'white',
//             // backgroundColor: 'white'
//           };
//           const x: TemplateAlertOptions = {
//             style: y
//           }

//           try {
//               await checkVoucherForUpdates(
//                   account.decodedAddress, 
//                   voucherId,
//                   1, // add one token to voucher if needed
//                   1_200, // new expiration time (One hour )
//                   2, // Minimum balance that the voucher must have
//                   () => alert.success('Voucher updated!', x),
//                   () => alert.error('Error while checking voucher', x),
//                   () => alert.info('Will check for updates in voucher', x)
//               )
//               resolve();
//           } catch (e) {
//               alert.error('Error while check voucher');
//           }
//       });
//   }

//   const createVoucherForCurrentPolkadotAccount = async (contractId: HexString): Promise<HexString> => {
//       return new Promise(async (resolve, reject) => {
//           if (!account) {
//               alert.error('Account is not ready');
//               reject('Account is not ready');
//               return;
//           }

//           const y: CSSProperties = {
//             color: 'white',
//             // backgroundColor: 'white'
//           };
//           const x: TemplateAlertOptions = {
//             style: y
//           }

//           const voucherIdCreated = await generateNewVoucher(
//               [contractId], // An array to bind the voucher to one or more contracts
//               account.decodedAddress,
//               2, // 2 tokens
//               30, // one minute
//               () => alert.success('Voucher created!', x),
//               () => alert.error('Error while creating voucher', x),
//               () => alert.info('Will create voucher for current polkadot address!', x),
//           );

//           // if (setCurrentVoucherId) setCurrentVoucherId(voucherIdCreated);

//           resolve(voucherIdCreated);
//       });
//   }









  return (
      <>
          {/* <Center>
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
            <img src={selectedItem.url} id="img_select" data-img_info={selectedItem.url} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxHeight: '100%', clipPath: 'polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px)'}} />
            </Box>
            <Box w="25%" h="100%" borderRadius="md" mx="10px" background={"#18273F"}
              sx={{
                clipPath: 'polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px)'
              }}>
              <Flex direction="column" align="center" justify="center" h="100%" >
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
          </Flex> */}
      </>
  );
}

export { InformationGeneral };