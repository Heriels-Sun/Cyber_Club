import { useState } from 'react';
import { Flex, Box, Heading, Center, Text, Button } from '@chakra-ui/react';
import { ChooseInitialNFT } from './chooseInitialNFT';
import { InformationGeneral } from './informationGeneral';

interface Item {
    id: string;
    url: string;
}

function RegisterUser() {
    const [selectedProfile, setSelectedProfile] = useState<Item | null>(null);
    document.body.style.backgroundImage = "";

    const handleSelectProfile = (item: Item) => {
        setSelectedProfile(item);
    };

    return (
        <>
        {selectedProfile ? (
            <InformationGeneral id_nft={selectedProfile.id} url_nft={selectedProfile.url} />
        ) : (
            <ChooseInitialNFT onSelectProfile={handleSelectProfile} />
        )}
    </>
    );
}

export { RegisterUser };