import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainContainer from '../utils/MainContainer';
import Footer from './Footer';
import MainNavigation from './MainNavigation';
import SideMenu from './SideMenu';

const Layout = ({ children }) => {
   //states
   const [menuOpen, setMenuOpen] = useState(false);
   const [isCreatePost, setIsCreatePost] = useState(false);

   const toggleMenu = () => setMenuOpen((prevState) => !prevState);
   const closeMenu = () => setMenuOpen(false);

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
         {!isCreatePost && <MainNavigation onToggle={toggleMenu} />}

         <MainContainer>{children}</MainContainer>

         {!isCreatePost && <Footer />}

         {menuOpen && <SideMenu onClose={closeMenu} />}
      </>
   );
};

export default Layout;
