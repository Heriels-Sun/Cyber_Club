import { useState, useEffect, useContext } from "react";
import { useAccount } from "@gear-js/react-hooks";
import { WindowAccounts } from "components/layout/header/account/accounts-modal/windowAccounts";
import { Flex, Progress, Text } from '@chakra-ui/react';
import { NewDashboard } from './newDashboard';

function ChargingPage() {
    document.body.style.backgroundImage                 = "url('fondo02.jpg')";
    document.body.style.backgroundAttachment            = "fixed";
    document.body.style.backgroundSize                  = "cover";

    const [progressValue, setProgressValue]             = useState(0);
    const [isLoadingComplete, setIsLoadingComplete]     = useState(false);
    const { accounts, account }                         = useAccount();
    const [isModalOpen, setIsModalOpen]                 = useState(true);

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
        contentToRender = <WindowAccounts accounts={accounts} />;
    }

    return (
        !isLoadingComplete ? (
            <Flex
            direction="column"
            justify="flex-end"
            align="center"
            height="calc(100vh - 150px)"
            overflow="hidden"
            pb={4} // Puedes ajustar este padding para asegurarte de que está en la posición deseada
            >
            <Text color="white" mb={2} fontSize={"2xl"} fontFamily={"Trebuchet MS"}>L&nbsp;&nbsp;O&nbsp;&nbsp;A&nbsp;&nbsp;D&nbsp;&nbsp;I&nbsp;&nbsp;N&nbsp;&nbsp;G</Text>
            <Progress
                w="80%"
                h="2%"
                max={100}
                value={progressValue}
                sx={{
                '& > div': {
                    backgroundColor: '#f4f756', // Relleno de la barra
                },
                backgroundColor: 'transparent', // Fondo de la barra antes de llenarse
                border: '2px solid #f4f756', // Borde de la barra
                }}
            />
            </Flex>
        ) : (
            contentToRender
        )
    );
}

export { ChargingPage };