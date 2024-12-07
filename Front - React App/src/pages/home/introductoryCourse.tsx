import { useState, useRef, useEffect } from 'react';
import { Box, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton, Text } from '@chakra-ui/react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaExpand, FaCompress, FaForward, FaBackward } from 'react-icons/fa';

function IntroductoryCourse() {
  document.body.style.backgroundImage = "";
  document.body.style.background = "black";

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (!isFullScreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    <Flex height="100vh">
      {/* Video Player - 70% width */}
      <Box width="75%" bg="black" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {/* Video Element */}
        <video
          ref={videoRef}
          style={{ width: '95%' }}
          src="/Cap1.mp4"  // Ruta del video, puede ser un archivo local en la carpeta public
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          controls={false} // Desactiva los controles nativos
        />

        {/* Controles del video debajo del video */}
        <Flex p={1} bg="black" alignItems="center" justifyContent="space-between" width="90%">
          {/* Botones de Play / Pause */}
          <IconButton
            icon={isPlaying ? <FaPause /> : <FaPlay />}
            onClick={handlePlayPause}
            colorScheme="yellow"
            size="lg"
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
          />

          {/* Botones de retroceso y avance */}
          <Flex>
            <IconButton
              icon={<FaBackward />}
              onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)}
              colorScheme="yellow"
              mx={2}
              aria-label="Retroceder 10 segundos"
            />
            <IconButton
              icon={<FaForward />}
              onClick={() => videoRef.current && (videoRef.current.currentTime += 10)}
              colorScheme="yellow"
              mx={2}
              aria-label="Avanzar 10 segundos"
            />
          </Flex>

          {/* Barra de progreso y tiempo */}
          <Flex flex="1" mx={4} alignItems="center">
            <Text>{formatTime(currentTime)}</Text>
            <Slider
              aria-label="time-slider"
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleSeek}
              flex="1"
              mx={2}
              colorScheme="yellow"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>{formatTime(duration)}</Text>
          </Flex>

          {/* Control de volumen */}
          <Flex alignItems="center" mx={4}>
            <IconButton
              icon={<FaVolumeDown />}
              onClick={() => handleVolumeChange(Math.max(volume - 0.1, 0))}
              colorScheme="yellow"
              mx={2}
              aria-label="Bajar volumen"
            />
            <Slider
              aria-label="volume-slider"
              value={volume}
              min={0}
              max={1}
              step={0.1}
              onChange={handleVolumeChange}
              colorScheme="yellow"
              width="100px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <IconButton
              icon={<FaVolumeUp />}
              onClick={() => handleVolumeChange(Math.min(volume + 0.1, 1))}
              colorScheme="yellow"
              mx={2}
              aria-label="Subir volumen"
            />
          </Flex>

          {/* Pantalla completa */}
          <IconButton
            icon={isFullScreen ? <FaCompress /> : <FaExpand />}
            onClick={handleFullScreen}
            colorScheme="yellow"
            size="lg"
            aria-label={isFullScreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          />
        </Flex>
      </Box>

      {/* Panel - 30% width (vacío) */}
      <Box width="25%" bg="gray.800" p={5} color="white">
        {/* Este panel está vacío y listo para contenido adicional */}
      </Box>
    </Flex>
  );
}

export { IntroductoryCourse };
