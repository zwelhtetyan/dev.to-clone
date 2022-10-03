import React from 'react';
import { footerLogo } from '../assets/icons';
import { Image, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
   const navigate = useNavigate();

   const handleClickLink = () => {
      navigate('/');
   };

   const Links = ({ children, onClick }) => {
      return (
         <Text
            as='span'
            cursor='pointer'
            color={useColorModeValue('light.primary', 'dark.primary')}
            onClick={onClick}
         >
            {children}
         </Text>
      );
   };

   return (
      <VStack
         className='footer'
         bg={useColorModeValue('light.footerBg', 'dark.footerBg')}
         p={{ base: '2rem .5rem', md: '3rem .5rem' }}
         color={useColorModeValue('light.footerColor', 'dark.footerColor')}
         fontSize='14px'
         textAlign='center'
         mt='1rem !important'
         as='footer'
         w='100%'
      >
         <Text>
            <Links onClick={handleClickLink}>DEV Community 👩‍💻👨‍💻</Links> — A
            constructive and inclusive social network for software developers.
            With you every step of your journey.
         </Text>
         <Text>
            The <Links onClick={handleClickLink}>open source</Links> software
            that powers <Links onClick={handleClickLink}>DEV</Links> and other
            inclusive communities.
         </Text>
         <Text>
            Made with love by{' '}
            <a href='https://github.com/zwelhtetyan' target='blank'>
               <Links>Zwel</Links>
            </a>
            . DEV Community 👩‍💻👨‍💻 © 2016 - 2022.
         </Text>
         <Image src={footerLogo} alt='logo' />
      </VStack>
   );
};

export default Footer;
