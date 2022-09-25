import React, { useRef } from 'react';
import logo from '../assets/images/logo.png';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, HStack, Image } from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import SideMenu from './SideMenu';
import { useAuth } from '../context/auth';
import MainMenu from '../components/MainMenu';
import { useSelector } from 'react-redux';
import SearchInput from '../components/search/SearchInput';
import useGetQuerySearchTerm from '../hooks/useGetQuerySearchTerm';

const Header = () => {
   const navigate = useNavigate();
   const user = useAuth();
   const searchInputRef = useRef();

   const querySearchTerm = useGetQuerySearchTerm('spq');

   const profileData = useSelector((state) => state.profileData.profileData);

   let currentUserProfile = null;

   if (profileData) {
      currentUserProfile = profileData.find((data) => data.id === user?.userId);
   }

   return (
      <HStack
         as='header'
         bg='white'
         w='100%'
         h='56px'
         pos='fixed'
         boxShadow='0 1px 1px rgba(0, 0, 0, 0.1)'
         zIndex={1000}
         top='0'
         left='0'
      >
         <HStack
            justify='space-between'
            width='100%'
            maxW='1280px'
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

               <SearchInput
                  ref={searchInputRef}
                  querySearchTerm={querySearchTerm}
                  w='400px'
                  display={{ base: 'none', md: 'block' }}
                  route='search'
               />
            </Box>

            <Flex>
               <SecondaryBtn
                  name='search_icon'
                  display={{ base: 'block', md: 'none' }}
                  m='0 .5rem 0 0'
                  onClick={() => navigate('/search')}
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

               {user && currentUserProfile && (
                  <>
                     <PrimaryBtn
                        display={{ base: 'none', md: 'block' }}
                        onClick={() => navigate('/create-post')}
                        m='0 .5rem 0 0'
                     >
                        Creart Post
                     </PrimaryBtn>

                     <MainMenu currentUserProfile={currentUserProfile} />
                  </>
               )}
            </Flex>
         </HStack>
      </HStack>
   );
};

export default Header;
