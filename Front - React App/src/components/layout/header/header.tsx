import { Link, useNavigate } from 'react-router-dom';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/react';
import styles from './header.module.scss';
import logoImage from '../../../assets/cyber/logo_cyber.png';
import social1 from '../../../assets/icons/Social01.png';
import social2 from '../../../assets/icons/Social02.png';
import social3 from '../../../assets/icons/Social04.png';

// Icons
import { IoMdHome } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { FaGear } from "react-icons/fa6";

type Props = {
  isAccountVisible: boolean;
};

const handleIconClick = (icon: string) => {
  alert(`${icon} clicked!`);
};

export function Header({ isAccountVisible }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number, action: () => void) => {
    setActiveIndex(index);
    action();
  };
  let navigate = useNavigate();
  const menuItems = [
    { icon: <IoMdHome size="40px" />, text: 'Home', action: () => navigate('/dashboard') },
    { icon: <IoPerson size="40px" />, text: 'My Account', action: () => alert('My Account clicked') },
    { icon: <FaStar size="40px" />, text: 'My Courses', action: () => alert('My Courses clicked') },
    { icon: <FaShoppingCart size="40px" />, text: 'Marketplace', action: () => alert('Marketplace clicked') },
    { icon: <RiAuctionFill size="40px" />, text: 'Auctions', action: () => alert('Auctions clicked') },
    { icon: <FaGear size="40px" />, text: 'Configuration', action: () => alert('Configuration clicked') },
  ];

  return (
    <>
      <header className={styles.header}>
        <div style={{ paddingLeft: '20px' }}>
          <Link to="#">
            <img
              src={logoImage}
              onClick={onOpen}
              alt="Logo"
              style={{ height: '50px', cursor: 'pointer' }}
            />
          </Link>
        </div>
      </header>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Center>
              <img
                src={logoImage}
                onClick={onOpen}
                alt="Logo"
                style={{ height: '70px', cursor: 'pointer' }}
              />
            </Center>
          </DrawerHeader>
          <DrawerBody paddingInlineStart={0} paddingInlineEnd={0}>

            {menuItems.map((item, index) => (
              <SimpleGrid key={index} columns={2} spacing={0} templateColumns="30% 70%">
                <Box
                  height="80px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={activeIndex === index ? '#7c25fa' : ''}
                  onClick={() => handleClick(index, item.action)}
                  transition="background-color 0.3s"
                >
                  <Text color="white" fontSize="2rem" fontFamily="body" textAlign="center">
                    {item.icon}
                  </Text>
                </Box>
                <Box
                  height="80px"
                  display="flex"
                  alignItems="center"
                  justifyContent="start"
                  bg={activeIndex === index ? '#7c25fa' : ''}
                  onClick={() => handleClick(index, item.action)}
                  transition="background-color 0.3s"
                >
                  <Text color="white" fontSize="2rem" fontFamily="body" textAlign="start">
                    {item.text}
                  </Text>
                </Box>
              </SimpleGrid>
            ))}

            <Box
              position="absolute"
              bottom="10px"
              left="50%"
              transform="translateX(-50%)"
              display="flex"
              justifyContent="space-between"
              width="70%"
              padding="10px"
            >
              {/* Imagen 1 */}
              <Box onClick={() => handleIconClick("1")} cursor="pointer">
                <img src={social1} alt="Icon 1" />
              </Box>

              {/* Imagen 2 */}
              <Box onClick={() => handleIconClick("2")} cursor="pointer">
                <img src={social2} alt="Icon 2" />
              </Box>

              {/* Imagen 3 */}
              <Box onClick={() => handleIconClick("3")} cursor="pointer">
                <img src={social3} alt="Icon 3" />
              </Box>
            </Box>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
