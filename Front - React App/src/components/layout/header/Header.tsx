import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAccount } from "@gear-js/react-hooks";
import { Box, Image, Text } from '@chakra-ui/react';
import { Account } from './account';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from './LogoCyberClub.svg';

type Props = {
  isAccountVisible: boolean;
  points: number
};

function Header({ isAccountVisible, points }: Props) {
  const { accounts, account } = useAccount();

  const [miProp, setMiProp] = useState(sessionStorage.getItem('miClave') || '0');

  useEffect(() => {
    const actualizarMiProp = () => {
      setMiProp(sessionStorage.getItem('miClave') || '0');
    };

    window.addEventListener('storage', actualizarMiProp);

    return () => {
      window.removeEventListener('storage', actualizarMiProp);
    };
  }, []);

  let contentToRender;

  if (account) {
    contentToRender = <Text ml="58%" color="yellow.300">{miProp}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CyberPoints</Text>
  }else {
    contentToRender = <Text ml="58%" color="yellow.300">-</Text>
  }

  return (
    <Link to="/">
    <Box as="header" className={styles.header} display="flex" alignItems="center">
      <Image as={Logo} alt="Logo" width="120px" height="25px" />
      <Account />
    </Box>
    </Link>
  );
}

export { Header };
