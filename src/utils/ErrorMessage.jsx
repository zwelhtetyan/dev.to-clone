import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TbWifiOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { PrimaryBtn } from './Buttons';

const ErrorMessage = ({ offline, urlNotFound }) => {
   const reload = () => window.location.reload();

   const navigate = useNavigate();

   return (
      <VStack justify='center' flex='1' fontSize={['16px', '17px']} py='7rem'>
         {offline && (
            <VStack>
               <HStack m='auto'>
                  <TbWifiOff size={22} />
                  <Text letterSpacing='1px'>No internet connection !</Text>
               </HStack>
               <PrimaryBtn onClick={reload}>Try again</PrimaryBtn>
            </VStack>
         )}

         {urlNotFound && (
            <VStack>
               <Text fontSize='1.2rem' fontWeight='bold'>
                  This page doesn’t exist 😟 !
               </Text>
               <Text>
                  Please check your URL or{' '}
                  <Text
                     as='span'
                     color='light.primary'
                     _hover={{ color: 'rgb(103 115 237 / 91%)' }}
                     cursor='pointer'
                     onClick={() => navigate('/')}
                  >
                     go back home
                  </Text>
               </Text>
            </VStack>
         )}
      </VStack>
   );
};

export default ErrorMessage;
