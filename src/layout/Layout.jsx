import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import MainNavigation from './MainNavigation';

const Layout = ({ children }) => {
   const location = useLocation();

   const { pathname } = location;

   //handle show hide main_nav and footer
   useEffect(() => {
      const mainNav = document.getElementById('main_nav');
      const footer = document.getElementById('footer');

      if (pathname === '/create-post' || pathname.includes('/preview/')) {
         mainNav.style.display = 'none';
         footer.style.display = 'none';
      } else if (pathname.includes('/details/')) {
         mainNav.style.display = 'flex';
         footer.style.display = 'none';
      } else {
         mainNav.style.display = 'flex';
         footer.style.display = 'flex';
      }
   }, [pathname]);

   return (
      <>
         <MainNavigation />

         <Box as='main' p={{ base: '1rem 0.5rem 3rem ', md: '1rem 2rem 5rem' }}>
            {children}
         </Box>

         <Footer />
      </>
   );
};

export default Layout;
