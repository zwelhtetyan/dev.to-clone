import { Text } from '@chakra-ui/react';
import React from 'react';

const IconBadge = ({ value }) => {
   return (
      <Text
         bg='rgb(212 212 212)'
         color='rgb(64 64 64)'
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
