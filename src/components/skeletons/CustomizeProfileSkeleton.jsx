import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';
import { whiteBoxStyles } from '../../utils/CustomizeProfileStyles';

const CustomizeProfileSkeleton = () => {
   return (
      <Flex justify='center' w='100%' flex='1' align='flex-start'>
         <Box
            {...whiteBoxStyles}
            w='100%'
            maxWidth='720px'
            mx='.5rem'
            mb='1rem'
         >
            <SkeletonCircle boxSize={'100px'} mx='auto' />

            <Skeleton h='15px' w='150px' mb='.5rem' mt='1rem' />
            <Skeleton borderRadius='5px' h='40px' w='100%' mb='1rem' />
            <Skeleton h='15px' w='150px' mb='.5rem' />
            <Skeleton borderRadius='5px' h='40px' w='100%' mb='.5rem' />
         </Box>
      </Flex>
   );
};

export default CustomizeProfileSkeleton;
