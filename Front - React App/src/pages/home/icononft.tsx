import { Box, Button, Text, Image } from '@chakra-ui/react';
import { HeaderGame } from './HeaderGame';

type Props = {
  imageUrl: string; // La URL de la imagen del NFT
  onChooseNFT: () => void; // Función que maneja la selección del NFT
};

function IconoNFT({imageUrl, onChooseNFT }: Props) {
    return (
        <Box textAlign="center">
            <Box mx="auto" maxWidth="200px" mb="10px"> {/* Centrar la imagen */}
            <Image src={imageUrl} alt="NFT" boxSize="200px" objectFit="cover" />
            </Box>
            <Button onClick={onChooseNFT} colorScheme="blue" display="block" mx="auto"> {/* Centrar el botón */}
            Choose
            </Button>
        </Box>
    );
}

export { IconoNFT };
