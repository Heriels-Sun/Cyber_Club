import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Heading, Center, Text, Button } from '@chakra-ui/react';
import fondo1 from './fondo.png';
import nft1 from './nft/1.jpg';
import nft2 from './nft/2.jpg';
import nft3 from './nft/3.jpg';
import nft4 from './nft/4.jpg';
import nft5 from './nft/5.jpg';
import nft6 from './nft/6.jpg';
import nft7 from './nft/7.jpg';
import nft8 from './nft/8.jpg';
import nft9 from './nft/9.jpg';
import nft10 from './nft/10.jpg';
import nft11 from './nft/11.jpg';
import nft12 from './nft/12.jpg';
import nft13 from './nft/13.jpg';
import nft14 from './nft/14.jpg';
import nft15 from './nft/15.jpg';
import nft16 from './nft/16.jpg';
import nft17 from './nft/17.jpg';
import nft18 from './nft/18.jpg';
import nft19 from './nft/19.jpg';
import nft20 from './nft/20.jpg';

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
        { id: '3', url: nft3 },
        { id: '4', url: nft4 },
        { id: '5', url: nft5 },
        { id: '6', url: nft6 },
        { id: '7', url: nft7 },
        { id: '8', url: nft8 },
        { id: '9', url: nft9 },
        { id: '10', url: nft10 },
        { id: '11', url: nft11 },
        { id: '12', url: nft12 },
        { id: '13', url: nft13 },
        { id: '14', url: nft14 },
        { id: '15', url: nft15 },
        { id: '16', url: nft16 },
        { id: '17', url: nft17 },
        { id: '18', url: nft18 },
        { id: '19', url: nft19 },
        { id: '20', url: nft20 },
        { id: '21', url: nft1 },
        { id: '22', url: nft2 },
        { id: '23', url: nft3 },
        { id: '24', url: nft4 },
        { id: '25', url: nft5 },
        { id: '26', url: nft6 },
        { id: '27', url: nft7 },
        { id: '28', url: nft8 },
        { id: '29', url: nft9 },
        { id: '30', url: nft1 },
        { id: '31', url: nft1 },
        { id: '32', url: nft2 },
        { id: '33', url: nft3 },
        { id: '34', url: nft4 },
        { id: '35', url: nft5 },
        { id: '36', url: nft6 },
        { id: '37', url: nft7 },
        { id: '38', url: nft8 },
        { id: '39', url: nft9 },
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