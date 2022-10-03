import React, { Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import useTransformData from './hooks/useTransformData';
import LoginAlert from './components/LoginAlert';
import FallbackSpinner from './utils/FallbackSpinner';
import ConfigRoute from './layout/ConfigRoute';

const App = () => {
   useTransformData();

   console.log('app render');

   return (
      <Box>
         <Suspense fallback={<FallbackSpinner />}>
            <ConfigRoute />
         </Suspense>

         {/* modal alert */}
         <LoginAlert />
      </Box>
   );
};

export default App;
