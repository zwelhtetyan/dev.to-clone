import React from 'react';
import {
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

const SideMenu = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         <SecondaryBtn
            display={{ base: 'block', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
         >
            <AiOutlineMenu size={25} />
         </SecondaryBtn>

         <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent maxW='260px' pt='60px'>
               <DrawerHeader
                  padding='.9rem .5rem 0'
                  pb='0px'
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

               <DrawerBody p='0.5'>
                  <Hero w='80%' onClose={onClose} />
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
};

export default SideMenu;
