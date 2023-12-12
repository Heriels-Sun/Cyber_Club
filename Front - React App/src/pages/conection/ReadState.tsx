import { ProgramMetadata } from "@gear-js/api";
import { useState } from "react";
import { useApi, useAlert } from "@gear-js/react-hooks";
import { Button, Card, Center, Heading, VStack, Text } from "@chakra-ui/react";

function ReadState() {
  const { api } = useApi();

  const alert = useAlert();

  const [fullState, setFullState] = useState<any | undefined>(0);

  const color = (fullState[0] && fullState[0][1]) ?? "Black";

  // Add your programID
  const programIDFT =
    "0x6a5be0ca678c2bdfe87cb1c622bafc4eb0e272243f9d6812f972c2db0b454ba9";

  // Add your metadata.txt
  const meta =
    "000100000001000000000101000000000000000102000000090320000808696f48416374696f6e547261666669634c6967687400010c14477265656e0000001859656c6c6f770001000c52656400020000040808696f444576656e74547261666669634c6967687400010c14477265656e0000001859656c6c6f770001000c52656400020000080000020c000c00000408101c001010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001401205b75383b2033325d0000140000032000000018001800000503001c0000050200";

  const metadata = ProgramMetadata.from(meta);

  const getState = () => {
    api.programState
      .read({ programId: programIDFT, payload: "" }, metadata)
      .then((result) => {
        setFullState(result.toJSON());
      })
      .catch(({ message }: Error) => alert.error(message));
  };

  return (
    <Card>
      <Center>
        <VStack>
          <Heading>Traffic-light</Heading>
          <Button
            borderRadius="50px"
            w="400px"
            h="400px"
            backgroundColor={color ?? "black"}
            onClick={getState}
          >
            Light
          </Button>

          <Heading>State Contract</Heading>
          <Text>{JSON.stringify(fullState)}</Text>
        </VStack>
      </Center>
    </Card>
  );
}

export { ReadState };