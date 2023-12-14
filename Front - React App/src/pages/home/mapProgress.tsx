import { Box } from '@chakra-ui/react';

type Props = {
  status: string; // La URL de la imagen
  cardinal: string; //
};

function getNumberFromCardinal(cardinal: string): number{
  switch (cardinal.toLowerCase()) {
      case 'first':
          return 1;
      case 'second':
          return 2;
      case 'third':
          return 3;
      case 'fourth':
          return 4;
      case 'fifth':
          return 5;
      default:
          return 1;
  }
}

function MapProgress({ status, cardinal }: Props) {

  const numero = getNumberFromCardinal(cardinal);
  const numeroPuntos = 5; // Número total de puntos

  // Coordenadas de los puntos
  const puntosCoords = [
    { x: 945, y: 78 },
    { x: 800, y: 150 },
    { x: 600, y: 242 },
    { x: 400, y: 293 },
    { x: 140, y: 370 },
  ];

  const points = '20,62 60,50 92,42.5 126,27 150,15';

  const coordenadas = points.split(' ').map(coordenada => {
      const [x, y] = coordenada.split(',').map(parseFloat);
      return { x, y };
  });

  // Creamos los puntos
  const puntos = puntosCoords.map((coord, index) => {
      const puntoKey = `punto-${coord.x}-${coord.y}`;
      return (
      <div
          key={puntoKey}
          style={{
          width: index === numeroPuntos - numero ? '3%' : '2%',
          height: index === numeroPuntos - numero ? '6%' : '4%',
          borderRadius: '50%',
          backgroundColor: index === numeroPuntos - numero ? 'yellow' : '#e31fff', // Color del punto resaltado
          position: 'absolute',
          top: `${coord.y/6.2}%`,
          left: `${coord.x/13}%`,
          zIndex: 1,
          }}
      />
      );
  });

  return (
    <Box
      w="100%"
      h="100%"
      backgroundImage={`url(${status})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      position="relative"
    >
      <svg width="100%" height="100%" viewBox="0 0 200 100">
          {/* Línea de la función */}
          <polyline points={points} fill="none" stroke="yellow" strokeWidth="1" />
      </svg>
          {puntos}
    </Box>
  );
}

export { MapProgress };
