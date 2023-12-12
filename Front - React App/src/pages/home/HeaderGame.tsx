import { Box, Flex, Text, Button, Tag, TagLabel, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

type Props = {
  helpText: string;
};

function HeaderGame({ helpText }: Props) {
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => ({
                ...prevTime,
                minutes: prevTime.minutes + Math.floor((prevTime.seconds + 1) / 60),
                seconds: (prevTime.seconds + 1) % 60,
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box as="header" py="4" px="6" borderBottom="1px" borderColor="white">
        <Flex justify="space-between" align="center">
            <Flex display="flex" alignItems="center">
            <Text color='white' mr="4">{helpText}</Text>
            </Flex>
            <Flex align="center">
                <Button variant="solid" colorScheme='blue' backgroundColor="#FD03E6" mr="5">
                    Help
                </Button>
                <HStack spacing={4}>
                    {['lg'].map((size) => (
                    <Tag size={size} key={size} variant='subtle' backgroundColor='#FEFF01'>
                        <TagLabel>
                            Time: {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
                            {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
                        </TagLabel>
                    </Tag>
                    ))}
                </HStack>
            </Flex>
        </Flex>
        </Box>
    );
}

export { HeaderGame };