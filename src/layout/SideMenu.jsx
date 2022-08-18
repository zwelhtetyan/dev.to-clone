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
import HomeIcon from '../assets/logo/HomeIcon.svg';
import ReadingListIcon from '../assets/logo/ReadingListIcon.svg';
import FAQIcon from '../assets/logo/FAQIcon.svg';
import SideMenuItem from '../utils/SideMenuItem';

const SideMenu = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const user = useAuth();

   const [clickHome, setClickHome] = useState(false);

   useEffect((_) => window.scrollTo(0, 0), [clickHome]);

   const handleClickHome = () => {
      setClickHome((prev) => !prev);
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
            <DrawerContent maxW='300px' pt='60px'>
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
                        py='.5rem'
                        mb='.7rem'
                     >
                        <Hero w='80%' onClose={onClose} p='0' />
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
                        title='Reading List'
                     />
                  )}
                  <SideMenuItem icon={FAQIcon} title='FAQ' />
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
};

export default SideMenu;
