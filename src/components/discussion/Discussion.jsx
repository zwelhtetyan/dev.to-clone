import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import DiscussionBox from './DiscussionBox';

const Discussion = ({ id }) => {
   return (
      <Box mt='1.5rem' className='discussion'>
         <Heading fontSize={{ base: '1.7rem', md: '2rem' }} mb={3}>
            Discussion
         </Heading>
         <DiscussionBox id={id} />
      </Box>
   );
};

export default Discussion;
