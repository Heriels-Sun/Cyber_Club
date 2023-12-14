import { useState, useEffect } from "react";
import { Flex, Progress } from '@chakra-ui/react';
import { NewWindow1 } from "./newWindow1";

function ChargingPageAndAccess() {
    const [progressValue, setProgressValue] = useState(0);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        const simulateProgress = () => {
            let currentValue = 0;
            const interval = setInterval(() => {
                if (currentValue <= 100) {
                    setProgressValue(currentValue);
                    currentValue += 1.8;
                } else {
                    clearInterval(interval);
                    setIsLoadingComplete(true); // Marca la carga como completa
                }
            }, 50); // Intervalo de tiempo (milisegundos) para cada incremento
        };

        simulateProgress();
    }, []);

    return (
        !isLoadingComplete ? (
            <Flex
                justify="center"
                align="flex-end"
                height="calc(100vh - 120px)"
                overflow="hidden"
            >
                <Progress w="15%" h="2%" max={100} value={progressValue} colorScheme="purple"/>
            </Flex>
        ) : (
            <NewWindow1 />
        )
    );
}

export { ChargingPageAndAccess };