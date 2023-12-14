import { Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

type Props = {
  points: string;
};

function CyberPoints({ points }: Props) {
    return (
      <>
        <Text ml="58%" color="yellow.300">{points}</Text>
        <Text ml="62%" color="yellow.300">CyberPoints</Text>
      </>
    );
}

export { CyberPoints };