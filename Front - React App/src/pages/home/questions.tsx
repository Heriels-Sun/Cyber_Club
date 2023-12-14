import { Box, Text, Button, Center } from '@chakra-ui/react';
import { useState } from 'react';
import { HeaderGame } from './HeaderGame';
import { IndividualQuestion } from './individualQuestion1';
import { GeneralQuestion } from './questions1';
import { HeaderGeneral } from './HeaderGeneral';

type QuestionsProps= {
  module: string;
};

function Questions({module}: QuestionsProps) {
  const [componentRender, setComponentRender] = useState<React.ReactNode | null>(null);
  const [start1, setStart] = useState(true);
  
  const startGame = (value: boolean) => {
    setStart(value);
    if(start1){
      setComponentRender(
          <GeneralQuestion/>
      );
    }
  };

  return (
    <>
      {componentRender}
        {start1 && (
          <>
            <HeaderGeneral helpText={module}/>
            <Box
            ml="5%"
            mt="2%"
            w="90%"
            h="48vh"
            alignItems="center"
            background="#4A5B91"
            >
              <Text fontSize='25px' textAlign="center" fontWeight="semibold" color="white"><br/></Text>
              <Text fontSize='8xl' textAlign="center" fontWeight="semibold" color="white">Instructions</Text>
              <Text ml="10%" w="80%" fontSize='20px' textAlign="justify" fontWeight="semibold" color="white"><br/>
                Answer the following questions choosing one of the 4 options shown,&nbsp;
                <Text as="span" color="yellow">when you press the start button, the time will start running</Text>,
                If you answer the question correctly in 1 second or less, you will get the 100 points, if you take more time to answer, the points will decrease. 
                points will decrease. You will have 3 attempts per day to answer one or more modules, passing attempts also count, 
                after that you will have to wait 24 hours. Good luck!
              </Text>
            </Box>
            <Button background="yellow" color="black" mt="2%" ml="40%" w="20%" onClick={() => startGame(!start1)}>
              START
            </Button>
          </>
      )}
    </>
  );
}

export { Questions };