import { useState, useEffect } from 'react';
import { useAccount } from '@gear-js/react-hooks';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { LOCAL_STORAGE } from '../../../../../consts';
import { Box, FormControl, FormLabel, Input, Button, Center, VStack, Flex, Select, Tooltip, Checkbox, Text, Spinner, FormErrorMessage, InputGroup, InputRightElement } from '@chakra-ui/react';

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
  // const [twitter, setTwitter]                         = useState('');
  const [loading, setLoading]                         = useState(true);
  const [options, setOptions]                         = useState<Option[]>([]);
  const [isChecked, setIsChecked]                     = useState(false);
  const [noWallet, setNoWallet]                       = useState(false);
  const [selectedValue, setSelectedValue]             = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPass, setShowPass] = useState(false)
  const [showPassConfirm, setShowPassConfirm] = useState(false)
  const [errors, setErrors] = useState({ username: '', password: '', confirmPassword: '' });

  const handleClickPass = () => setShowPass(!showPass)
  const handleClickPassConfirm = () => setShowPassConfirm(!showPassConfirm)

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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '', confirmPassword: '' };

    if (!username) {
      newErrors.username = 'Username is required.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    if (!passwordConfirm) {
      newErrors.confirmPassword = 'Confirm password is required.';
      isValid = false;
    } else if (password !== passwordConfirm) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!isChecked) {
      alert("Debes aceptar los terminos y condiciones para continuar")
      return
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirmNoWallet = () => {

    if (validateForm()) {
      alert("Listo, usuario validado")
      return
    }

  };

  const toggleNoWallet = () => {
    setNoWallet((prevValue) => !prevValue);
  };

  // const noWalletFunction = () => {
  //   // Aquí puedes hacer algo con los valores de los estados, como enviarlos a una API
  //   console.log('Username:', username);
  //   console.log('Twitter:', twitter);
  // };

  return (
        <Flex>
            <Box w="60%">
            </Box>
            {!noWallet ? (
            <Box w="20%" mt="8vh">
                <Center>
                  <VStack spacing={1}>
                    <FormLabel color="yellow" textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"} fontFamily="Nasalization">SIGN UP:</FormLabel><br/>
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

                    <Button colorScheme="gray" size="md" w="full" h="9" backgroundColor="gray" fontFamily="Nasalization" onClick={toggleNoWallet}>
                      REGISTER USER
                    </Button>

                    <Box display={"flex"} mt="10px" alignItems="left" justifyContent="flex-start">
                      <Checkbox id="terms_checkbox" colorScheme="blue" isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
                      <Text textAlign={"left"} ml={2} color={"white"}>I accept the terms and conditions of service</Text>
                    </Box>

                    <Button colorScheme="purplealpha.100" size="md" w="full" mt="5" backgroundColor="#f4f756" fontFamily="Nasalization" color={"black"} onClick={handleConfirm}>
                      CONFIRM
                    </Button>
                  </VStack>
                </Center>
              </Box>
              ) : (
                <Box w="20%" mt="8vh">
                <Center>
                  <VStack spacing={1}>
                    <FormLabel color="yellow" textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"} fontFamily="Nasalization">SIGN UP:</FormLabel><br />
                    <FormLabel color="white" textAlign={"center"} fontSize={"xl"} fontWeight={"bold"} fontFamily={"Trebuchet MS"}>Create a new account:</FormLabel>
                    <FormControl isInvalid={!!errors.username} mb={4}>
                      <Input
                        size="md"
                        w="full"
                        h="9"
                        color="#fff"
                        backgroundColor="gray"
                        focusBorderColor="#f4f756"
                        placeholder="Username *"
                        _placeholder={{ opacity: 1, color: '#cccccc' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
      
                    <FormControl isInvalid={!!errors.password} mb={4}>
                      <InputGroup size='md'>
                        <Input
                          size="md"
                          w="full"
                          color="#fff"
                          backgroundColor="gray"
                          focusBorderColor="#f4f756"
                          type={showPass ? 'text' : 'password'}
                          placeholder="Password *"
                          _placeholder={{ opacity: 1, color: '#cccccc' }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={handleClickPass} color="#000" backgroundColor="#f4f756">
                            {showPass ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
      
                    <FormControl isInvalid={!!errors.confirmPassword} mb={4}>
                      <InputGroup size='md'>
                        <Input
                          size="md"
                          w="full"
                          color="#fff"
                          backgroundColor="gray"
                          focusBorderColor="#f4f756"
                          type={showPassConfirm ? 'text' : 'password'}
                          placeholder="Confirm password *"
                          _placeholder={{ opacity: 1, color: '#cccccc' }}
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={handleClickPassConfirm} color="#000" backgroundColor="#f4f756">
                            {showPassConfirm ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
      
                    <Box display={"flex"} mt="10px" alignItems="left" justifyContent="flex-start">
                      <Checkbox id="terms_checkbox" colorScheme="blue" isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                      <Text textAlign={"left"} ml={2} color={"white"}>I accept the terms and conditions of service</Text>
                    </Box>
      
                    <Button colorScheme="purplealpha.100" size="md" w="full" mt="5" mb="2" backgroundColor="#f4f756" fontFamily="Nasalization" color={"black"} onClick={handleConfirmNoWallet}>
                      CONFIRM
                    </Button>
                    <Button colorScheme="gray" size="md" w="full" h="9" backgroundColor="gray" color={"black"} fontFamily="Nasalization" onClick={toggleNoWallet}>
                      GO BACK
                    </Button>
                  </VStack>
                </Center>
              </Box>
              )}
              <Box w="20%">
              </Box>
        </Flex>
  );
}

export { WindowAccounts };