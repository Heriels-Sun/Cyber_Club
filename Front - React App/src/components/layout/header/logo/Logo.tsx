import { Link } from "react-router-dom";
import './BalanceEffect.css';
import './MetalicBackground.css';
import { Box, Image } from '@chakra-ui/react';
import LogoCyberClub from './LogoCyberClub.svg';

function Logo() {
  return (
    <Link to="/">
    <Box className="metaliccard" display="flex" alignItems="center">
      <Image src={LogoCyberClub} alt="Logo" boxSize="50px" />
    </Box>
    </Link>
  );
}

export { Logo };
