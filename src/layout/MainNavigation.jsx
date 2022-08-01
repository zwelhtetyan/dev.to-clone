import React from 'react';
import logo from '../assets/logo/logo.png';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import z from '../assets/images/z.jpeg';
import {
   Box,
   HStack,
   Image,
   Input,
   InputGroup,
   InputRightElement,
} from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import SideMenu from './SideMenu';
import CustomAvatar from '../utils/Avatar';

const MainNavigation = () => {
   const navigate = useNavigate();

   const backToHome = () => {
      navigate('/');
      window.scrollTo(0, 0);
   };

   return (
      <HStack
         bg='white'
         w='100%'
         h='56px'
         pos='fixed'
         sx={{ p: ['.5rem', '0 2rem'] }}
         boxShadow='md'
         zIndex={10000}
         id='main_nav'
      >
         <HStack justify='space-between' width='100%' maxW='1200px' m='auto'>
            <Box display='flex' alignItems='center'>
               <SideMenu />

               <Image
                  w='58px'
                  h='40px'
                  src={logo}
                  alt='logo'
                  ms='.5rem'
                  onClick={backToHome}
                  cursor='pointer'
               />

               <InputGroup
                  h='39px'
                  w='400px'
                  ms='0.5rem'
                  display={{ base: 'none', md: 'block' }}
                  borderColor='#00000033'
               >
                  <Input placeholder='Search...' />
                  <InputRightElement
                     children={<FiSearch size={23} color='gray' />}
                  />
               </InputGroup>
            </Box>

            <HStack>
               <SecondaryBtn display={{ base: 'block', md: 'none' }}>
                  <FiSearch size={23} />
               </SecondaryBtn>

               {/* <SecondaryBtn display={{ base: 'none', md: 'block' }}>
                  Log in
               </SecondaryBtn>

               <PrimaryBtn>Create Account</PrimaryBtn> */}

               <PrimaryBtn
                  display={{ base: 'none', md: 'block' }}
                  onClick={() => navigate('/create-post')}
               >
                  Creart Post
               </PrimaryBtn>

               <CustomAvatar name='Zwel' src={z} size='40px' />
            </HStack>
         </HStack>
      </HStack>
   );
};

export default MainNavigation;
