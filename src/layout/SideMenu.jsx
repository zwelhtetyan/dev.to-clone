import React from 'react';
import {
   Box,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   HStack,
   Image,
   Text,
   useDisclosure,
} from '@chakra-ui/react';
import { SecondaryBtn } from '../utils/Buttons';
import { AiOutlineMenu } from 'react-icons/ai';
import Hero from '../components/Hero';
import { useAuth } from '../context/auth';
import HomeIcon from '../assets/logo/HomeIcon.svg';
import ReadingListIcon from '../assets/logo/ReadingListIcon.svg';
import FAQIcon from '../assets/logo/FAQIcon.svg';

const MenuItem = ({ children }) => {
   return (
      <HStack
         cursor='pointer'
         p='.5rem'
         borderRadius='5px'
         _hover={{
            bg: 'rgb(59 73 223 / 10%)',
            color: 'rgb(47 58 178)',
         }}
      >
         {children}
      </HStack>
   );
};

const SideMenu = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const user = useAuth();

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
            <DrawerContent maxW='250px' pt='60px'>
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
                        <Hero w='80%' onClose={onClose} m='0' />
                     </Box>
                  )}

                  {/* menuItem */}
                  <MenuItem>
                     <Image src={HomeIcon} alt='menu_icon' />
                     <Text>Home</Text>
                  </MenuItem>
                  {user && (
                     <MenuItem>
                        <Image src={ReadingListIcon} alt='menu_icon' />
                        <Text>Reading List</Text>
                     </MenuItem>
                  )}
                  <MenuItem>
                     <Image src={FAQIcon} alt='menu_icon' />
                     <Text>FAQ</Text>
                  </MenuItem>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
};

export default SideMenu;
