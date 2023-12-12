import { Box, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { HeaderGame } from './HeaderGame';
import { IndividualQuestion } from './individualQuestion';

type Question = {
  id: string;
  text: string;
};

function Questions() {
  const questions: Question[] = [
    { id: '1', text: '¿Qué es una blockchain?' },
    { id: '2', text: '¿Cuál es el propósito principal de la tecnología blockchain?' },
    { id: '3', text: 'Menciona un ejemplo de uso de la blockchain aparte de las criptomonedas.' },
    { id: '4', text: '¿Qué es una criptomoneda?' },
    { id: '5', text: 'Nombra una criptomoneda que no sea Bitcoin.' },
    { id: '6', text: '¿Cómo se realizan las transacciones con criptomonedas?' },
    { id: '7', text: '¿Cuál es la diferencia entre una blockchain pública y una privada?' },
    { id: '8', text: '¿Quién puede unirse a una blockchain pública?' },
    { id: '9', text: '¿En qué situaciones se podría preferir usar una blockchain privada?' },
    { id: '10', text: '¿Qué hace seguras a las transacciones en blockchain?' },
    { id: '11', text: '¿Qué es la encriptación en el contexto de blockchain?' },
    { id: '12', text: '¿Cómo contribuye la descentralización a la seguridad de la blockchain?' },
    { id: '13', text: 'Principios Básicos de las Transacciones en Blockchain' },
    { id: '14', text: '¿Cómo se añade un nuevo bloque a la blockchain?' },
    { id: '15', text: '¿Qué es un "hash" en blockchain y por qué es importante?' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  const handleSubmit = () => {
    const unansweredQuestions = questions.filter(question => !selectedOptions[question.id]);
    
    if (unansweredQuestions.length > 0) {
      // Obtén los textos de las preguntas no respondidas
      const unansweredTexts = unansweredQuestions.map(question => `Pregunta ${question.id}: ${question.text}`);
      
      // Crea un mensaje de alerta con las preguntas no respondidas
      alert(`Te falta responder las siguientes preguntas:\n${unansweredTexts.join('\n')}`);
    } else {
      console.log(selectedOptions); // Aquí puedes enviar las respuestas
    }
  };

  const updateAnswer = (questionId: string, answer: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQues = questions[currentQuestion];

  return (
    <>
      {/* ... Tu código de HeaderGame y Box */}
      <Box>
        <HeaderGame helpText="Select the correct option and use the next button to advance."/>

        {currentQues && (
        <IndividualQuestion
          key={currentQues.id}
          text={currentQues.text}
          questionId={currentQues.id}
          updateAnswer={updateAnswer}
          selectedAnswer={selectedOptions[currentQues.id] || ''} // Proporcionar la opción seleccionada
        />
      )}

        <Box display="flex" justifyContent="right" mt="-1%">
          <Button
            disabled={currentQuestion === 0}
            mr="1vh"
            onClick={handlePrevious}
            colorScheme="blue"
          >
            Previous
          </Button>

          <Button
            mr="4vh"
            onClick={handleNext}
            colorScheme="blue"
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export { Questions };