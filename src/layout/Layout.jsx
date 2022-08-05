import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Footer from './Footer';

const Layout = () => {
   return (
      <>
         <MainNavigation />

         <Box as='main' p={{ base: '1rem 0.5rem', md: '1rem' }}>
            <Outlet />
         </Box>

         <Footer />
      </>
   );
};

export default Layout;
