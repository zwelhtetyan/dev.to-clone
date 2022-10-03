import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const FallbackSpinner = () => {
   return (
      <Box pos='fixed' top='50%' left='50%' transform='translate(-50%, -50%)'>
         <Spinner
            size='lg'
            color={useColorModeValue('light.primary', 'dark.primary')}
         />
      </Box>
   );
};

export default FallbackSpinner;
