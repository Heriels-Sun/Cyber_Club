import { useState, useEffect } from "react";
import { useAccount } from "@gear-js/react-hooks";
import { AccountsModal } from '../../components/layout/header/account/accounts-modal/AccountsModal';
import { Flex, Progress, Text } from '@chakra-ui/react';
import { ChargingPage } from './chargAndAccess';
import { WindowAccounts } from "components/layout/header/account/accounts-modal/windowAccounts";

function InitialChargingPage() {
    document.body.style.backgroundImage             = "url('fondo.png')";
    document.body.style.backgroundAttachment        = "fixed";
    document.body.style.backgroundSize              = "cover";

    const [progressValue, setProgressValue]         = useState(0);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const { accounts, account }                     = useAccount();
    const [isModalOpen, setIsModalOpen]             = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
      };

    useEffect(() => {
        const simulateProgress = () => {
            let currentValue = 0;
            const interval = setInterval(() => {
                if (currentValue <= 100) {
                    setProgressValue(currentValue);
                    currentValue += 2.5;
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
        contentToRender = <ChargingPage/>
    }else {
        contentToRender = <WindowAccounts accounts={accounts} />;
    }

    return (
        !isLoadingComplete ? (
            <Flex
                justify="center"
                align="flex-end"
                height="calc(100vh - 130px)"
                overflow="hidden"
            >
                <Text>LOADING</Text>
                <Progress w="80%" h="2%" max={100} value={progressValue} colorScheme="purple"/>
            </Flex>
        ) : (
            contentToRender
        )
    );
}

export { InitialChargingPage };