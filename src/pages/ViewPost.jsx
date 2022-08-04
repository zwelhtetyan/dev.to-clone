import { Box } from '@chakra-ui/react';
import React from 'react';
import PostDetails from '../components/post/PostDetails';

const ViewPost = () => {
   return (
      <Box mt='3rem !important' maxW='1200px' mx='auto'>
         <PostDetails />
      </Box>
   );
};

export default ViewPost;
