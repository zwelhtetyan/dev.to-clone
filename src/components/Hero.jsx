import React from 'react';

import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import { useNavigate } from 'react-router-dom';

const Hero = ({ display, btnWidth, p, m, onClose }) => {
   const navigate = useNavigate();

   const changeRoute = (type) => {
      if (type === 'create') {
         navigate('/create-account');
      } else {
         navigate('/login');
      }
      onClose();
   };

   return (
      <VStack w='100%' p={p || '1rem'} display={display} m={m}>
         <HStack align='flex-start' mb={5}>
            <Box>
               <Heading fontSize='1.3rem'>
                  <Heading as='span' color='rgb(37 52 213)' fontSize='1.3rem'>
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
            <PrimaryBtn
               w={btnWidth || '50%'}
               onClick={() => changeRoute('create')}
            >
               Create Account
            </PrimaryBtn>
            <SecondaryBtn w={btnWidth || '50%'} onClick={changeRoute}>
               Log in
            </SecondaryBtn>
         </VStack>
      </VStack>
   );
};

export default Hero;
