import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import DiscussionBox from './DiscussionBox';

const Discussion = ({ postId, comments }) => {
   return (
      <Box mt='1.5rem'>
         <Heading fontSize={{ base: '1.7rem', md: '2rem' }} mb={3}>
            Discussion ( {comments.length} )
         </Heading>
         <DiscussionBox postId={postId} />
      </Box>
   );
};

export default Discussion;
