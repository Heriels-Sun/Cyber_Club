import { useState, useEffect } from "react";
import { useAccount } from "@gear-js/react-hooks";
import { AccountsModal } from '../../components/layout/header/account/accounts-modal/AccountsModal';
import { Flex, Progress, Text } from '@chakra-ui/react';
import { NewDashboard } from './newDashboard';

function ChargingPage() {
    document.body.style.backgroundImage                 = "url('fondo.png')";
    document.body.style.backgroundAttachment            = "fixed";
    document.body.style.backgroundSize                  = "cover";

    const [progressValue, setProgressValue]             = useState(0);
    const [isLoadingComplete, setIsLoadingComplete]     = useState(false);
    const { accounts, account }                         = useAccount();
    const [isModalOpen, setIsModalOpen]                 = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
      };

    useEffect(() => {
        const simulateProgress = () => {
            let currentValue = 0;
            const interval = setInterval(() => {
                if (currentValue <= 100) {
                    setProgressValue(currentValue);
                    currentValue += 1.25;
                } else {
                    clearInterval(interval);
                    setIsLoadingComplete(true); // Marca la carga como completa
                }
            }, 50); // Intervalo de tiempo (milisegundos) para cada incremento
        };

        simulateProgress();
    }, []);
    
    let contentToRender;

    if (account) {
        contentToRender = <NewDashboard/>
    }else {
        contentToRender = <AccountsModal accounts={accounts} close={closeModal} />;
    }

    return (
        !isLoadingComplete ? (
            <Flex
                justify="center"
                align="flex-end"
                height="calc(100vh - 120px)"
                overflow="hidden"
            >
                <Text>LOADING</Text>
                <Progress w="80%" h="2%" mt={"-2px"} max={100} value={progressValue} colorScheme="purple"/>
            </Flex>
        ) : (
            contentToRender
        )
    );
}

export { ChargingPage };