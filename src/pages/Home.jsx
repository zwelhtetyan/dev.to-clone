import { Box } from '@chakra-ui/react';
import React from 'react';
import AllPost from '../components/post/AllPost';

const Home = () => {
   return (
      <Box>
         <Box w='200px' h='3rem' bg='lightgreen'></Box>
         <AllPost />
      </Box>
   );
};

export default Home;
