import React from 'react';
import logo from '../assets/logo/logo.png';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
   Box,
   Flex,
   HStack,
   Image,
   Input,
   InputGroup,
   InputRightElement,
} from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import SideMenu from './SideMenu';
import { useAuth } from '../context/auth';
import MainMenu from '../components/MainMenu';

const MainNavigation = () => {
   const navigate = useNavigate();

   const user = useAuth();

   return (
      <HStack
         as='header'
         bg='white'
         w='100%'
         h='56px'
         pos='fixed'
         boxShadow='md'
         zIndex={10000}
         top='0'
         left='0'
      >
         <HStack
            justify='space-between'
            width='100%'
            maxW='1200px'
            m='auto'
            px={{ base: '.5rem', md: '1rem' }}
         >
            <Box display='flex' alignItems='center'>
               <SideMenu />

               <Image
                  w='50px'
                  h='40px'
                  src={logo}
                  alt='logo'
                  ms={{ base: '.5rem', md: '0' }}
                  onClick={() => navigate('/')}
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

            <Flex>
               <SecondaryBtn
                  name='search_icon'
                  display={{ base: 'block', md: 'none' }}
                  m='0 .5rem 0 0'
               >
                  <FiSearch size={23} />
               </SecondaryBtn>

               {!user && (
                  <>
                     <SecondaryBtn
                        display={{ base: 'none', md: 'block' }}
                        onClick={() => navigate('/login')}
                        m='0 .5rem 0 0'
                     >
                        Log in
                     </SecondaryBtn>
                     <PrimaryBtn onClick={() => navigate('/create-account')}>
                        Create Account
                     </PrimaryBtn>{' '}
                  </>
               )}

               {user && (
                  <>
                     <PrimaryBtn
                        display={{ base: 'none', md: 'block' }}
                        onClick={() => navigate('/create-post')}
                        m='0 .5rem 0 0'
                     >
                        Creart Post
                     </PrimaryBtn>

                     <MainMenu />
                  </>
               )}
            </Flex>
         </HStack>
      </HStack>
   );
};

export default MainNavigation;
