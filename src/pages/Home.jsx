import { Box, Divider } from '@chakra-ui/react';
import React from 'react';
import Hero from '../components/Hero';
import AllPost from '../components/post/AllPost';

const Home = () => {
   return (
      <Box pt='3rem' maxW='768px' m='auto'>
         <Hero display={{ base: 'none', md: 'flex' }} isLogo={true} />
         <Divider
            orientation='horizontal'
            width='75%'
            m='auto'
            display={{ base: 'none', md: 'block' }}
         />
         <AllPost />
      </Box>
   );
};

export default Home;
