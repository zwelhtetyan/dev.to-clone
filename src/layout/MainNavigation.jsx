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
   Menu,
   MenuButton,
   MenuDivider,
   MenuList,
} from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import SideMenu from './SideMenu';
import CustomAvatar from '../utils/Avatar';
import CustomMenuItem from '../utils/CustomMenuItem';

const MainNavigation = () => {
   const navigate = useNavigate();

   const backToHome = () => {
      navigate('/');
      window.scrollTo(0, 0);
   };

   const goToCreatePost = () => {
      navigate('/create-post');
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
         top='0'
         left='0'
      >
         <HStack justify='space-between' width='100%' maxW='1200px' m='auto'>
            <Box display='flex' alignItems='center'>
               <SideMenu />

               <Image
                  w='50px'
                  h='40px'
                  src={logo}
                  alt='logo'
                  ms={{ base: '.5rem', md: '0' }}
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
                  onClick={goToCreatePost}
               >
                  Creart Post
               </PrimaryBtn>

               <Menu autoSelect={false}>
                  <MenuButton
                     _hover={{
                        filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))',
                     }}
                     transition='.1s'
                  >
                     <CustomAvatar name='Zwel' src={z} size='40px' />
                  </MenuButton>

                  <MenuList p='.5rem'>
                     <CustomMenuItem>Zwel Htet Yan</CustomMenuItem>
                     <MenuDivider />
                     <CustomMenuItem>Dashboard</CustomMenuItem>
                     <CustomMenuItem onClick={goToCreatePost}>
                        Create Post
                     </CustomMenuItem>
                     <CustomMenuItem>Reading List</CustomMenuItem>
                     <CustomMenuItem>Setting</CustomMenuItem>
                     <MenuDivider />
                     <CustomMenuItem>Sign Out</CustomMenuItem>
                  </MenuList>
               </Menu>
            </HStack>
         </HStack>
      </HStack>
   );
};

export default MainNavigation;
