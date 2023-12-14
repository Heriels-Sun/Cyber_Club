import { Box, Button, Text, Image } from '@chakra-ui/react';
import { HeaderGame } from './HeaderGame';

type Props = {
  imageUrl: string; // La URL de la imagen del NFT
  _key: string;
  onChooseNFT: (_Key: string) => void; // Función que maneja la selección del NFT
};

function IconoNFT({imageUrl, _key, onChooseNFT }: Props) {
    const signer = async (value: string) => {
        onChooseNFT(value);
      }

    return (
        <Box textAlign="center">
            <Box mx="auto" maxWidth="200px" mb="10px"> {/* Centrar la imagen */}
            <Image src={imageUrl} boxSize="200px" objectFit="cover" />
            </Box>
            <Button onClick={() => signer(_key)} colorScheme="blue" display="block" mx="auto"> {/* Centrar el botón */}
                Choose
            </Button>
        </Box>
    );
}

export { IconoNFT };
