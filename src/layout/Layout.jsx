import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import MainNavigation from './MainNavigation';

const Layout = ({ children }) => {
   //states
   const [isCreatePost, setIsCreatePost] = useState(false);

   const location = useLocation();

   const { pathname } = location;

   useEffect(() => {
      if (pathname === '/create-post') {
         setIsCreatePost(true);
      } else {
         setIsCreatePost(false);
      }
   }, [pathname]);

   return (
      <>
         {!isCreatePost && <MainNavigation />}

         <Box as='main' p={{ base: '1rem 0.5rem 2rem ', md: '1rem 2rem 3rem' }}>
            {children}
         </Box>

         {!isCreatePost && <Footer />}
      </>
   );
};

export default Layout;
