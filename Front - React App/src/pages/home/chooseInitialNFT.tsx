import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Heading, Center, Text, Button } from '@chakra-ui/react';

interface ChooseInitialNFTProps {
    onSelectProfile: (item: Item) => void;
  }

type URLItem = {
    id: string;
    url: string;
  };

interface Item {
    id: string;
    url: string;
}

function chunkArray(array: URLItem[], chunkSize: number): URLItem[][] {
    let result: URLItem[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

function ChooseInitialNFT({onSelectProfile}: ChooseInitialNFTProps) {
    document.body.style.backgroundColor     = "";
    document.body.style.backgroundImage     = "linear-gradient(to bottom, black 60%, #0E0E53 100%)";
    document.body.style.backgroundRepeat    = "no-repeat";
    document.body.style.backgroundSize      = "cover";

    let navigate = useNavigate();  // Obtén el hook useNavigate

    const handleBoxClick = (item: Item) => {
        navigate('/InformationGeneral', { state: { itemId: item.id, itemUrl: item.url } });
    };

    const boxes = [];

    const listaDeUrls = [
        { id: '1', url: "https://reve-facturacion.ddns.net/media/cyberclub/01/PFP-Model36-01.png" },
        { id: '2', url: "https://reve-facturacion.ddns.net/media/cyberclub/02/PFP-Model01-01.png" },
        // { id: '3', url: nft3 },
        // { id: '4', url: nft4 },
        // { id: '5', url: nft5 },
        // { id: '6', url: nft6 },
        // { id: '7', url: nft7 },
        // { id: '8', url: nft8 },
        // { id: '9', url: nft9 },
        // { id: '10', url: nft10 }
    ];

    const groupedUrls = chunkArray(listaDeUrls, 8);

    return (
        <>
            <Center>
                <Heading as="h1" size="lg" color="yellow" mb="4" fontWeight="normal" fontFamily={"Nasalization"}>
                    CHOOSE YOUR CYBER PROFILE.
                </Heading>
            </Center>

            {groupedUrls.map((group, index) => (
            <Flex key={index} w="100%" h="220px" mt="20px">
            {group.map(item => (
                <Box
                    key={item.id}
                    flex="1 0 11.5%"  // flex-grow, flex-shrink, flex-basis
                    maxW="11.5%"
                    backgroundColor="#021243"
                    borderRadius="md"
                    mx="10px"
                    backgroundImage={`url(${item.url})`}
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                    onClick={() => onSelectProfile(item)}
                    cursor="pointer"
                />
            ))}
            </Flex>
        ))}
        </>
    );
}

export { ChooseInitialNFT };