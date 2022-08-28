import React from 'react';
import footerLogo from '../assets/logo/footerLogo.svg';
import { Image, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Links = ({ children, onClick }) => {
   return (
      <Text as='span' color='rgb(59 73 223)' onClick={onClick}>
         {children}
      </Text>
   );
};

const Footer = () => {
   const navigate = useNavigate();

   const handleClickLink = () => {
      navigate('/');
   };

   return (
      <VStack
         bg='#E5E5E5'
         p={{ base: '2rem .5rem', md: '3rem .5rem' }}
         color='rgb(64 64 64)'
         fontSize='14px'
         textAlign='center'
         mt='1rem !important'
         as='footer'
         w='100%'
      >
         <Text>
            <Links onClick={handleClickLink}>DEV Community</Links> — A
            constructive and inclusive social network for software developers.
            With you every step of your journey.
         </Text>
         <Text>
            Built on <Links onClick={handleClickLink}>Forem</Links> — the{' '}
            <Links onClick={handleClickLink}>open source</Links> software that
            powers <Links onClick={handleClickLink}>DEV</Links> and other
            inclusive communities.
         </Text>
         <Text>
            Made with love by{' '}
            <a href='https://github.com/zwelhtetyan' target='blank'>
               <Links>Zwel</Links>
            </a>
            . DEV Community © 2016 - 2022.
         </Text>
         <Image src={footerLogo} alt='logo' />
      </VStack>
   );
};

export default Footer;
