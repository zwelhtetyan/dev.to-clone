import { Text } from '@chakra-ui/react';
import React from 'react';

const NoTitleMessage = () => {
   return (
      <Text
         px='.5rem'
         fontSize='15px'
         letterSpacing='.5px'
         background='#FBE9E9'
         color='red'
         my='.5rem'
      >
         Title can't be blank!
      </Text>
   );
};

export default NoTitleMessage;
