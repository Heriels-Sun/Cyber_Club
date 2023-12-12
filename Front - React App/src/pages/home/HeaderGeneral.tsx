import { Box, Flex, Text} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

type Props = {
  helpText: string;
};

function HeaderGeneral({ helpText }: Props) {

    return (
        <Box as="header" py="4" px="6" borderBottom="1px" borderColor="white">
        <Flex justify="space-between" align="center">
            <Flex display="flex" alignItems="center">
                <Text color='white' mr="4">{helpText}</Text>
            </Flex>
        </Flex>
        </Box>
    );
}

export { HeaderGeneral };