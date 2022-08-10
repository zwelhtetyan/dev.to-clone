import React from 'react';
import { Box } from '@chakra-ui/react';
import Hero from '../components/Hero';
import AllPost from '../components/post/AllPost';
import { useAuth } from '../context/auth';

const Home = () => {
   const user = useAuth();

   return (
      <Box>
         <Box px={{ base: '.5rem', md: '1rem' }} maxW='768px' m='auto'>
            {!user && (
               <Hero display={{ base: 'none', md: 'flex' }} isLogo={true} />
            )}
            <AllPost />
         </Box>
      </Box>
   );
};

export default Home;
