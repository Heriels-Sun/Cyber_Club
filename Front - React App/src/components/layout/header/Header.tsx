import { Link } from "react-router-dom";
import { Box, Image } from '@chakra-ui/react';
import { Account } from './account';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from './LogoCyberClub.svg';

type Props = {
  isAccountVisible: boolean;
};

function Header({ isAccountVisible }: Props) {
  return (
    <Link to="/">
    <Box as="header" className={styles.header} display="flex" alignItems="center">
      <Image as={Logo} alt="Logo" width="120px" height="25px" />
      {isAccountVisible && <Account />}
    </Box>
    </Link>
  );
}

export { Header };
