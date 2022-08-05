import React from 'react';
import { Box } from '@chakra-ui/react';
import Hero from '../components/Hero';
import AllPost from '../components/post/AllPost';

const Home = () => {
   return (
      <Box pt='3rem' maxW='768px' m='auto'>
         <Hero display={{ base: 'none', md: 'flex' }} isLogo={true} />
         <AllPost />
      </Box>
   );
};

export default Home;
