import { Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const NoTitleMessage = () => {
   return (
      <Text
         px='.5rem'
         fontSize='15px'
         letterSpacing='.5px'
         background={useColorModeValue('#FBE9E9', '#3E1A1A')}
         color='red'
         my='.5rem'
      >
         Title can't be blank!
      </Text>
   );
};

export default NoTitleMessage;
