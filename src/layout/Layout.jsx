import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Footer from './Footer';

const Layout = () => {
   return (
      <>
         <MainNavigation />

         <Box as='main'>
            <Outlet />
         </Box>

         <Footer />
      </>
   );
};

export default Layout;
