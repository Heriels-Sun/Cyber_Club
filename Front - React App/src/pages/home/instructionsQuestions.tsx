import { Box, Button } from "@chakra-ui/react";
import { HeaderGame } from "./HeaderGame";

type Props = {
  text: string;
  startGame: (newValue: boolean) => void;
};

function InstructionsQuestions({ text, startGame }: Props) {

    const signer = async () => {
        startGame(false);
      }

    return (
        <>
            <Box color="white">
                {text}
            </Box>
            <Button onClick={signer}>
                Click to me
            </Button>
        </>
    );
};

export { InstructionsQuestions };