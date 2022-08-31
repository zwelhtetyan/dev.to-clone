import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import DiscussionBox from './DiscussionBox';
import { calcTotalDiscussion } from '../../helper/calculateTotal';

const Discussion = ({ postId, comments, discussionBoxRef }) => {
   return (
      <Box mt='1.5rem' ref={discussionBoxRef}>
         <Heading fontSize={{ base: '1.7rem', md: '2rem' }} mb={3}>
            Discussion ({calcTotalDiscussion(comments)})
         </Heading>
         <DiscussionBox postId={postId} />
      </Box>
   );
};

export default Discussion;
