import {HeaderGame} from './HeaderGame';

type Props = {
  state: string;
};

function Perfil({ state }: Props) {
    return (
        <HeaderGame helpText="Select the correct answer to the question" />
    );
}

export { Perfil };