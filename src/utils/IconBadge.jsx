import { Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const IconBadge = ({ value }) => {
   return (
      <Text
         bg={useColorModeValue('rgb(212 212 212)', 'rgb(82 82 82)')}
         color={useColorModeValue('rgb(64 64 64)', 'rgb(229 229 229)')}
         fontSize='13px'
         px='5px'
         borderRadius='5px'
         display='inline-block'
      >
         {value}
      </Text>
   );
};

export default IconBadge;
