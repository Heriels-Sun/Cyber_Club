import { useState, useEffect } from 'react';
import { useAccount } from '@gear-js/react-hooks';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { LOCAL_STORAGE } from 'consts';
import { Box, FormControl, FormLabel, Input, Button, Center, VStack, Heading, Flex, Select, Tooltip, Checkbox, Text, Spinner } from '@chakra-ui/react';

type Props = {
  accounts: InjectedAccountWithMeta[] | undefined;
};

interface Option {
  value: string;
  label: string;
}

function WindowAccounts({ accounts }: Props) {
  document.body.style.backgroundImage                 = "url('fondo01.png')";
  document.body.style.backgroundAttachment            = "fixed";
  document.body.style.backgroundSize                  = "cover";
  const { login }                                     = useAccount();
  const [username, setUsername]                       = useState('');
  const [twitter, setTwitter]                         = useState('');
  const [loading, setLoading]                         = useState(true);
  const [options, setOptions]                         = useState<Option[]>([]);
  const [isChecked, setIsChecked]                     = useState(false);
  const [selectedValue, setSelectedValue]             = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (accounts) {
        const data = [];
        for (let i = 0; i < accounts.length; i += 1) {
          let newOption = {
            value: accounts[i].address,
            label: accounts[i].meta.name ?? '', // Use an empty string if label is undefined
          };
          data.push(newOption);
        }
        setOptions(data);
        setLoading(false);
      }
    };

    fetchData();
  }, [accounts]); // Dependencia para volver a cargar las opciones cuando `accounts` cambia

  if (loading) {
    return <Spinner />;
  }

  const handleConfirm = () => {
    if (!isChecked) {
      alert("Debes aceptar los terminos y condiciones para continuar")
      return
    }
    if (!selectedValue) {
      alert("Debes seleccionar una billetera para continuar")
      return
    }

    if (accounts) {
      for (let i = 0; i < accounts.length; i += 1) {
        if(accounts[i].address === selectedValue){
          login(accounts[i]);
          localStorage.setItem(LOCAL_STORAGE.ACCOUNT, accounts[i].address);
        }
      }
    }
  };

  const noWalletFunction = () => {
    // Aquí puedes hacer algo con los valores de los estados, como enviarlos a una API
    console.log('Username:', username);
    console.log('Twitter:', twitter);
  };

  return (
    <>
        <Flex>
            <Box w="60%">
            </Box>
            <Box w="20%" mt="8vh">
                <Center>
                  <VStack spacing={1}>
                    <FormLabel color="yellow" textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"} fontFamily={"Trebuchet MS"}>SIGN UP:</FormLabel><br/>
                    <FormLabel color="white" textAlign={"center"} fontSize={"xl"} fontWeight={"bold"} fontFamily={"Trebuchet MS"}>Connect your wallet:</FormLabel>
                    <FormLabel color="white" textAlign={"justify"} fontSize={"lg"} fontFamily={"Trebuchet MS"}>
                      By connecting a wallet, you agree to Cyber Club: Terms of Service and acknowledge that you have read and unsterstand to Vara Network
                    </FormLabel><br/>

                    <FormControl id="username" isRequired>
                    <Flex align="center">
                      <Box w="90%">
                        {accounts ? (
                          <><Select placeholder='Select your wallet' backgroundColor={"gray"} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                            {options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select></>
                        ) : (
                          <p>
                            Wallet extension was not found.
                            {' '}
                            <a href='https://wiki.gear-tech.io/docs/idea/account/create-account' target='_blank' rel='noreferrer'
                              className='link-text'>
                              here
                            </a>.
                          </p>
                        )}
                      </Box>
                      <Box w="1%"></Box>
                      <Box cursor="pointer" w="9%" h="38px" textAlign="center" backgroundColor={"gray"} color={"white"} border={"1px solid"} borderColor={"#e2e8f0"} borderRadius={"md"}>
                        <Tooltip label="Descripción detallada" aria-label='A tooltip' fontSize={"sm"}>
                          <Box w="full" h="full" display="flex" alignItems="center" justifyContent="center">
                            ?
                          </Box>
                        </Tooltip>
                      </Box>
                    </Flex>
                    </FormControl>

                    <FormLabel color="white" textAlign={"center"} fontSize={"lg"} fontFamily={"Trebuchet MS"}>Or:</FormLabel>

                    <Button colorScheme="gray" size="md" w="full" h="9" backgroundColor="gray" onClick={handleConfirm}>
                      REGISTER USER
                    </Button>

                    <Box display={"flex"} mt="10px" alignItems="left" justifyContent="flex-start">
                      <Checkbox id="terms_checkbox" colorScheme="blue" isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
                      <Text textAlign={"left"} ml={2} color={"white"}>I accept the terms and conditions of service</Text>
                    </Box>

                    <Button colorScheme="purplealpha.100" size="md" w="full" mt="5" backgroundColor="#f4f756" color={"black"} onClick={handleConfirm}>
                      CONFIRM
                    </Button>
                  </VStack>
                </Center>
              </Box>
              <Box w="20%">
              </Box>
        </Flex>
    </>
  );
}

export { WindowAccounts };
