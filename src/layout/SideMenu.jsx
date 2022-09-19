import React, { useEffect, useState } from 'react';
import {
   Box,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   useDisclosure,
} from '@chakra-ui/react';
import { SecondaryBtn } from '../utils/Buttons';
import { AiOutlineMenu } from 'react-icons/ai';
import Hero from '../components/Hero';
import { useAuth } from '../context/auth';
import HomeIcon from '../assets/icons/HomeIcon.svg';
import ReadingListIcon from '../assets/icons/ReadingListIcon.svg';
import FAQIcon from '../assets/icons/FAQIcon.svg';
import SideMenuItem from '../utils/SideMenuItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AboutIcon from '../assets/icons/AboutIcon.svg';
import ContactIcon from '../assets/icons/ContactIcon.svg';

const SideMenu = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const navigate = useNavigate();

   const user = useAuth();

   const [clickHome, setClickHome] = useState(false);

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   let savedPosts = [];
   if (transformedData && !loading && !err) {
      savedPosts = transformedData.filter(
         (postItem) =>
            postItem.saved?.includes(user?.userId) &&
            !postItem.archived?.includes(user?.userId)
      );
   }

   useEffect((_) => window.scrollTo(0, 0), [clickHome]);

   const handleClickHome = () => {
      navigate('/');
      setClickHome((prev) => !prev);
      onClose();
   };

   const handleClickMenu = (route) => {
      navigate(`/${route}`);
      onClose();
   };

   return (
      <>
         <SecondaryBtn
            name='menu_icon'
            display={{ base: 'block', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
         >
            <AiOutlineMenu size={25} />
         </SecondaryBtn>

         <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent maxW='290px'>
               <DrawerHeader
                  padding='.9rem .5rem .5rem'
                  display='flex'
                  justifyContent='space-between'
               >
                  Dev Community
                  <DrawerCloseButton
                     pos='static'
                     _hover={{
                        bg: 'rgb(59 73 223 / 10%)',
                        color: 'rgb(47 58 178)',
                     }}
                  />
               </DrawerHeader>

               <DrawerBody p='.5rem'>
                  {/* login box */}
                  {!user && (
                     <Box
                        boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
                        borderRadius='5px'
                        mb='.7rem'
                     >
                        <Hero btnWidth='90%' onClose={onClose} p='.5rem' />
                     </Box>
                  )}

                  {/* menu items */}
                  <SideMenuItem
                     icon={HomeIcon}
                     title='Home'
                     onClick={handleClickHome}
                  />

                  {user && (
                     <SideMenuItem
                        icon={ReadingListIcon}
                        savedPostsCount={savedPosts.length}
                        title='Reading List'
                        onClick={() => handleClickMenu('readinglist')}
                     />
                  )}

                  <SideMenuItem
                     icon={FAQIcon}
                     title='FAQ'
                     onClick={() => handleClickMenu('faq')}
                  />

                  <SideMenuItem
                     icon={ContactIcon}
                     title='Contact'
                     onClick={() => handleClickMenu('contact')}
                  />

                  <SideMenuItem
                     icon={AboutIcon}
                     title='About'
                     onClick={() => handleClickMenu('about')}
                  />
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
};

export default SideMenu;
