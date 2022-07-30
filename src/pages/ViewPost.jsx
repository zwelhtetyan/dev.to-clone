import { Box } from '@chakra-ui/react';
import React from 'react';
import SideReactionBar from '../components/SideReactionBar';
import PostDetails from './PostDetails';

const ViewPost = () => {
   return (
      <Box mt='3rem !important'>
         <SideReactionBar />
         <Box ms={{ base: '0', md: '5rem' }}>
            <PostDetails />
         </Box>
      </Box>
   );
};

export default ViewPost;
