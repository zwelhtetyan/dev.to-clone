import React from 'react';
import footerLogo from '../assets/logo/footerLogo.svg';
import { Image, Text, VStack } from '@chakra-ui/react';

const Links = ({ children }) => {
   return (
      <Text as='span' color='rgb(59 73 223)'>
         {children}
      </Text>
   );
};

const Footer = () => {
   return (
      <VStack
         bg='#E5E5E5'
         p={{ base: '2rem .5rem', md: '3rem .5rem' }}
         color='rgb(64 64 64)'
         fontSize='14px'
         fontWeight='300'
         textAlign='center'
         mt={5}
         as='footer'
      >
         <Text>
            <Links>DEV Community</Links> — A constructive and inclusive social
            network for software developers. With you every step of your
            journey.
         </Text>
         <Text>
            Built on <Links>Forem</Links> — the <Links>open source</Links>{' '}
            software that powers <Links>DEV</Links> and other inclusive
            communities.
         </Text>
         <Text>
            Made with love by <Links>Zwel</Links>. DEV Community © 2016 - 2022.
         </Text>
         <Image src={footerLogo} alt='logo' />
      </VStack>
   );
};

export default Footer;
