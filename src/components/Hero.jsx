import React from 'react';
import logo from '../assets/logo/logo.png';

import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import { useNavigate } from 'react-router-dom';

const Hero = ({ display, isLogo, w, onClose }) => {
   const navigate = useNavigate();

   const changeRoute = (type) => {
      if (type === 'create') {
         navigate('/create-account');
      } else {
         navigate('/login');
      }
      onClose();
   };

   const fontSize = ['1.3rem', '1.3rem', '2rem'];

   return (
      <VStack maxW='590px' m='1rem auto 2rem' display={display}>
         <HStack align='flex-start' mb={5}>
            <Image
               src={logo}
               alt='logo'
               w='60px'
               transform='rotate(-17deg)'
               mr={2}
               display={isLogo ? 'block' : 'none'}
            />
            <Box>
               <Heading fontSize={fontSize}>
                  <Heading as='span' color='rgb(37 52 213)' fontSize={fontSize}>
                     DEV Community
                  </Heading>{' '}
                  is a community of 878,258 amazing developers
               </Heading>
               <Text color='gray.600' pt={2}>
                  We're a place where coders share, stay up-to-date and grow
                  their careers.
               </Text>
            </Box>
         </HStack>
         <VStack w='100%'>
            <PrimaryBtn w={w || '50%'} onClick={() => changeRoute('create')}>
               Create Account
            </PrimaryBtn>
            <SecondaryBtn w={w || '50%'} onClick={changeRoute}>
               Log in
            </SecondaryBtn>
         </VStack>
      </VStack>
   );
};

export default Hero;
