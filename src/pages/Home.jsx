import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import AllPost from '../components/post/AllPost';
import { useAuth } from '../context/auth';
import SideMenuItem from '../utils/SideMenuItem';
import HomeIcon from '../assets/logo/HomeIcon.svg';
import ReadingListIcon from '../assets/logo/ReadingListIcon.svg';
import FAQIcon from '../assets/logo/FAQIcon.svg';

const Home = () => {
   const user = useAuth();

   return (
      <Flex
         px={{ base: '.5rem', md: '1rem' }}
         maxW='1200px'
         mx='auto'
         pos='relative'
         align='flex-start'
      >
         <Box
            flex='1'
            pe='1rem'
            pos='sticky'
            top='4rem'
            maxW='300px'
            display={{ base: 'none', md: 'block' }}
         >
            <SideMenuItem icon={HomeIcon} title='Home' />
            {user && (
               <SideMenuItem icon={ReadingListIcon} title='Reading List' />
            )}
            <SideMenuItem icon={FAQIcon} title='FAQ' />
         </Box>
         <AllPost />
      </Flex>
   );
};

export default Home;
