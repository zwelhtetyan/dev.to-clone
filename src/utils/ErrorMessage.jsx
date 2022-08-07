import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TbWifiOff } from 'react-icons/tb';
import { PrimaryBtn } from './Buttons';

const ErrorMessage = () => {
   const reload = () => window.location.reload();
   return (
      <VStack mt={5}>
         <HStack m='auto'>
            <TbWifiOff size={23} />
            <Text fontSize='17px' letterSpacing='1px'>
               No internet connection!
            </Text>
         </HStack>
         <PrimaryBtn onClick={reload}>Try again</PrimaryBtn>
      </VStack>
   );
};

export default ErrorMessage;
