import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
   return (
      <>
         <Header />

         <VStack as='main' minH='calc(100vh - 64px)'>
            <Outlet />

            <Footer />
         </VStack>
      </>
   );
};

export default Layout;
