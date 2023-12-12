import { useState } from 'react';
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { Flex, Button, Image, Box } from '@chakra-ui/react';

type ButtonPlayProps = {
  handleButtonClick: (newValue: boolean) => void;
};

function ButtonPlay({handleButtonClick}: ButtonPlayProps) {

  const signer = async () => {
    handleButtonClick(false);
  }
 
  return (
    <Button
        variant="teal"
        backgroundColor="#FFFE01"
        borderRadius="20px"
        fontSize="22px"
        display="flex"
        ml="1vh"
        mt="49.5vh"
        w="8%" 
        h="4vh"
        color="black"
        bottom="5%"
        left="1vh"
        _hover={{ backgroundColor: 'purple', color: 'white' }}
        transform="translateX(-440%)"
        onClick={signer}
      >
        Play
    </Button>
  );
};

export { ButtonPlay };